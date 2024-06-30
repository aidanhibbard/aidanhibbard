// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // TODO: Make devtools a ENV key
  devtools: { enabled: false, },
  modules: ['@nuxt/content', '@nuxt/image', '@nuxt/eslint'],
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});