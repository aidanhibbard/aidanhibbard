// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    name: 'vue-override',
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
)
