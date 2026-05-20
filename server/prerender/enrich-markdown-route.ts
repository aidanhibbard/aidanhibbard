import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { Nitro } from 'nitropack'
import type { ConsolaInstance } from 'consola'
import { convertHtmlStringToMarkdown } from '../utils/convert-html-string-to-markdown'
import { stripMarkdownFrontmatter } from '../utils/strip-markdown-frontmatter'
import { readResumeMarkdownFromFile } from '../services/content/read-resume-markdown-from-file'

const INTERNAL_HTML_HEADER = 'x-ai-ready-internal'
const SITE_URL = 'https://aidanhibbard.dev/'

const isSparseMarkdown = (markdown: string): boolean => {
  return stripMarkdownFrontmatter(markdown).length === 0
}

const resolvePageRoute = (routePath: string): string => {
  let path = routePath.replace(/\.md$/, '')

  if (path === '/index' || path === 'index') {
    return '/'
  }

  if (path.endsWith('/index')) {
    path = path.slice(0, -6) || '/'
  }

  return path || '/'
}

const writeMarkdownRoute = async (
  nitro: Nitro,
  fileName: string,
  markdown: string,
): Promise<void> => {
  const filePath = join(nitro.options.output.publicDir, fileName)
  await writeFile(filePath, markdown, 'utf8')
}

export const enrichPrerenderMarkdownRoute = async (
  route: {
    route: string
    fileName?: string
  },
  nitro: Nitro,
  log: ConsolaInstance,
): Promise<void> => {
  if (!route.fileName?.endsWith('.md')) {
    return
  }

  const pageRoute = resolvePageRoute(route.route)
  const filePath = join(nitro.options.output.publicDir, route.fileName)

  if (pageRoute === '/resume') {
    const resumeMarkdown = await readResumeMarkdownFromFile()

    if (!resumeMarkdown) {
      log.error('Failed to build prerendered resume markdown from content')
      return
    }

    await writeMarkdownRoute(nitro, route.fileName, resumeMarkdown)
    return
  }

  if (pageRoute !== '/') {
    return
  }

  let currentMarkdown = ''

  try {
    currentMarkdown = await readFile(filePath, 'utf8')
  }
  catch (error) {
    log.error(`Failed to read prerendered homepage markdown at ${route.fileName}`, error)
    return
  }

  if (!isSparseMarkdown(currentMarkdown)) {
    return
  }

  try {
    const html = await globalThis.$fetch<string>('/', {
      headers: { [INTERNAL_HTML_HEADER]: '1' },
    })
    await writeMarkdownRoute(
      nitro,
      route.fileName,
      convertHtmlStringToMarkdown(html, SITE_URL),
    )
  }
  catch (error) {
    log.error(`Failed to build prerendered homepage markdown from HTML for ${route.route}`, error)
  }
}
