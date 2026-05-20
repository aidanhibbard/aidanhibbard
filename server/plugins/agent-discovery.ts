import { getResponseHeader, setHeader } from 'h3'
import { buildHomepageAgentLinks } from '../utils/build-homepage-agent-links'
import { estimateMarkdownTokens } from '../utils/estimate-markdown-tokens'
import { mergeLinkHeader } from '../utils/merge-link-header'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', (event, { body }) => {
    const contentType = getResponseHeader(event, 'content-type')

    if (typeof body === 'string' && contentType?.includes('text/markdown')) {
      setHeader(event, 'x-markdown-tokens', String(estimateMarkdownTokens(body)))
    }

    if (event.path !== '/') {
      return
    }

    if (!contentType?.includes('text/html')) {
      return
    }

    const existingLink = getResponseHeader(event, 'link')
    const link = mergeLinkHeader(existingLink, buildHomepageAgentLinks())

    setHeader(event, 'link', link)
  })
})
