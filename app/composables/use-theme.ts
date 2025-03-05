export function useTheme() {
  const theme = useCookie<ThemeType>('theme', { default: () => 'system' })

  const applyTheme = (newTheme?: ThemeType) => {
    if (newTheme) theme.value = newTheme

    const selectedTheme
      = theme.value === 'dark' || (theme.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? 'dark'
        : 'light'

    document.documentElement.setAttribute('data-theme', selectedTheme)
  }

  watchEffect(() => applyTheme())

  return { theme, applyTheme }
}
