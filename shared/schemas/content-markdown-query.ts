import { z } from 'zod'

export const contentMarkdownQuerySchema = z.object({
  path: z
    .string()
    .min(1)
    .regex(/^\/[a-z0-9-/]+$/, 'Path must start with / and contain only lowercase letters, numbers, hyphens, and slashes'),
})

export type ContentMarkdownQuery = z.infer<typeof contentMarkdownQuerySchema>
