import { defineCollection, defineContentConfig } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    articles: defineCollection(
      asSeoCollection({
        type: 'page',
        source: '**/*.md',
        schema: z.object({
          description: z.string(),
          date: z.date(),
          tags: z.array(z.string()),
        }),
      }),
    ),
  },
})
