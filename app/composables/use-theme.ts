import type { Theme } from '~/types/theme'

export default () => {
  const themeHeader = useRequestHeader('sec-ch-prefers-color-scheme')

  const theme = useState<Theme>('theme', (): Theme => {
    if (themeHeader) {
      const parsed = themeHeader.replace(/"/g, '')
      return parsed === 'light' ? 'light' : 'dark'
    }
    if (import.meta.client) {
      const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
      return prefersDark ? 'dark' : 'light'
    }
    return 'dark'
  })

  const applyTheme = (value: Theme) => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    if (value === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    applyTheme(theme.value)
  }

  // Sync DOM class whenever theme changes; run immediately on client to avoid drift.
  if (import.meta.client) {
    watch(theme, value => applyTheme(value), { immediate: true })
  }

  return {
    toggleTheme,
    theme,
  }
}
