<script setup lang="ts">
import ArticleCard from '~/components/articles/ArticleCard.vue'
import { z } from 'zod'
import { Check, ChevronDown } from 'lucide-vue-next'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '~/components/shadcn/ui/pagination'
import { Button } from '~/components/shadcn/ui/button'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxViewport,
} from '~/components/shadcn/ui/combobox'
import ComboboxTrigger from '~/components/shadcn/ui/combobox/ComboboxTrigger.vue'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '~/components/shadcn/ui/field'
import { Input } from '~/components/shadcn/ui/input'

const state = reactive<{
  page: number
  query: string
  tags: string[]
  perPage: number
}>({
  page: 1,
  query: '',
  tags: [],
  perPage: 5,
})

const { data: availableTags, status: tagsStatus } = await useAsyncData(
  'blog-article-tags',
  async () => {
    const rows = await queryCollection('articles')
      .select('tags')
      .all()

    const tagSet = new Set<string>()

    for (const row of rows as Array<{ tags?: string[] }>) {
      for (const tag of row.tags ?? []) {
        if (typeof tag === 'string' && tag.trim()) {
          tagSet.add(tag)
        }
      }
    }

    return Array.from(tagSet).sort((a, b) => a.localeCompare(b))
  },
)

const allTags = computed(() => availableTags.value ?? [])
const tagsButtonLabel = computed(() => {
  if (!state.tags.length) return 'Select tags'
  if (state.tags.length === 1) return state.tags[0]

  const [a, b] = state.tags
  const remaining = state.tags.length - 2
  return remaining > 0 ? `${a}, ${b} +${remaining}` : `${a}, ${b}`
})

const articlesFilterSchema = z.object({
  query: z.string()
    .transform(v => v.trim()),
  tags: z.array(z.string())
    .transform(tags => [...new Set(tags)]),
})
  .superRefine((value, ctx) => {
    const allowedTags = allTags.value
    if (!allowedTags.length) return

    const allowed = new Set(allowedTags)
    const invalid = value.tags.filter(t => !allowed.has(t))

    if (invalid.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['tags'],
        message: `Unknown tag(s): ${invalid.join(', ')}`,
      })
    }
  })

const filterParseResult = computed(() => articlesFilterSchema.safeParse({
  query: state.query,
  tags: state.tags,
}))

const filterIssues = computed(() => filterParseResult.value.success ? [] : filterParseResult.value.error.issues)
const queryErrors = computed(() => filterIssues.value
  .filter(i => i.path[0] === 'query')
  .map(i => ({ message: i.message })))
const tagsErrors = computed(() => filterIssues.value
  .filter(i => i.path[0] === 'tags')
  .map(i => ({ message: i.message })))

const normalizedFilters = computed(() => {
  const result = filterParseResult.value
  if (result.success) return result.data

  const allowed = allTags.value.length ? new Set(allTags.value) : null
  const tags = Array.from(new Set(state.tags)).filter(t => !allowed || allowed.has(t)).slice(0, 20)

  return {
    query: state.query.trim(),
    tags,
  }
})

const normalizedQuery = computed(() => normalizedFilters.value.query)
const normalizedTags = computed(() => normalizedFilters.value.tags)

const buildArticlesQuery = () => {
  const q = queryCollection('articles')
    .order('date', 'DESC')
    .select(
      'date',
      'description',
      'id',
      'tags',
      'stem',
      'title',
    )

  if (normalizedQuery.value) {
    q.where('title', 'LIKE', `%${normalizedQuery.value}%`)
  }

  if (normalizedTags.value.length) {
    for (const tag of normalizedTags.value) {
      q.where('tags', 'LIKE', `%"${tag}"%`)
    }
  }

  return q
}

const { data, status } = await useAsyncData(
  'blog-articles',
  async () => {
    const total = await buildArticlesQuery().count('*')
    const items = await buildArticlesQuery()
      .skip((state.page - 1) * state.perPage)
      .limit(state.perPage)
      .all()

    return {
      items,
      total,
    }
  },
  {
    watch: [
      () => state.page,
      () => state.perPage,
      () => normalizedQuery.value,
      () => normalizedTags.value.join(','),
    ],
  },
)

const totalArticles = computed(() => data.value?.total ?? 0)
const pageCount = computed(() => Math.max(1, Math.ceil(totalArticles.value / (state.perPage || 1))))
const showingFrom = computed(() => {
  if (!totalArticles.value) return 0
  return (state.page - 1) * state.perPage + 1
})
const showingTo = computed(() => Math.min(state.page * state.perPage, totalArticles.value))

watch(
  () => [normalizedQuery.value, normalizedTags.value.join(','), state.perPage],
  () => {
    state.page = 1
  },
)

watch(pageCount, (value) => {
  if (state.page > value) state.page = value
  if (state.page < 1) state.page = 1
})
</script>

<template>
  <LayoutPageContainer id="articles">
    <form
      class="mb-12"
      @submit.prevent
    >
      <FieldGroup class="gap-4 sm:flex-row sm:items-end">
        <Field
          :data-invalid="queryErrors.length ? true : undefined"
        >
          <FieldLabel for="articles-query">
            Query
          </FieldLabel>

          <Input
            id="articles-query"
            v-model="state.query"
            autocomplete="off"
            placeholder="Search articles…"
            :aria-invalid="queryErrors.length ? true : undefined"
          />

          <FieldError :errors="queryErrors" />
        </Field>

        <Field
          :data-invalid="tagsErrors.length ? true : undefined"
        >
          <FieldLabel for="articles-tags">
            Tags
          </FieldLabel>

          <Combobox
            v-model="state.tags"
            multiple
          >
            <ComboboxAnchor>
              <ComboboxTrigger as-child>
                <Button
                  id="articles-tags"
                  type="button"
                  variant="outline"
                  class="justify-between"
                >
                  <span class="truncate text-left">
                    {{ tagsButtonLabel }}
                  </span>
                  <ChevronDown class="size-4 opacity-50" />
                </Button>
              </ComboboxTrigger>
            </ComboboxAnchor>

            <ComboboxList class="w-[--reka-popper-anchor-width]">
              <ComboboxInput placeholder="Search tags…" />

              <ComboboxViewport>
                <ComboboxEmpty>
                  {{ tagsStatus === 'pending' ? 'Loading tags…' : 'No tags found.' }}
                </ComboboxEmpty>

                <ComboboxGroup>
                  <ComboboxItem
                    v-for="tag in allTags"
                    :key="tag"
                    :value="tag"
                    class="cursor-none"
                  >
                    <span class="truncate">
                      {{ tag }}
                    </span>
                    <ComboboxItemIndicator>
                      <Check class="size-4" />
                    </ComboboxItemIndicator>
                  </ComboboxItem>
                </ComboboxGroup>
              </ComboboxViewport>
            </ComboboxList>
          </Combobox>

          <FieldError :errors="tagsErrors" />
        </Field>
      </FieldGroup>
    </form>

    <ul
      class="container mx-auto max-w-5xl flex flex-col gap-y-8"
    >
      <li
        v-for="(a, idx) in data?.items ?? []"
        :key="a.id"
      >
        <ArticleCard
          :post="{
            ...a,
            index: idx,
          }"
          class="space-y-12"
        />
      </li>
    </ul>

    <div class="mt-12">
      <div
        v-if="status === 'pending'"
        class="text-sm text-muted-foreground text-center"
      >
        Loading…
      </div>

      <div
        v-else-if="totalArticles === 0"
        class="text-sm text-muted-foreground text-center"
      >
        No articles to display
      </div>

      <Pagination
        v-else
        v-slot="{ page, pageCount: slotPageCount }"
        v-model:page="state.page"
        :items-per-page="state.perPage"
        :total="totalArticles"
        :sibling-count="1"
        show-edges
        class="mx-auto"
      >
        <div class="flex flex-col items-center gap-3">
          <p class="text-sm text-muted-foreground text-center">
            Page <span class="font-medium text-foreground">{{ page }}</span>
            of <span class="font-medium text-foreground">{{ slotPageCount }}</span>
            <span
              v-if="totalArticles"
              class="hidden sm:inline"
            >
              •
            </span>
            <span
              v-if="totalArticles"
              class="hidden sm:inline"
            >
              Showing <span class="font-medium text-foreground">{{ showingFrom }}</span>-<span class="font-medium text-foreground">{{ showingTo }}</span>
              of <span class="font-medium text-foreground">{{ totalArticles }}</span>
            </span>
          </p>

          <PaginationContent v-slot="{ items }">
            <PaginationPrevious />

            <template
              v-for="(item, index) in items"
              :key="index"
            >
              <PaginationItem
                v-if="item.type === 'page'"
                :value="item.value"
                :is-active="item.value === page"
              >
                {{ item.value }}
              </PaginationItem>
              <PaginationEllipsis v-else />
            </template>

            <PaginationNext />
          </PaginationContent>
        </div>
      </Pagination>
    </div>
  </LayoutPageContainer>
</template>
