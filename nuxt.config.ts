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

  // https://color-mode.nuxtjs.org/#tailwindcss
  colorMode: {
    classSuffix: ''
  },
  compatibilityDate: '2024-07-05',
});