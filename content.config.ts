import { defineContentConfig, defineCollection } from '@nuxt/content'
import { contentCollectionSchema } from './shared/schemas/content-collection-schema'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
      schema: contentCollectionSchema,
    }),
  },
})
