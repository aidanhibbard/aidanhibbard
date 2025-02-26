<script setup lang="ts">
import { ref } from 'vue'
import { DocumentDuplicateIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  name?: string
  icon?: string
}>()

const defaultMsg = 'Copy to clipboard'

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
      state.copyMsg = defaultMsg
    }
  }
}
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
      v-if="props.name || props.icon"
      class="flex items-center justify-between p-2 border-b border-gray-300 bg-gray-100 text-gray-800 text-sm font-mono"
    >
      <div class="flex items-center gap-2 pl-2">
        <Icon
          v-if="props.icon"
          :name="`catppuccin:${props.icon}`"
          class="w-6 h-6 text-gray-600"
        />
        <span class="font-semibold text-gray-700">{{ name }}</span>
      </div>
    </div>
    <div
      ref="codeWrapper"
      class="p-4 text-md bg-gray-50 text-gray-800 overflow-x-scroll"
    >
      <slot
        mdc-unwrap="code"
      />
    </div>
  </div>
</template>
