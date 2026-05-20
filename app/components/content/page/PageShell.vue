<script setup lang="ts">
const props = defineProps<{
  contentPath: string
}>()

const { buildToc } = useContentPage()

const { data: page } = useAsyncData(`content-page:${props.contentPath}`, async () => {
  const result = await queryCollection('content').path(props.contentPath).first()

  if (!result) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
    })
  }

  return result
})

useSeoMeta({
  title: () => page.value?.title ?? '',
  description: () => page.value?.description ?? '',
})

const sectionLabel = computed(() =>
  page.value?.title?.toUpperCase() ?? 'PAGE',
)

const tocLinks = computed(() => buildToc(page.value?.body))

const gridShellClass = 'mx-auto grid w-full max-w-7xl px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-5 lg:px-8'
</script>

<template>
  <div>
    <header>
      <div :class="gridShellClass">
        <div
          aria-hidden="true"
          class="hidden lg:col-span-2 lg:block"
        />
        <div class="col-span-12 py-12 sm:py-14 lg:col-span-8">
          <p class="font-mono text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
            // {{ sectionLabel }}
          </p>
          <p
            v-if="page?.description"
            class="cn-font-heading mt-5 max-w-3xl text-balance text-2xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-[2rem] lg:leading-[1.12]"
          >
            {{ page.description }}
          </p>
        </div>
        <div
          aria-hidden="true"
          class="hidden lg:col-span-2 lg:block"
        />
      </div>

      <div :class="gridShellClass">
        <div
          aria-hidden="true"
          class="hidden lg:col-span-2 lg:block"
        />
        <div
          class="col-span-12 flex items-center justify-between gap-4 pt-4 pb-4 lg:col-span-8"
        >
          <ShareActions :path="contentPath" />
          <CopyMarkdown :path="contentPath" />
        </div>
        <div
          aria-hidden="true"
          class="hidden lg:col-span-2 lg:block"
        />
      </div>
    </header>

    <div
      class="border-b border-border"
      aria-hidden="true"
    />

    <div :class="gridShellClass">
      <div
        aria-hidden="true"
        class="relative hidden lg:col-span-2 lg:block"
      >
        <div class="absolute inset-y-0 right-0 w-px bg-border" />
      </div>

      <div class="col-span-12 min-w-0 lg:col-span-8">
        <article
          class="py-12 sm:py-14 lg:py-16"
          :aria-label="page?.title"
        >
          <ContentRenderer
            v-if="page"
            :value="page"
          />
        </article>
      </div>

      <div class="relative hidden lg:col-span-2 lg:block">
        <div class="absolute inset-y-0 left-0 w-px bg-border" />
        <ContentToc
          v-if="tocLinks.length > 0"
          :links="tocLinks"
        />
      </div>
    </div>
  </div>
</template>
