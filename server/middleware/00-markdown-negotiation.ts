import { getHeader, setHeader } from 'h3'
import { buildAlternateHtmlLink } from '../utils/build-alternate-html-link'
import { buildHomepageAgentLinks } from '../utils/build-homepage-agent-links'
import { convertPageHtmlToMarkdown } from '../utils/convert-page-html-to-markdown'
import { estimateMarkdownTokens } from '../utils/estimate-markdown-tokens'
import { isMarkdownNegotiationRequest } from '../utils/is-markdown-negotiation-request'
import { mergeLinkHeader } from '../utils/merge-link-header'
import { resolveMarkdownPagePath } from '../utils/resolve-markdown-page-path'
import { resolvePageMarkdown } from '../services/content/resolve-page-markdown'

const log = logger.withTag('markdown-negotiation')

const INTERNAL_HTML_HEADER = 'x-ai-ready-internal'
const PRERENDER_HEADER = 'x-nitro-prerender'

const setMarkdownResponseHeaders = (
  event: Parameters<typeof setHeader>[0],
  path: string,
  markdown: string,
): void => {
  setHeader(event, 'content-type', 'text/markdown; charset=utf-8')
  setHeader(event, 'vary', 'Accept, Sec-Fetch-Dest')
  setHeader(event, 'x-markdown-tokens', String(estimateMarkdownTokens(markdown)))

  const alternateLink = buildAlternateHtmlLink(path)
  const link = path === '/'
    ? mergeLinkHeader(alternateLink, buildHomepageAgentLinks())
    : alternateLink

  setHeader(event, 'link', link)
}

const resolveNegotiatedMarkdown = async (
  event: Parameters<typeof convertPageHtmlToMarkdown>[0],
  path: string,
): Promise<string> => {
  const contentMarkdown = await resolvePageMarkdown(event, path)

  if (contentMarkdown) {
    return contentMarkdown
  }

  log.error(`Content markdown unavailable for ${path}, falling back to HTML conversion`)

  return convertPageHtmlToMarkdown(event, path)
}

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET' && event.method !== 'HEAD') {
    return
  }

  if (getHeader(event, INTERNAL_HTML_HEADER) || getHeader(event, PRERENDER_HEADER)) {
    return
  }

  const accept = getHeader(event, 'accept')

  if (!isMarkdownNegotiationRequest(event.path, accept)) {
    return
  }

  const path = resolveMarkdownPagePath(event.path)

  if (!path) {
    return
  }

  try {
    const markdown = await resolveNegotiatedMarkdown(event, path)

    setMarkdownResponseHeaders(event, path, markdown)

    if (event.method === 'HEAD') {
      return ''
    }

    return markdown
  }
  catch (error) {
    if (event.path.endsWith('.md')) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
      })
    }

    throw error
  }
})
