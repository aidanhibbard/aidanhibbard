import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const contentRoot = resolve(process.cwd(), 'content')

export const readContentMarkdown = async (contentPath: string): Promise<string> => {
  const relativePath = contentPath.replace(/^\//, '')
  const filePath = resolve(contentRoot, `${relativePath}.md`)

  if (!filePath.startsWith(contentRoot)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid content path',
    })
  }

  try {
    return await readFile(filePath, 'utf8')
  }
  catch {
    throw createError({
      statusCode: 404,
      statusMessage: 'Content not found',
    })
  }
}
