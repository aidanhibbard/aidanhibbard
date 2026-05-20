import { buildMarkdownRoutePath } from './build-markdown-route-path'

export const buildMarkdownAlternateLink = (pagePath: string): string => {
  const markdownPath = buildMarkdownRoutePath(pagePath)

  return `<${markdownPath}>; rel="alternate"; type="text/markdown"`
}
