import { readdirSync } from 'node:fs'
import { join } from 'node:path'

export const listContentPostRoutes = (contentRoot: string): string[] => {
  const postsDir = join(contentRoot, 'posts')

  try {
    return readdirSync(postsDir)
      .filter((filename) => filename.endsWith('.md'))
      .map((filename) => `/posts/${filename.slice(0, -3)}`)
  }
  catch {
    return []
  }
}
