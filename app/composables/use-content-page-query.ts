import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'

type UseContentPageQueryOptions = {
  notFoundMessage?: string
}

export const useContentPageQuery = async (
  contentPath: MaybeRefOrGetter<string>,
  options?: UseContentPageQueryOptions,
) => {
  const { buildToc } = useContentPage()

  const { data: page, error } = await useAsyncData(
    () => `content-page:${toValue(contentPath)}`,
    async () => {
      const result = await queryCollection('content').path(toValue(contentPath)).first()

      if (!result) {
        throw createError({
          statusCode: 404,
          statusMessage: options?.notFoundMessage ?? 'Page not found',
        })
      }

      return result
    },
  )

  if (error.value) {
    throw error.value
  }

  useContentSeo(page)

  const tocLinks = computed(() => buildToc(page.value?.body))

  return {
    page,
    tocLinks,
  }
}
