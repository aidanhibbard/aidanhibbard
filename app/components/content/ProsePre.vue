<script setup lang="ts">
import { DocumentDuplicateIcon } from '@heroicons/vue/20/solid'
import { codeToHtml } from 'shiki'

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
})

const codeWrapper = ref<HTMLElement | null>(null)
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
      state.copyMsg = defaultMsg
    }
  }
}

watchEffect(async () => {
  if (props.code && props.language) {
    const html = await codeToHtml(props.code, {
      lang: props.language,
      theme: 'github-light',
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
          v-if="props.language"
          :name="`catppuccin:vue`"
          class="w-6 h-6 text-gray-600"
        />
        <span
          v-if="props.filename"
          class="font-semibold text-gray-700"
        >
          {{ props.filename }}
        </span>
      </div>
    </div>
    <div
      v-if="state.highlightedCode"
      ref="codeWrapper"
      class="p-4 text-md bg-gray-50 text-gray-800 overflow-x-scroll"
      v-html="state.highlightedCode"
    />
  </div>
</template>

<style>
pre {
  background: transparent !important;
}
</style>
