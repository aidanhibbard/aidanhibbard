export const sanitizeConvertedMarkdown = (markdown: string): string => {
  return markdown
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
