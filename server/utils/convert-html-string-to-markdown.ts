import { htmlToMarkdown } from 'mdream'

export const convertHtmlStringToMarkdown = (
  html: string,
  canonicalUrl: string,
): string => {
  return htmlToMarkdown(html, {
    minimal: true,
    clean: true,
    origin: new URL(canonicalUrl).origin,
  })
}
