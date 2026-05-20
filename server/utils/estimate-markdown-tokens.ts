export const estimateMarkdownTokens = (markdown: string): number => {
  if (markdown.length === 0) {
    return 0
  }

  return Math.ceil(markdown.length / 4)
}
