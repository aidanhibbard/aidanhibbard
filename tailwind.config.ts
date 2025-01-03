import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(77, 255, 243, 0.17)",
          "0 0px 65px rgba(0, 255, 204, 0.2)"
        ]
      }
    },
  },
  plugins: [
    typography(),
    forms(),
  ],
} satisfies Config;
