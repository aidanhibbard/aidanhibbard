import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'

type SiteOgImageProps = {
  title?: MaybeRefOrGetter<string | undefined>
  description?: MaybeRefOrGetter<string | undefined>
  siteLabel?: MaybeRefOrGetter<string | undefined>
  colorMode?: MaybeRefOrGetter<'dark' | 'light' | undefined>
}

export const defineSiteOgImage = (props: SiteOgImageProps): void => {
  const site = useSiteConfig()

  // @ts-expect-error SitePage is registered from app/components/OgImage/SitePage.vue
  defineOgImage('SitePage', {
    title: () => toValue(props.title) ?? site.name,
    description: () => toValue(props.description) ?? site.description,
    siteLabel: () => toValue(props.siteLabel) ?? toValue(props.title) ?? site.name,
    siteUrl: () => site.url,
    colorMode: () => toValue(props.colorMode) ?? 'dark',
  })
}
