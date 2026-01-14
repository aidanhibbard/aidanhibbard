import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // Nuxt
    '@nuxt/content',
    '@nuxtjs/color-mode',
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
    'motion-v/nuxt',
    'nuxt-llms',
    'nuxt-mcp-dev',
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
        { property: 'og:image', content: 'https://res.cloudinary.com/dlnxtpill/image/upload/v1767259242/Screenshot_2026-01-01_at_1.20.06_AM_j4xrbp.png' },
        { property: 'og:image:alt', content: 'Site preview' },
        { property: 'og:logo', content: '' },
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
  // https://www.shadcn-vue.com/docs/dark-mode/nuxt
  colorMode: {
    classSuffix: '',
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
})
