import type { H3Event } from 'h3'
import { readContentMarkdown } from './read-content-markdown'
import { readResumeMarkdown } from './read-resume-markdown'
import { stripMarkdownFrontmatter } from '../../utils/strip-markdown-frontmatter'

const log = logger.withTag('resolve-page-markdown')

export const resolvePageMarkdown = async (
  event: H3Event,
  path: string,
): Promise<string | null> => {
  if (path === '/resume') {
    return readResumeMarkdown(event)
  }

  try {
    const contentMarkdown = await readContentMarkdown(path)
    const body = stripMarkdownFrontmatter(contentMarkdown)

    if (body.length > 0) {
      return contentMarkdown
    }
  }
  catch (error) {
    log.error(`Failed to read content markdown for ${path}`, error)
  }

  return null
}
