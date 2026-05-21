<script setup lang="ts">
import { Copy } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

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
const preEl = ref<HTMLElement | null>(null)

const onCopy = async () => {
  const text = preEl.value?.innerText?.trim() ?? ''
  if (!text)
    return
  try {
    await navigator.clipboard.writeText(text)
    toast.success('Link copied')
  }
  catch {
    toast.error('Copy failed')
  }
}
</script>

<template>
  <div class="relative rounded-lg border border-border bg-background overflow-hidden mb-8 not-prose">
    <div
      v-if="hasHeader"
      class="flex items-center justify-between gap-4 border-b border-border bg-muted/60 px-4 py-2"
    >
      <div class="flex min-w-0 flex-row items-center gap-2.5">
        <Icon
          v-if="props.language"
          :name="'catppuccin:' + props.language"
          size="20"
          class="size-5 shrink-0"
        />
        <div class="truncate font-mono text-[13px] font-medium leading-none text-foreground/85">
          {{ props.filename }}
        </div>
      </div>
      <button
        type="button"
        class="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-2 py-1.5 text-xs transition-colors hover:bg-muted"
        @click="onCopy"
      >
        <component
          :is="Copy"
          class="size-3.5"
        />
        <span>Copy</span>
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
          :is="Copy"
          class="w-3.5 h-3.5"
        />
        <span class="sr-only">Copy</span>
      </button>

      <!-- Indentation has to be like this or things render weird -->
      <!-- Touch At Your Own Risk -->
      <pre
        ref="preEl"
        :class="[$props.class, 'overflow-x-auto', 'p-2']"
        v-bind="$attrs"
      >
<slot /></pre>
    </div>
  </div>
</template>

<style>
pre code .line {
  display: block;
}
</style>
