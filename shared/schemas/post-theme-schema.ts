import { z } from '@nuxt/content'

const themeColorSchema = z.string().regex(
  /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$|^rgb\(/,
  'Theme colors must be hex (#rgb or #rrggbb) or rgb(...)',
)

export const postThemeSchema = z.object({
  light: z.array(themeColorSchema).min(2).max(4),
  dark: z.array(themeColorSchema).min(2).max(4),
})
