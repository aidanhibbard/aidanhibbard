import tailwindcss from '@tailwindcss/vite'
import { definePerson } from 'nuxt-schema-org/schema'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
    '@nuxt/icon',
    'nuxt-ai-ready',
  ],
  $development: {
    modules: [
      'nuxt-studio',
    ],
  },
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
  site: {
    url: 'https://aidanhibbard.dev',
    name: 'Aidan Hibbard',
    description: 'Senior software engineer in Central Oregon writing about production systems, integrations, and the craft of building software.',
    defaultLocale: 'en',
    indexable: process.env.NODE_ENV === 'production',
  },
  // // https://www.shadcn-vue.com/docs/dark-mode/nuxt
  colorMode: {
    classSuffix: '',
  },
  // https://github.com/unovue/shadcn-vue/issues/763#issuecomment-3893652866
  ignore: ['app/components/shadcn/ui/**'],
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/about.md': { prerender: true },
    '/posts': { prerender: true },
    '/posts/**': { prerender: true },
    '/resume': { prerender: true },
    '/llms.txt': { prerender: true },
    '/llms-full.txt': { prerender: true },
    '/sitemap.xml': { prerender: true },
    '/robots.txt': { prerender: true },
  },
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
        '@unhead/schema-org/vue',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vueuse/core',
        'class-variance-authority',
        'clsx',
        'lucide-vue-next',
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
  hooks: {
    'ai-ready:llms-txt': (payload) => {
      payload.notes.push('Raw markdown: /page.md')
    },
  },
  aiReady: {
    contentSignal: {
      aiTrain: true,
      search: true,
      aiInput: true,
    },
    llmsTxt: {
      notes: [
        'Personal site and blog of Aidan Hibbard, a senior software engineer in Central Oregon.',
        'Blog posts cover production debugging, backend systems, frontend architecture, and integrations.',
        'Markdown sources are available as .md routes for AI agents.',
      ],
      sections: [
        {
          title: 'Profiles',
          links: [
            {
              title: 'GitHub',
              href: 'https://github.com/aidanhibbard',
              description: 'Open source projects and experiments.',
            },
            {
              title: 'LinkedIn',
              href: 'https://www.linkedin.com/in/aidan-hibbard/',
              description: 'Professional profile.',
            },
          ],
        },
      ],
    },
    indexNow: true,
  },
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
    checker: true,
  },
  ogImage: {
    defaults: {
      width: 1200,
      height: 630,
    },
  },
  robots: {
    disallow: ['/api/**'],
  },
  schemaOrg: {
    identity: definePerson({
      name: 'Aidan Hibbard',
      description: 'Senior Software Engineer',
      url: 'https://aidanhibbard.dev',
      sameAs: [
        'https://github.com/aidanhibbard',
        'https://www.linkedin.com/in/aidan-hibbard/',
      ],
    }),
  },
  seo: {
    automaticOgAndTwitterTags: false,
    meta: {
      description: 'Senior software engineer writing about the craft of building software.',
      author: 'Aidan Hibbard',
      themeColor: [
        { content: '#09090b', media: '(prefers-color-scheme: dark)' },
        { content: '#ffffff', media: '(prefers-color-scheme: light)' },
      ],
      colorScheme: 'dark light',
      ogType: 'website',
      ogSiteName: 'Aidan Hibbard',
      ogLocale: 'en_US',
    },
  },
  shadcn: {
    // Both of these values have to be set alongside components.json
    // Or the console starts throwing warnings for duplicate components
    // https://github.com/unovue/shadcn-vue/issues/763
    prefix: '',
    componentDir: './app/components/shadcn/ui',
  },
  sitemap: {
    defaults: {
      changefreq: 'weekly',
      priority: 0.7,
    },
  },
})
