<script setup lang="ts">
import { defineWebPage } from 'nuxt-schema-org/schema'

const { page } = useContentPageQuery('/resume')

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
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
