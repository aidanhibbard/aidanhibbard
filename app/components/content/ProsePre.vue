<script setup lang="ts">
import { DocumentDuplicateIcon } from '@heroicons/vue/20/solid'
import { codeToHtml } from 'shiki'

// https://content.nuxt.com/docs/components/prose#prosepre
const props = defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
}>()

const defaultMsg = 'Copy to clipboard'

const state = reactive({
  copyMsg: defaultMsg,
  highlightedCode: '',
  theme: 'github-dark',
})

const codeWrapper = ref<HTMLDivElement | null>(null)
const copyToClipboard = async () => {
  if (codeWrapper.value) {
    try {
      await navigator.clipboard.writeText(codeWrapper.value.innerText.split('\n') // Split into an array of lines
        .filter(line => line.trim() !== '') // Remove empty lines
        .join('\n'))
      state.copyMsg = 'Copied to clipboard!'
    }
    catch {
      state.copyMsg = 'Failed to copy'
    }
    finally {
      setTimeout(() => {
        state.copyMsg = defaultMsg
      }, 1500)
    }
  }
}

watchEffect(async () => {
  if (props.code) {
    const html = await codeToHtml(props.code, {
      lang: props.language ?? '',
      theme: state.theme,
    })
    state.highlightedCode = html
  }
})
</script>

<template>
  <div
    class="mx-auto w-full rounded-lg border border-gray-300 flex flex-col overflow-hidden bg-white relative my-4"
  >
    <button
      class="hover:text-gray-600 absolute top-2 right-2"
      @click="copyToClipboard"
    >
      <DocumentDuplicateIcon
        v-tooltip="state.copyMsg"
        class="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors"
      />
    </button>
    <div
      v-if="props.filename || props.language"
      class="flex items-center justify-between p-2 border-b border-gray-300 bg-gray-100 text-gray-800 text-sm font-mono"
    >
      <div class="flex items-center gap-2 pl-2">
        <Icon
          name="catppuccin:vue"
          class="h-6 w-6"
        />
        <span
          v-if="props.filename"
          class="font-semibold hover:cursor-pointer text-gray-700 hover:text-teal-500 transition-colors duration-300"
        >
          {{ props.filename }}
        </span>
      </div>
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-if="state.highlightedCode"
      ref="codeWrapper"
      class="text-md"
      v-html="state.highlightedCode"
    />
    <!-- eslint-enable vue/no-v-html -->
  </div>
</template>

<style>
/* style can't be scoped or it'll fail to target shiki  */
pre.shiki {
  margin: 0;
  border-radius: 0;
  padding: 1rem;
  overflow-x: auto;
}
</style>
