import { contentMarkdownQuerySchema } from '../../../shared/schemas/content-markdown-query'
import { resolvePageMarkdown } from '../../services/content/resolve-page-markdown'
import { convertPageHtmlToMarkdown } from '../../utils/convert-page-html-to-markdown'

export default defineEventHandler(async (event) => {
  const { path } = await getValidatedQuery(event, query => contentMarkdownQuerySchema.parse(query))

  const markdown = await resolvePageMarkdown(event, path)

  if (markdown) {
    setHeader(event, 'content-type', 'text/markdown; charset=utf-8')
    return markdown
  }

  if (path.startsWith('/posts/')) {
    throw createError({
      status: 404,
      message: 'Page not found',
    })
  }

  const converted = await convertPageHtmlToMarkdown(event, path)

  setHeader(event, 'content-type', 'text/markdown; charset=utf-8')

  return converted
})
