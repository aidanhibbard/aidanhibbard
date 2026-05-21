<script setup lang="ts">
import {
  contentPageDescriptionClass,
  contentPageLabelClass,
  contentPageTitleClass,
} from '@/utils/content-page-header-styles'
import { cn } from '@/lib/utils'

const props = defineProps<{
  contentPath: string
}>()

const { data: page } = await useContentPageAsyncData(
  () => `content-page:${props.contentPath}`,
  () => fetchContentPage(props.contentPath),
)

useContentSeo(page)

const tocLinks = useContentPageToc(page)

const sectionLabel = computed(() =>
  page.value?.title?.toUpperCase() ?? 'PAGE',
)
</script>

<template>
  <PageLayout
    :content-path="contentPath"
    :toc-links="tocLinks"
    :aria-label="page?.title"
  >
    <template #header>
      <p :class="contentPageLabelClass">
        // {{ sectionLabel }}
      </p>
      <h1
        v-if="page?.title"
        :class="cn(contentPageTitleClass, 'mt-5')"
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

    <ContentRenderer
      v-if="page"
      :value="page"
    />
  </PageLayout>
</template>
