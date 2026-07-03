import type { TocLink } from '@nuxtjs/mdc'

export default () => {
  const buildToc = (body: unknown): TocLink[] => {
    if (!body || typeof body !== 'object' || !('toc' in body)) {
      return []
    }

    const toc = body.toc as { links?: TocLink[] }

    return toc.links ?? []
  }

  return {
    buildToc,
  }
}
