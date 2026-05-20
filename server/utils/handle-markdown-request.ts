import type { H3Event } from 'h3'
import { getHeader, send, sendNoContent } from 'h3'
import { convertPageHtmlToMarkdown } from './convert-page-html-to-markdown'
import { isMarkdownNegotiationRequest } from './is-markdown-negotiation-request'
import { isSupportedMarkdownPage } from './is-supported-markdown-page'
import { resolveMarkdownPagePath } from './resolve-markdown-page-path'
import { setMarkdownResponseHeaders } from './set-markdown-response-headers'
import { resolvePageMarkdown } from '../services/content/resolve-page-markdown'

const log = logger.withTag('markdown-negotiation')

const INTERNAL_HTML_HEADER = 'x-ai-ready-internal'
const PRERENDER_HEADER = 'x-nitro-prerender'

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

export const handleMarkdownRequest = async (
  event: H3Event,
): Promise<unknown> => {
  if (event.method !== 'GET' && event.method !== 'HEAD') {
    return undefined
  }

  if (getHeader(event, INTERNAL_HTML_HEADER) || getHeader(event, PRERENDER_HEADER)) {
    return undefined
  }

  if (!isSupportedMarkdownPage(event.path)) {
    return undefined
  }

  const accept = getHeader(event, 'accept')

  if (!isMarkdownNegotiationRequest(event.path, accept)) {
    return undefined
  }

  const path = resolveMarkdownPagePath(event.path)

  if (!path) {
    return undefined
  }

  try {
    const markdown = await resolveNegotiatedMarkdown(event, path)

    event.context.markdownBody = markdown
    setMarkdownResponseHeaders(event, path, markdown)

    if (event.method === 'HEAD') {
      return sendNoContent(event)
    }

    return send(event, markdown, 'text/markdown; charset=utf-8')
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
}
