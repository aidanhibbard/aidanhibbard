import type { Theme } from '~/types/theme'
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

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

  const pageBackgroundStyle = computed<CSSProperties>(() => {
    const base = theme.value === 'dark' ? '#000000' : '#ffffff'
    const ice1 = '#e6fbff'
    const ice2 = '#cdefff'
    const ice3 = '#a6e8ff'

    return {
      backgroundImage: [
        `radial-gradient(60% 50% at 0% 0%, ${ice1} 0%, transparent 60%)`,
        `radial-gradient(60% 50% at 100% 100%, ${ice2} 0%, transparent 60%)`,
        `linear-gradient(180deg, ${base} 0%, ${ice3} 100%)`,
      ].join(', '),
      backgroundAttachment: 'fixed, fixed, fixed',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover, cover, cover',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    }
  })

  onMounted(() => {
    applyTheme(theme.value)
  })

  return {
    toggleTheme,
    theme,
    pageBackgroundStyle,
  }
}
