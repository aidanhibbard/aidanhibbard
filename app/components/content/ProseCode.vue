<script setup lang="ts">
const defaultMsg = 'Click to copy'

const state = reactive({
  copyMsg: defaultMsg,
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
      setTimeout(() => {
        state.copyMsg = defaultMsg
      }, 1500)
    }
  }
}
</script>

<template>
  <span
    ref="codeWrapper"
    v-tooltip="state.copyMsg"
    class="relative inline-block cursor-pointer rounded-md border border-gray-300 bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-900
            transition-all duration-300 hover:border-teal-500 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200
            dark:hover:border-teal-400 dark:hover:bg-gray-700 active:scale-95"
    @click="copyToClipboard"
  >
    <slot mdc-unwrap="code" />
  </span>
</template>
