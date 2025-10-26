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
  ],
  devtools: { enabled: true },
  css: [
    '~/assets/styles/css/main.css',
    '~/assets/styles/css/main.css',
  ],
  compatibilityDate: '2025-07-15',
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
  shadcn: {
    prefix: '',
    componentDir: './app/shadcn/components/ui',
  },
})
