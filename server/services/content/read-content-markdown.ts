import type { H3Event } from 'h3'
import { useStorage } from 'nitropack/runtime'

export const readContentMarkdown = async (
  _event: H3Event,
  contentPath: string,
): Promise<string> => {
  const relativePath = contentPath.replace(/^\//, '')
  const storage = useStorage('assets:content')
  const markdown = await storage.getItem<string>(`${relativePath}.md`)

  if (!markdown) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Content not found',
    })
  }

  return markdown
}
