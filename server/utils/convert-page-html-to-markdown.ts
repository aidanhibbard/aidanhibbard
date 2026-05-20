import type { H3Event } from 'h3'
import { htmlToMarkdown } from 'mdream'

const INTERNAL_HTML_HEADER = 'x-ai-ready-internal'

const buildCanonicalUrl = (event: H3Event, path: string): string => {
  const config = useRuntimeConfig(event)
  const configuredSiteUrl = (config.site as { url?: string } | undefined)?.url

  if (configuredSiteUrl) {
    return new URL(path, configuredSiteUrl).toString()
  }

  return new URL(path, getRequestURL(event).origin).toString()
}

export const convertPageHtmlToMarkdown = async (
  event: H3Event,
  path: string,
): Promise<string> => {
  const response = await event.fetch(path, {
    headers: { [INTERNAL_HTML_HEADER]: '1' },
    redirect: 'manual',
    method: 'GET',
  })

  const contentType = response.headers.get('content-type') ?? ''

  if (!response.ok || !contentType.includes('text/html')) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
    })
  }

  const html = await response.text()
  const canonicalUrl = buildCanonicalUrl(event, path)

  return htmlToMarkdown(html, {
    minimal: true,
    clean: true,
    origin: new URL(canonicalUrl).origin,
  })
}
