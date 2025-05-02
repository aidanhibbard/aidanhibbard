// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        class: 'h-full flex-col flex',
      },
      bodyAttrs: {
        class: 'flex flex-col flex-1',
      },
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    rootAttrs: {
      class: 'flex flex-col flex-1',
    }
  },
  compatibilityDate: '2025-04-28',
  css: ['~/assets/styles/main.css'],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  llms: {
    domain: 'https://aidanhibbard.dev',
    title: 'Aidan Hibbard',
    description: 'My portfolio',
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxtjs/seo',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-llms',
  ],
  typescript: {
    strict: true
  }
})