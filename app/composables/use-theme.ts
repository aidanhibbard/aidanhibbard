export function useTheme() {
  const codeThemeOptions: CodeThemeOption[] = [
    { label: 'Catppuccin Latte', value: 'catppuccin-latte' },
    { label: 'Everforest Light', value: 'everforest-light' },
    { label: 'GitHub Light', value: 'github-light' },
    { label: 'GitHub Light Default', value: 'github-light-default' },
    { label: 'GitHub Light High Contrast', value: 'github-light-high-contrast' },
    { label: 'Kanagawa Lotus', value: 'kanagawa-lotus' },
    { label: 'Light Plus', value: 'light-plus' },
    { label: 'Material Theme Lighter', value: 'material-theme-lighter' },
    { label: 'Min Light', value: 'min-light' },
    { label: 'One Light', value: 'one-light' },
    { label: 'Rose Pine Dawn', value: 'rose-pine-dawn' },
    { label: 'Slack Ochin', value: 'slack-ochin' },
    { label: 'Snazzy Light', value: 'snazzy-light' },
    { label: 'Solarized Light', value: 'solarized-light' },
    { label: 'Vitesse Light', value: 'vitesse-light' },
    { label: 'Andromeeda', value: 'andromeeda' },
    { label: 'Aurora X', value: 'aurora-x' },
    { label: 'Ayu Dark', value: 'ayu-dark' },
    { label: 'Catppuccin Frappe', value: 'catppuccin-frappe' },
    { label: 'Catppuccin Macchiato', value: 'catppuccin-macchiato' },
    { label: 'Catppuccin Mocha', value: 'catppuccin-mocha' },
    { label: 'Dark Plus', value: 'dark-plus' },
    { label: 'Dracula', value: 'dracula' },
    { label: 'Dracula Soft', value: 'dracula-soft' },
    { label: 'Everforest Dark', value: 'everforest-dark' },
    { label: 'GitHub Dark', value: 'github-dark' },
    { label: 'GitHub Dark Default', value: 'github-dark-default' },
    { label: 'GitHub Dark Dimmed', value: 'github-dark-dimmed' },
    { label: 'GitHub Dark High Contrast', value: 'github-dark-high-contrast' },
    { label: 'Houston', value: 'houston' },
    { label: 'Kanagawa Dragon', value: 'kanagawa-dragon' },
    { label: 'Kanagawa Wave', value: 'kanagawa-wave' },
    { label: 'Laserwave', value: 'laserwave' },
    { label: 'Material Theme', value: 'material-theme' },
    { label: 'Material Theme Darker', value: 'material-theme-darker' },
    { label: 'Material Theme Ocean', value: 'material-theme-ocean' },
    { label: 'Material Theme Palenight', value: 'material-theme-palenight' },
    { label: 'Min Dark', value: 'min-dark' },
    { label: 'Monokai', value: 'monokai' },
    { label: 'Night Owl', value: 'night-owl' },
    { label: 'Nord', value: 'nord' },
    { label: 'One Dark Pro', value: 'one-dark-pro' },
    { label: 'Plastic', value: 'plastic' },
    { label: 'Poimandres', value: 'poimandres' },
    { label: 'Red', value: 'red' },
    { label: 'Rose Pine', value: 'rose-pine' },
    { label: 'Rose Pine Moon', value: 'rose-pine-moon' },
    { label: 'Slack Dark', value: 'slack-dark' },
    { label: 'Solarized Dark', value: 'solarized-dark' },
    { label: 'Synthwave 84', value: 'synthwave-84' },
    { label: 'Tokyo Night', value: 'tokyo-night' },
    { label: 'Vesper', value: 'vesper' },
    { label: 'Vitesse Black', value: 'vitesse-black' },
    { label: 'Vitesse Dark', value: 'vitesse-dark' },
  ]

  const theme = useCookie<ThemeType>('theme', { default: () => 'system' })
  const codeTheme = useState('code-theme', (): CodeThemeOption => ({
    label: 'Github Dark',
    value: 'github-dark',
  }))

  const applyTheme = (newTheme?: ThemeType) => {
    if (newTheme) theme.value = newTheme
    if (import.meta.client && newTheme) {
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }

  const applyCodeTheme = (newTheme: CodeThemeOption) => {
    codeTheme.value = newTheme
  }

  return { theme, applyTheme, codeTheme, applyCodeTheme, codeThemeOptions }
}
