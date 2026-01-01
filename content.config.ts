import { defineCollection, defineContentConfig } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    articles: defineCollection(
      asSeoCollection({
        type: 'page',
        source: 'articles/**/*.md',
        schema: z.object({
          title: z.string(),
          description: z.string(),
          date: z.date(),
          tags: z.array(z.string()),
        }),
      }),
    ),
    projects: defineCollection(
      asSeoCollection({
        type: 'page',
        source: 'projects/**/*.md',
        schema: z.object({
          title: z.string(),
          description: z.string(),
          date: z.date(),
          tags: z.array(z.string()),
          image: z.string(),
          link: z.string(),
        }),
      }),
    ),
  },
})
