import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/mdc',
    '@nuxt/icon',
    'floating-vue/nuxt',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/seo',
    '@nuxt/content',
  ],
  devtools: { enabled: false },
  app: {
    head: {
      // https://tailwindui.com/documentation
      link: [{ rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }],
      templateParams: {
        // https://nuxtseo.com/learn/mastering-meta/titles#vue-title-best-practices
        siteName: 'Aidan Hibbard',
      },
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  css: ['~/assets/css/main.css'],
  unhead: { legacy: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  vite: {
    plugins: [tailwindcss()],
  },
  icon: {
    collections: ['catppuccin', 'mdi'],
  },
  scripts: {
    registry: {
      googleAnalytics: {
        id: process.env.GOOGLE_ANALYTICS_ID ?? '',
      },
    },
  },
  // https://nuxtseo.com/docs/seo-utils/guides/nuxt-config-seo-meta#usage
  seo: {
    meta: {
      description: 'My portfolio.',
      author: 'Aidan Hibbard',
      colorScheme: 'dark light',
      applicationName: 'Aidan Hibbard',

      ogSiteName: 'Aidan Hibbard',
      ogLocale: 'en_US',
      ogType: 'website',
      ogUrl: 'https://aidanhibbard.dev',
      ogTitle: 'Aidan Hibbard',

      ogImage: 'https://example.com/my-og-image.png',
      robots: 'index, follow',
    },
  },
})
