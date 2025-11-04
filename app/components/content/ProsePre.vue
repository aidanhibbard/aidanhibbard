<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Copy, Check } from 'lucide-vue-next'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})

const hasHeader = computed(() => Boolean(props.filename))
const copied = ref(false)
const preEl = ref<HTMLElement | null>(null)

async function onCopy() {
  const text = props.code && props.code.trim().length > 0
    ? props.code
    : (preEl.value?.innerText ?? '')
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1500)
  }
  catch (err) {
    void err
  }
}

onMounted(() => {
  // no-op; ensures preEl is bound for fallback copy
})
</script>

<template>
  <div class="relative rounded-lg border border-border bg-background overflow-hidden">
    <div
      v-if="hasHeader"
      class="flex items-center justify-between bg-muted/60 px-3 py-2 border-b border-border"
    >
      <div class="text-xs font-medium text-foreground/80 truncate">
        {{ props.filename }}
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-border hover:bg-muted transition-colors"
        @click="onCopy"
      >
        <component
          :is="copied ? Check : Copy"
          class="w-3.5 h-3.5"
        />
        <span>{{ copied ? 'Copied' : 'Copy' }}</span>
      </button>
    </div>

    <div class="relative">
      <button
        v-if="!hasHeader"
        type="button"
        class="absolute right-2 top-2 z-10 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-border bg-background/70 backdrop-blur hover:bg-muted transition-colors"
        @click="onCopy"
      >
        <component
          :is="copied ? Check : Copy"
          class="w-3.5 h-3.5"
        />
        <span class="sr-only">Copy</span>
      </button>

      <pre
        ref="preEl"
        :class="$props.class"
      >
        <slot />
      </pre>
    </div>
  </div>
</template>

<style>
pre code .line {
  display: block;
}
</style>
