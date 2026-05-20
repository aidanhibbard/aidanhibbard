export const stripMarkdownFrontmatter = (markdown: string): string => {
  if (!markdown.startsWith('---')) {
    return markdown.trim()
  }

  const closingIndex = markdown.indexOf('\n---', 3)

  if (closingIndex === -1) {
    return markdown.trim()
  }

  return markdown.slice(closingIndex + 4).trim()
}
