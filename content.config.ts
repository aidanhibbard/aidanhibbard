import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const schema = z.object({
  title: z.string(),
  desc: z.string(),
  publishedAt: z.date(),
  lastEditedAt: z.date(),
  tags: z.array(z.string()),
})

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'data',
      source: 'articles/**/*.md',
      schema,
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/**/*.md',
      schema,
    }),
  },
})
