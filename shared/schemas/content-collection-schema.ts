import { z } from '@nuxt/content'
import { defineRobotsSchema } from '@nuxtjs/robots/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { defineOgImageSchema } from 'nuxt-og-image/content'
import { defineSchemaOrgSchema } from 'nuxt-schema-org/content'
import { postThemeSchema } from './post-theme-schema'

const schemaOptions = { z }

const resumeRoleSchema = z.object({
  period: z.string(),
  title: z.string(),
  organization: z.string(),
  summary: z.string(),
})

const landingSchema = z.object({
  aboutHeadline: z.string(),
  aboutLead: z.string(),
  aboutBody: z.string(),
})

export const contentCollectionSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
  landing: landingSchema.optional(),
  roles: z.array(resumeRoleSchema).optional(),
  theme: postThemeSchema.optional(),
  robots: defineRobotsSchema(schemaOptions),
  sitemap: defineSitemapSchema({
    ...schemaOptions,
    name: 'content',
    filter: (entry) => {
      if (entry.draft === true) {
        return false
      }

      if (entry.robots === false || entry.robots === 'noindex') {
        return false
      }

      return true
    },
    onUrl: (url, entry) => {
      if (entry.date) {
        url.lastmod = entry.date
      }

      if (entry.path.startsWith('/posts/')) {
        url.changefreq = 'monthly'
        url.priority = 0.8
      }
    },
  }),
  ogImage: defineOgImageSchema(schemaOptions),
  schemaOrg: defineSchemaOrgSchema(schemaOptions),
})
