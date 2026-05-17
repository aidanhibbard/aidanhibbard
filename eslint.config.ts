import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: [
      'app/components/shadcn/**',
    ],
  },
  {
    name: 'vue-override',
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
)
