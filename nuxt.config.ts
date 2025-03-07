import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxtjs/mdc',
    '@nuxt/icon',
    'floating-vue/nuxt',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/seo',
  ],
  devtools: { enabled: false },
  app: {
    head: {
      // https://tailwindui.com/documentation
      link: [{ rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  css: ['~/assets/css/main.css'],
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  vite: {
    plugins: [tailwindcss()],
  },
  icon: {
    collections: ['catppuccin'],
  },
  scripts: {
    registry: {
      googleAnalytics: {
        id: process.env.GOOGLE_ANALYTICS_ID ?? '',
      },
    },
  },
})
