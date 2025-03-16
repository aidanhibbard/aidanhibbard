import type { TocLink } from '@nuxtjs/mdc'

export default () => useState('toc', (): TocLink[] | undefined => undefined)
