<script setup lang="ts">
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
      theme: 'github-dark-dimmed',
    })
    state.highlightedCode = html
  }
})
</script>

<template>
  <div
    class="mx-auto w-full rounded-lg border border-gray-300 dark:border-gray-600 flex flex-col overflow-hidden relative my-4"
  >
    <button
      class="hover:text-gray-600 absolute top-2 right-2"
      @click="copyToClipboard"
    />
    <div
      v-if="props.filename || props.language"
      class="flex items-center justify-between p-2 border-b border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#0c0e14] text-gray-800 dark:text-[#F3F4ED] text-sm font-mono"
    >
      <div class="flex items-center gap-2 pl-2">
        <UIcon
          name="mdi:ab-testing"
        />
        <div
          v-if="props.filename"
          v-tooltip="state.copyMsg"
          class="font-semibold hover:cursor-pointer text-gray-900 dark:text-[#eeeeee] hover:text-teal-500 transition-colors duration-300"
        >
          {{ props.filename }}
        </div>
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
