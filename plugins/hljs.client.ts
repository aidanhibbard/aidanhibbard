import highlightJS from '@highlightjs/vue-plugin'
import 'highlight.js/styles/atom-one-dark.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(highlightJS)
})
