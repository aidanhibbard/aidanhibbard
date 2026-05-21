<script setup lang="ts">
import { defineWebPage } from 'nuxt-schema-org/schema'
import type { ResumePage } from '#shared/types/content/resume-page'

const { data: page } = await useContentPageAsyncData(
  'content-page:/resume',
  () => fetchContentPage('/resume'),
)

useContentSeo(page)

const resume = computed(() => page.value?.resume as ResumePage | undefined)

const schemaIds = useSiteSchemaIds()

useSchemaOrg([
  defineWebPage({
    '@type': 'ProfilePage',
    'name': 'Resume',
    'description': 'Professional experience of Aidan Hibbard.',
    'url': schemaIds.pageUrl('/resume'),
    'mainEntity': {
      '@id': schemaIds.identityId,
    },
  }),
])
</script>

<template>
  <ResumePageResumeDocument
    v-if="resume"
    :resume="resume"
  />
</template>
