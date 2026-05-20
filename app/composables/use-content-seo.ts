import type { Ref } from 'vue'
import { computed } from 'vue'
import type { ContentSeoPage } from '#shared/types/content/content-seo-page'
import { resolveContentSchemaOrg } from '@/utils/resolve-content-schema-org'
import { defineSiteOgImage } from '@/utils/define-site-og-image'

const resolveRobotsMeta = (
  robots: string | boolean | undefined,
): string | undefined => {
  if (robots === false) {
    return 'noindex, nofollow'
  }

  if (robots === true) {
    return 'index, follow'
  }

  if (typeof robots === 'string') {
    return robots
  }

  return undefined
}

const resolveOgImageTitle = (
  page: ContentSeoPage | null | undefined,
): string | undefined => {
  return (page?.ogImage?.props?.title as string | undefined) ?? page?.title
}

const resolveOgImageDescription = (
  page: ContentSeoPage | null | undefined,
): string | undefined => {
  return (page?.ogImage?.props?.description as string | undefined)
    ?? page?.description
}

export const useContentSeo = (
  page: Ref<ContentSeoPage | null | undefined>,
) => {
  const schemaIds = useSiteSchemaIds()

  useSeoMeta({
    title: () => page.value?.seo?.title ?? page.value?.title ?? '',
    description: () =>
      page.value?.seo?.description ?? page.value?.description ?? '',
    robots: () =>
      resolveRobotsMeta(page.value?.robots)
      ?? page.value?.seo?.robots,
    ogImage: () => page.value?.ogImage?.url,
  })

  useSchemaOrg(computed(() =>
    resolveContentSchemaOrg(page.value, schemaIds),
  ))

  defineSiteOgImage({
    title: computed(() => resolveOgImageTitle(page.value)),
    description: computed(() => resolveOgImageDescription(page.value)),
    siteLabel: computed(() => page.value?.title),
    colorMode: computed(() =>
      (page.value?.ogImage?.props?.colorMode as 'dark' | 'light' | undefined)
      ?? 'dark',
    ),
  })
}
