<script setup lang="ts">
import type { TocLink } from '@nuxtjs/mdc'
import { formatPostDate } from '@/utils/format-post-date'
import {
  contentPageDateClass,
  contentPageDescriptionClass,
  contentPageLabelClass,
  contentPageTitleClass,
} from '@/utils/content-page-header-styles'
import { cn } from '@/lib/utils'

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
</script>

<template>
  <PageLayout
    :content-path="contentPath"
    :toc-links="tocLinks"
    :aria-label="page?.title"
    article-class="[&_h1:first-of-type]:hidden"
  >
    <template #header>
      <p :class="contentPageLabelClass">
        // BLOG
      </p>
      <time
        v-if="page?.date"
        :datetime="page.date"
        :class="contentPageDateClass"
      >
        {{ formatPostDate(page.date) }}
      </time>
      <h1
        v-if="page?.title"
        :class="cn(contentPageTitleClass, 'mt-3')"
      >
        {{ page.title }}
      </h1>
      <p
        v-if="page?.description"
        :class="contentPageDescriptionClass"
      >
        {{ page.description }}
      </p>
    </template>

    <ContentRenderer :value="page" />
  </PageLayout>
</template>
