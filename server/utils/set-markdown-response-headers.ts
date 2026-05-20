import { setHeader } from 'h3'
import { buildAlternateHtmlLink } from './build-alternate-html-link'
import { buildHomepageAgentLinks } from './build-homepage-agent-links'
import { buildMarkdownAlternateLink } from './build-markdown-alternate-link'
import { estimateMarkdownTokens } from './estimate-markdown-tokens'
import { mergeLinkHeader } from './merge-link-header'

export const setMarkdownResponseHeaders = (
  event: Parameters<typeof setHeader>[0],
  path: string,
  markdown: string,
): void => {
  setHeader(event, 'content-type', 'text/markdown; charset=utf-8')
  setHeader(event, 'vary', 'Accept, Sec-Fetch-Dest')
  setHeader(event, 'x-markdown-tokens', String(estimateMarkdownTokens(markdown)))

  const link = path === '/'
    ? mergeLinkHeader(buildAlternateHtmlLink(path), buildHomepageAgentLinks())
    : mergeLinkHeader(undefined, [
        buildAlternateHtmlLink(path),
        buildMarkdownAlternateLink(path),
      ])

  setHeader(event, 'link', link)
}
