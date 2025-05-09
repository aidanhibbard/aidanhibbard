// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    'floating-vue/nuxt',
    '@nuxtjs/cloudinary',
  ],
  devtools: { enabled: true, },
  app: {
    head: {
      titleTemplate: '%s | Aidan Hibbard',
      htmlAttrs: {
        class: 'h-full flex-col flex',
        lang: 'en-us',
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
    },
  },
  css: ['~/assets/styles/main.css',],
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-04-28',
  typescript: {
    strict: true,
  },
  eslint: {
    config: {
      stylistic: {
        semi: true,
        quotes: 'single',
        commaDangle: 'always',
      },
    },
    checker: true,
  },
  llms: {
    domain: 'https://aidanhibbard.dev',
    title: 'Aidan Hibbard',
    description: 'My portfolio',
  },
  seo: {
    meta: {
      description: 'My portfolio.',
      author: 'Aidan Hibbard',
      applicationName: 'Aidan Hibbard',

      ogSiteName: 'Aidan Hibbard',
      ogLocale: 'en_US',
      ogType: 'website',
      ogUrl: 'https://aidanhibbard.dev',
      ogTitle: 'Aidan Hibbard',

      robots: 'index, follow',
    },
  },
},);
