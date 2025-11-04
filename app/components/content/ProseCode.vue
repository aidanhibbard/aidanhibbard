<script setup lang="ts">
import { toast } from 'vue-sonner'

const codeEl = ref<HTMLElement | null>(null)

const copyInline = async () => {
  const text = codeEl.value?.innerText?.trim() ?? ''
  if (!text)
    return
  try {
    await navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }
  catch {
    toast.error('Copy failed')
  }
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    copyInline()
  }
}
</script>

<template>
  <code
    ref="codeEl"
    class="border p-0.5 rounded hover:border-teal-500"
    role="button"
    tabindex="0"
    aria-label="Copy code"
    title="Copy code"
    @click="copyInline"
    @keydown="onKeydown"
  >
    <slot />
  </code>
</template>
