import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'
import { resumePageSchema } from '../../../shared/schemas/resume-page-schema'
import { buildResumeMarkdownDocument } from './build-resume-markdown-document'
import { readResumeMarkdownFromFile } from './read-resume-markdown-from-file'

export const readResumeMarkdown = async (event: H3Event): Promise<string | null> => {
  const page = await queryCollection(event, 'content').path('/resume').first()

  if (!page?.resume) {
    return readResumeMarkdownFromFile()
  }

  const parsed = resumePageSchema.safeParse(page.resume)

  if (!parsed.success) {
    return null
  }

  return buildResumeMarkdownDocument({
    title: page.title ?? 'Resume',
    description: page.description,
    resume: parsed.data,
  })
}
