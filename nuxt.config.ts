import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    'nuxt-llms',
    '@nuxtjs/seo',
    'shadcn-nuxt',
    'motion-v/nuxt',
    '@tresjs/nuxt',
    '@nuxtjs/google-fonts',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Aidan Hibbard',
      htmlAttrs: {
        lang: 'en',
      },
    },
    pageTransition: {
      mode: 'out-in',
      name: 'page',
    },
  },
  css: [
    '~/assets/styles/css/tailwind.css',
    '~/assets/styles/css/main.css',
  ],
  routeRules: {
    '/**': {
      headers: {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-CH-Prefers-Color-Scheme#using_sec-ch-prefers-color-scheme
        'Accept-CH': 'Sec-CH-Prefers-Color-Scheme',
        'Critical-CH': 'Sec-CH-Prefers-Color-Scheme',
        'Vary': 'Sec-CH-Prefers-Color-Scheme',
      },
    },
  },
  compatibilityDate: '2025-10-26',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
    checker: true,
  },
  googleFonts: {
    families: {
      'Dancing Script': [400, 600, 700],
    },
    display: 'swap',
    preconnect: true,
  },
  llms: {
    domain: 'aidanhibbard.dev',
    title: 'Aidan Hibbard',
  },
})