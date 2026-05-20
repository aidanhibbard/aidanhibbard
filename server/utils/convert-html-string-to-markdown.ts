import { htmlToMarkdown } from 'mdream'
import { sanitizeConvertedMarkdown } from './sanitize-converted-markdown'

const htmlToMarkdownOptions = (origin: string) => ({
  minimal: true,
  clean: true,
  origin,
  isolateMain: true,
  filter: {
    include: ['main', 'article', '[role="main"]'],
    exclude: ['nav', 'footer', 'header', 'form', 'script', 'style'],
    processChildren: true,
  },
})

export const convertHtmlStringToMarkdown = (
  html: string,
  canonicalUrl: string,
): string => {
  const origin = new URL(canonicalUrl).origin
  const markdown = htmlToMarkdown(html, htmlToMarkdownOptions(origin))

  return sanitizeConvertedMarkdown(markdown)
}
