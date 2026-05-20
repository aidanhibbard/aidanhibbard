import { contentMarkdownQuerySchema } from '../../../shared/schemas/content-markdown-query'
import { readContentMarkdown } from '../../services/content/read-content-markdown'

export default defineEventHandler(async (event) => {
  const { path } = await getValidatedQuery(event, query => contentMarkdownQuerySchema.parse(query))

  const markdown = await readContentMarkdown(path)

  setHeader(event, 'content-type', 'text/markdown; charset=utf-8')

  return markdown
})
