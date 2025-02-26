<script setup lang="ts">
import { ref } from 'vue'
import { DocumentDuplicateIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  name?: string
  type?: string
}>()

const defaultMsg = 'Copy to clipboard'

const state = reactive({
  copyMsg: defaultMsg,
})

const codeRef = ref<HTMLElement | null>(null)
const copyToClipboard = async () => {
  if (codeRef.value) {
    try {
      await navigator.clipboard.writeText(codeRef.value.innerText)
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
const fileName = computed(() => (props.type ? `${props.name}.${props.type}` : props.name))
</script>

<template>
  <div
    class="mx-auto w-full rounded-lg border border-gray-300 flex flex-col overflow-hidden bg-white relative"
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
      v-if="props.name && props.type"
      class="flex items-center justify-between p-2 border-b border-gray-300 bg-gray-100 text-gray-800 text-sm font-mono"
    >
      <div class="flex items-center gap-2 pl-2">
        <Icon
          v-if="props.type"
          :name="`catppuccin:${props.type}`"
          class="w-6 h-6 text-gray-600"
        />
        <span class="font-semibold text-gray-700">{{ fileName }}</span>
      </div>
    </div>
    <div
      class="p-4 text-md bg-gray-50 text-gray-800 overflow-x-scroll"
    >
      <slot
        ref="codeRef"
        mdc-unwrap="code"
      />
    </div>
  </div>
</template>
