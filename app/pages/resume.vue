<script setup lang="ts">
import { defineWebPage } from 'nuxt-schema-org/schema'
import { defineSiteOgImage } from '@/utils/define-site-og-image'

const RESUME_DESCRIPTION = 'Professional experience across real-time systems, integrations, cloud infrastructure, and full-stack product engineering.'

useSeoMeta({
  title: 'Resume',
  description: RESUME_DESCRIPTION,
  robots: 'index, follow',
})

defineSiteOgImage({
  title: 'Resume',
  description: RESUME_DESCRIPTION,
})

const schemaIds = useSiteSchemaIds()

useSchemaOrg([
  defineWebPage({
    '@type': 'ProfilePage',
    name: 'Resume',
    description: 'Professional experience of Aidan Hibbard.',
    url: schemaIds.pageUrl('/resume'),
    mainEntity: {
      '@id': schemaIds.identityId,
    },
  }),
])
</script>

<template>
  <div />
</template>
