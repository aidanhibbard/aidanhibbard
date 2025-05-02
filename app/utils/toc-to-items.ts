import type { Toc, TocLink } from "@nuxt/content"
import type { TreeItem } from '@nuxt/ui'

const processor = (links: TocLink[]) => []

export default (toc: Toc): TreeItem[] => processor([])