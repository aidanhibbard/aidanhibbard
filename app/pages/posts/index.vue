<script setup lang="ts">
import { refDebounced, toRef } from '@vueuse/core'
import { Search } from 'lucide-vue-next'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/shadcn/ui/pagination'
import { Input } from '@/components/shadcn/ui/input'
import type { PostListItem } from '#shared/types/content/post-list-item'

const POSTS_PAGE_SIZE = 5

const state = reactive<{
  page: number
  query: string
}>({
  page: 1,
  query: '',
})

const debouncedQuery = refDebounced(toRef(state, 'query'), 300)

const categoryClass
  = 'font-mono text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase'

const {
  data: postsResult,
  pending,
} = await useAsyncData('posts-list', async () => {
  let builder = queryCollection('content')
    .where('path', 'LIKE', '/posts/%')
    .order('date', 'DESC')

  const searchTerm = debouncedQuery.value.trim()

  if (searchTerm) {
    const term = `%${searchTerm}%`
    builder = builder.andWhere(group =>
      group
        .where('title', 'LIKE', term)
        .orWhere(nested => nested.where('description', 'LIKE', term)),
    )
  }

  const total = await builder.count()

  const items = await builder
    .select('path', 'title', 'description', 'date')
    .skip((state.page - 1) * POSTS_PAGE_SIZE)
    .limit(POSTS_PAGE_SIZE)
    .all() as PostListItem[]

  return {
    items,
    total,
  }
}, {
  watch: [
    () => state.page,
    () => debouncedQuery.value,
  ],
})

useSeoMeta({
  title: 'Blog',
  description: 'Notes on building software, debugging production systems, and the occasional side quest.',
})

const posts = computed(() => postsResult.value?.items ?? [])
const totalPosts = computed(() => postsResult.value?.total ?? 0)
const showPagination = computed(() => totalPosts.value > POSTS_PAGE_SIZE)

watch(debouncedQuery, () => {
  state.page = 1
})
</script>

<template>
  <div class="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
    <header class="pb-10 pt-12 sm:pb-12 sm:pt-14 lg:pt-16">
      <p :class="categoryClass">
        // BLOG
      </p>
      <h1
        class="cn-font-heading mt-5 max-w-2xl text-balance text-2xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-[2rem] lg:leading-[1.12]"
      >
        Notes on building software, debugging production systems, and the occasional side quest.
      </h1>

      <div class="mt-8 sm:mt-10">
        <label
          for="posts-search"
          class="sr-only"
        >
          Search posts
        </label>
        <div class="relative">
          <Search
            class="pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="posts-search"
            v-model="state.query"
            type="search"
            autocomplete="off"
            placeholder="Search by title or description"
            class="h-10 rounded-none border-0 border-b border-border bg-transparent pl-7 shadow-none focus-visible:border-primary focus-visible:ring-0"
          />
        </div>
      </div>
    </header>

    <section
      aria-label="Post list"
      class="min-h-80 border-t border-border"
    >
      <PostsListSkeleton v-if="pending" />

      <div
        v-else-if="posts.length === 0"
        class="flex flex-col items-start gap-3 py-16 sm:py-20"
      >
        <p :class="categoryClass">
          // NO MATCHES
        </p>
        <p class="max-w-md text-muted-foreground">
          <template v-if="state.query.trim()">
            Nothing matched your search. Try a different title or phrase.
          </template>
          <template v-else>
            Posts will show up here once they are published.
          </template>
        </p>
      </div>

      <div
        v-else
        class="divide-y divide-border"
      >
        <PostsCardPostCard
          v-for="post in posts"
          :key="post.path"
          :post="post"
        />
      </div>
    </section>

    <nav
      v-if="showPagination && !pending"
      class="border-t border-border py-10 sm:py-12"
      aria-label="Posts pagination"
    >
      <Pagination
        v-model:page="state.page"
        :total="totalPosts"
        :items-per-page="POSTS_PAGE_SIZE"
        :sibling-count="1"
        show-edges
        class="rounded-none"
      >
        <PaginationContent v-slot="{ items }">
          <PaginationPrevious class="rounded-none" />
          <template
            v-for="(item, index) in items"
            :key="index"
          >
            <PaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              as-child
            >
              <button
                type="button"
                class="inline-flex size-9 items-center justify-center rounded-none font-mono text-xs tracking-wider tabular-nums"
                :class="item.value === state.page
                  ? 'border border-border bg-transparent text-foreground'
                  : 'text-muted-foreground hover:text-foreground'"
              >
                {{ item.value }}
              </button>
            </PaginationItem>
            <PaginationEllipsis
              v-else
              :index="index"
              class="rounded-none"
            />
          </template>
          <PaginationNext class="rounded-none" />
        </PaginationContent>
      </Pagination>
    </nav>
  </div>
</template>
