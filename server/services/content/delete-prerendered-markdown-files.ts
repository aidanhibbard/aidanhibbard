import { glob, unlink } from 'node:fs/promises'
import { join } from 'node:path'
import { logger } from '../../utils/logger'

const log = logger.withTag('prerender-markdown')

export const deletePrerenderedMarkdownFiles = async (publicDir: string): Promise<void> => {
  for await (const relativePath of glob('**/*.md', { cwd: publicDir })) {
    const filePath = join(publicDir, relativePath)

    try {
      await unlink(filePath)
    }
    catch (error) {
      const code = (error as NodeJS.ErrnoException).code

      if (code !== 'ENOENT') {
        log.error(`Failed to remove prerendered markdown at ${relativePath}`, error)
      }
    }
  }
}
