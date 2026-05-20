import type { TocLink } from '@nuxtjs/mdc'

export type FlatContentTocLink = {
  id: string
  text: string
  depth: number
}

export const flattenContentTocLinks = (
  links: TocLink[],
  depth = 0,
): FlatContentTocLink[] =>
  links.flatMap(link => [
    {
      id: link.id,
      text: link.text,
      depth,
    },
    ...(link.children ? flattenContentTocLinks(link.children, depth + 1) : []),
  ])
