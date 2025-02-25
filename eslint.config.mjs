import { createConfigForNuxt } from '@nuxt/eslint-config'

export default createConfigForNuxt({
  features: {
    stylistic: true,
  },
}).overrideRules({
  'vue/block-lang': ['error',
    {
      script: {
        lang: 'ts',
      },
    },
  ],
})
