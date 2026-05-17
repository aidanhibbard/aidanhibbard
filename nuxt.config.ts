import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    'nuxt-studio',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
    '@nuxt/icon',
    '@nuxtjs/seo',
    'nuxt-ai-ready',
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
    },
    pageTransition: {
      mode: 'out-in',
      name: 'page',
    },
  },
  css: [
    './app/assets/css/tailwind.css',
    '~/assets/css/main.css',
  ],
  // // https://www.shadcn-vue.com/docs/dark-mode/nuxt
  colorMode: {
    classSuffix: '',
  },
  // https://github.com/unovue/shadcn-vue/issues/763#issuecomment-3893652866
  ignore: ['app/components/shadcn/ui/**'],
  future: {
    compatibilityVersion: 5,
  },
  compatibilityDate: '2026-05-14',
  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vueuse/core',
        'class-variance-authority',
        'clsx',
        'reka-ui',
        'tailwind-merge',
        'vue-sonner',
      ],
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
    tsConfig: {
      exclude: [
        // Nuxt writes this into .nuxt/tsconfig.*.json (cwd .nuxt/), so ../app/… not ./app/…
        '../app/components/shadcn/ui/**',
      ],
    },
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
    // Both of these values have to be set alongside components.json
    // Or the console starts throwing warnings for duplicate components
    // https://github.com/unovue/shadcn-vue/issues/763
    prefix: '',
    componentDir: './app/components/shadcn/ui',
  },
})
