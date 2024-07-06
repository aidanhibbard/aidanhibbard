// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // TODO: Make devtools a ENV key
  devtools: { enabled: false, },

  modules: ['@nuxt/content', '@nuxt/image', '@nuxt/eslint', '@nuxtjs/color-mode'],
  css: ['~/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      }
    }
  },
  // https://color-mode.nuxtjs.org/#tailwindcss
  colorMode: {
    classSuffix: ''
  },
  compatibilityDate: '2024-07-05',
});