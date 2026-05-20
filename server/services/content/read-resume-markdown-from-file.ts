import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { parse as parseYaml } from 'yaml'
import { resumePageSchema } from '../../../shared/schemas/resume-page-schema'
import type { ResumePage } from '../../../shared/types/content/resume-page'
import { buildResumeMarkdownDocument } from './build-resume-markdown-document'

const contentRoot = resolve(process.cwd(), 'content')

const parseResumeFromFrontmatter = (frontmatter: unknown): ResumePage | null => {
  if (!frontmatter || typeof frontmatter !== 'object' || !('resume' in frontmatter)) {
    return null
  }

  const parsed = resumePageSchema.safeParse(frontmatter.resume)

  if (!parsed.success) {
    return null
  }

  return parsed.data
}

export const readResumeMarkdownFromFile = async (): Promise<string | null> => {
  const filePath = resolve(contentRoot, 'resume.md')
  const raw = await readFile(filePath, 'utf8')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)

  if (!match?.[1]) {
    return null
  }

  const frontmatter = parseYaml(match[1]) as Record<string, unknown>
  const resume = parseResumeFromFrontmatter(frontmatter)

  if (!resume) {
    return null
  }

  const title = typeof frontmatter.title === 'string' ? frontmatter.title : 'Resume'
  const description = typeof frontmatter.description === 'string' ? frontmatter.description : undefined

  return buildResumeMarkdownDocument({ title, description, resume })
}
