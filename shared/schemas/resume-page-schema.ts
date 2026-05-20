import { z } from 'zod'

export const resumeContactSchema = z.object({
  email: z.string().email(),
  linkedin: z.string().url(),
  github: z.string().url(),
})

export const resumeSkillGroupSchema = z.object({
  category: z.string(),
  items: z.string(),
})

export const resumeExperienceSchema = z.object({
  title: z.string(),
  organization: z.string(),
  period: z.string(),
  location: z.string(),
  summary: z.string(),
  highlights: z.array(z.string()).min(1),
})

export const resumePageSchema = z.object({
  name: z.string(),
  contact: resumeContactSchema,
  summary: z.string(),
  skills: z.array(resumeSkillGroupSchema).min(1),
  experience: z.array(resumeExperienceSchema).min(1),
})
