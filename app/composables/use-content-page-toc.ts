import type { Ref } from 'vue'
import type { TocLink } from '@nuxtjs/mdc'

type ContentPageBody = {
  body?: unknown
} | null | undefined

export default (page: Ref<ContentPageBody>): Ref<TocLink[]> => {
  const { buildToc } = useContentPage()

  return computed(() => buildToc(page.value?.body))
}
