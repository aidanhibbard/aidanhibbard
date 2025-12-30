import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // Nuxt
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',

    // Nuxt community
    '@nuxtjs/device',
    '@nuxtjs/google-fonts',
    '@nuxtjs/seo',

    // Third-party
    '@tresjs/nuxt',
    'motion-v/nuxt',
    'nuxt-llms',
    'nuxt-mcp',
    'nuxt-security',
    'shadcn-nuxt',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      // https://nuxtseo.com/docs/seo-utils/guides/fallback-title#default-title-template
      title: 'Aidan Hibbard',
      titleTemplate: '%s %separator Aidan Hibbard',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'description', content: 'Aidan Hibbard - Senior Engineer' },
        { property: 'og:image', content: 'https://res.cloudinary.com/dlnxtpill/image/upload/v1762317463/Screenshot_2025-11-04_at_8.35.23_PM_yo28vh.png' },
        { property: 'og:image:alt', content: 'Site preview' },
      ],
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
  shadcn: {
    // Both of these values have to be set alongside components.json
    // Or the console starts throwing warnings for duplicate components
    // https://github.com/unovue/shadcn-vue/issues/763
    prefix: '',
    componentDir: './app/components/shadcn/ui',
  },
  tres: {
    devtools: true,
  },
})
