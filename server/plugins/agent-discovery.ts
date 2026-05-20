import { getResponseHeader, setHeader } from 'h3'
import { buildHomepageAgentLinks } from '../utils/build-homepage-agent-links'
import { buildMarkdownAlternateLink } from '../utils/build-markdown-alternate-link'
import { estimateMarkdownTokens } from '../utils/estimate-markdown-tokens'
import { isSupportedMarkdownPage } from '../utils/is-supported-markdown-page'
import { mergeLinkHeader } from '../utils/merge-link-header'
import { normalizeResponseHeader } from '../utils/normalize-response-header'
import { resolveMarkdownPagePath } from '../utils/resolve-markdown-page-path'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', (event, { body }) => {
    const contentType = normalizeResponseHeader(getResponseHeader(event, 'content-type'))
    const contextBody = (event.context as { markdownBody?: string }).markdownBody
    const isMarkdownResponse = contextBody !== undefined || contentType?.includes('text/markdown')

    if (isMarkdownResponse) {
      const markdownBody = contextBody ?? (typeof body === 'string' ? body : undefined)

      if (markdownBody) {
        setHeader(event, 'content-type', 'text/markdown; charset=utf-8')
        setHeader(event, 'x-markdown-tokens', String(estimateMarkdownTokens(markdownBody)))
      }

      return
    }

    if (!contentType?.includes('text/html')) {
      return
    }

    if (!isSupportedMarkdownPage(event.path)) {
      return
    }

    const pagePath = resolveMarkdownPagePath(event.path) ?? event.path.split('?')[0] ?? '/'
    const existingLink = getResponseHeader(event, 'link')
    const additions = pagePath === '/'
      ? buildHomepageAgentLinks()
      : [buildMarkdownAlternateLink(pagePath)]
    const link = mergeLinkHeader(existingLink, additions)

    setHeader(event, 'link', link)
  })
})
