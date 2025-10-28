import type { Theme } from '~/types/theme'

export default () => {
  const theme = useState<Theme>('theme', (): Theme => 'light')

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

  onMounted(() => {
    applyTheme(theme.value)
  })

  return {
    toggleTheme,
    theme,
  }
}
