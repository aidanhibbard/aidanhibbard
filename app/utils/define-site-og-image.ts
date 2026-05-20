import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'

type SiteOgImageProps = {
  title?: MaybeRefOrGetter<string | undefined>
  description?: MaybeRefOrGetter<string | undefined>
  colorMode?: MaybeRefOrGetter<'dark' | 'light' | undefined>
}

export const defineSiteOgImage = (props: SiteOgImageProps): void => {
  defineOgImage('NuxtSeo.takumi', {
    title: () => toValue(props.title),
    description: () => toValue(props.description),
    colorMode: () => toValue(props.colorMode) ?? 'dark',
  })
}
