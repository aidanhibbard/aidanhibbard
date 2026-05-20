<script setup lang="ts">
import type { TocLink } from '@nuxtjs/mdc'
import { formatPostDate } from '@/utils/format-post-date'

defineProps<{
  contentPath: string
  page: {
    title?: string
    description?: string
    date?: string
    body?: unknown
  }
  tocLinks: TocLink[]
}>()

const labelClass
  = 'font-mono text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase'

const dateClass
  = 'mt-5 block font-mono text-[11px] font-medium tracking-[0.22em] text-muted-foreground uppercase tabular-nums'

const headlineClass
  = 'cn-font-heading mt-3 max-w-3xl text-balance text-2xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-[2rem] lg:leading-[1.12]'
</script>

<template>
  <PageLayout
    :content-path="contentPath"
    :toc-links="tocLinks"
    :aria-label="page?.title"
    article-class="[&_h1:first-of-type]:hidden"
  >
    <template #header>
      <p :class="labelClass">
        // BLOG
      </p>
      <time
        v-if="page?.date"
        :datetime="page.date"
        :class="dateClass"
      >
        {{ formatPostDate(page.date) }}
      </time>
      <h1
        v-if="page?.title"
        :class="headlineClass"
      >
        {{ page.title }}
      </h1>
      <p
        v-if="page?.description"
        class="mt-4 max-w-3xl text-balance text-lg leading-relaxed text-muted-foreground"
      >
        {{ page.description }}
      </p>
    </template>

    <ContentRenderer
      v-if="page"
      :value="page"
    />
  </PageLayout>
</template>
