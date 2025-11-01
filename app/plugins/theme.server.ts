import { getRequestHeader } from 'h3'

export default defineNuxtPlugin((nuxtApp) => {
  const event = nuxtApp.ssrContext?.event
  const header = event ? getRequestHeader(event, 'sec-ch-prefers-color-scheme') : undefined
  const parsed = (header ?? '').replace(/"/g, '')
  const initial = parsed === 'light' || parsed === 'dark' ? parsed : 'dark'

  const theme = useState<'light' | 'dark'>('theme', () => initial as 'light' | 'dark')

  useHead({
    htmlAttrs: {
      class: theme.value === 'dark' ? 'dark' : undefined,
    },
    meta: [
      { name: 'color-scheme', content: theme.value === 'dark' ? 'dark light' : 'light dark' },
    ],
  })
})
