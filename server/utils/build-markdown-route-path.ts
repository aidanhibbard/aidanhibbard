export const buildMarkdownRoutePath = (pagePath: string): string => {
  if (pagePath === '/') {
    return '/index.md'
  }

  return `${pagePath}.md`
}
