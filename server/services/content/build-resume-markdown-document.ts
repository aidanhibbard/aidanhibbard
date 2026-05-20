import type { ResumePage } from '../../../shared/types/content/resume-page'
import { buildResumePageMarkdown } from './build-resume-page-markdown'

export const buildResumeMarkdownDocument = (input: {
  title: string
  description?: string
  resume: ResumePage
}): string => {
  const frontmatter = [
    '---',
    `title: ${JSON.stringify(input.title)}`,
    ...(input.description ? [`description: ${JSON.stringify(input.description)}`] : []),
    '---',
    '',
  ].join('\n')

  return `${frontmatter}${buildResumePageMarkdown(input.resume)}`
}
