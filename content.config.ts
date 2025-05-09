import { defineContentConfig, defineCollection, z, } from '@nuxt/content';
import { asRobotsCollection, } from '@nuxtjs/robots/content';

const schema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.date(),
  lastEditedAt: z.date(),
  tags: z.array(z.string(),),
},);

export default defineContentConfig({
  collections: {
    articles: defineCollection(
      asRobotsCollection({
        type: 'data',
        source: 'articles/**/*.md',
        schema,
      },),
    ),
    projects: defineCollection(
      asRobotsCollection({
        type: 'data',
        source: 'projects/**/*.md',
        schema,
      },),
    ),
    talks: defineCollection(
      asRobotsCollection({
        type: 'data',
        source: 'talks/**/*.md',
        schema,
      },),
    ),
  },
},);
