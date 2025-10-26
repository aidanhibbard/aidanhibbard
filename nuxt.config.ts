import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

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
    'shadcn-nuxt'
  ],
  css: [
    '~/assets/styles/css/main.css',
    '~/assets/styles/css/main.css'
  ],
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      }
    },
    checker: true
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  vite: {
    plugins: [
      tailwindcss()
    ],
  },
  shadcn: {
    prefix: '',
    componentDir: './app/shadcn/components/ui'
  },
})