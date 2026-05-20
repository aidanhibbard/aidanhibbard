import { z } from '@nuxt/content'
import type { ZodTypeAny } from 'zod'
import { defineRobotsSchema } from '@nuxtjs/robots/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { defineOgImageSchema } from 'nuxt-og-image/content'
import { defineSchemaOrgSchema } from 'nuxt-schema-org/content'

const schemaOptions = { z }

const resumeContactSchema = z.object({
  email: z.string().email(),
  linkedin: z.string().url(),
  github: z.string().url(),
})

const resumeSkillGroupSchema = z.object({
  category: z.string(),
  items: z.string(),
})

const resumeExperienceSchema = z.object({
  title: z.string(),
  organization: z.string(),
  period: z.string(),
  location: z.string(),
  summary: z.string(),
  highlights: z.array(z.string()).min(1),
})

const resumePageSchema = z.object({
  name: z.string(),
  contact: resumeContactSchema,
  summary: z.string(),
  skills: z.array(resumeSkillGroupSchema).min(1),
  experience: z.array(resumeExperienceSchema).min(1),
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
  resume: resumePageSchema.optional(),
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
  ogImage: defineOgImageSchema(schemaOptions) as unknown as ZodTypeAny,
  schemaOrg: defineSchemaOrgSchema(schemaOptions),
})
