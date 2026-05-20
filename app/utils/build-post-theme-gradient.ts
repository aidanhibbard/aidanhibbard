import type { PostTheme } from '#shared/types/content/post-theme'

const createSeededRandom = (seed: string): (() => number) => {
  let state = 0

  for (let index = 0; index < seed.length; index += 1) {
    state = Math.imul(31, state) + seed.charCodeAt(index) | 0
  }

  if (state === 0) {
    state = 1
  }

  return (): number => {
    state = Math.imul(48271, state) | 0
    return (state >>> 0) / 4294967296
  }
}

const range = (min: number, max: number, random: () => number): number => {
  return min + random() * (max - min)
}

const buildLinearGradient = (
  colors: string[],
  angle: number,
): string => {
  const stops = colors.map((color, index) => {
    const position = (index / (colors.length - 1)) * 100

    return `${color} ${position.toFixed(1)}%`
  })

  return `linear-gradient(${angle.toFixed(0)}deg, ${stops.join(', ')})`
}

export const buildPostThemeGradient = (
  colors: string[],
  seed: string,
): string => {
  if (colors.length === 1) {
    return colors[0]!
  }

  const random = createSeededRandom(seed)
  const angle = range(35, 325, random)
  const linear = buildLinearGradient(colors, angle)

  const accent = colors[1] ?? colors[0]!
  const highlight = colors[colors.length - 1] ?? accent
  const radialX = range(8, 92, random).toFixed(1)
  const radialY = range(8, 92, random).toFixed(1)
  const radialSize = range(42, 78, random).toFixed(1)
  const radial = `radial-gradient(circle at ${radialX}% ${radialY}%, ${highlight} 0%, transparent ${radialSize}%)`
  const washX = range(0, 100, random).toFixed(1)
  const washY = range(0, 100, random).toFixed(1)
  const wash = `radial-gradient(ellipse 90% 70% at ${washX}% ${washY}%, ${accent} 0%, transparent 72%)`

  return `${wash}, ${radial}, ${linear}`
}

export const resolvePostThemeBackground = (
  theme: PostTheme,
  colorMode: 'light' | 'dark',
  seed: string,
): string => {
  const colors = colorMode === 'dark' ? theme.dark : theme.light

  return buildPostThemeGradient(colors, seed)
}
