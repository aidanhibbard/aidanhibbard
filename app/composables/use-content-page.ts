import type { TocLink } from '@nuxtjs/mdc'
import { toast } from 'vue-sonner'

export const useContentPage = () => {
  const buildToc = (body: unknown): TocLink[] => {
    if (!body || typeof body !== 'object' || !('toc' in body)) {
      return []
    }

    const toc = body.toc as { links?: TocLink[] }

    return toc.links ?? []
  }

  const copyMarkdown = async (path: string): Promise<boolean> => {
    try {
      const markdown = await $fetch<string>('/api/content/markdown', {
        query: { path },
      })

      await navigator.clipboard.writeText(markdown)
      toast.success('Markdown copied')

      return true
    }
    catch {
      toast.error('Copy failed')

      return false
    }
  }

  return {
    buildToc,
    copyMarkdown,
  }
}
