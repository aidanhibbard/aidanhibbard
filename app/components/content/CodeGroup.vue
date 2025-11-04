<script setup lang="ts">
import { useSlots, computed, ref, cloneVNode, type VNode } from 'vue'
import { Copy, Check } from 'lucide-vue-next'

type Pane = {
  label: string
  code?: string
  vnode: VNode
}

const slots = useSlots()
const rawChildren = computed<VNode[]>(() => (slots.default?.() ?? []) as VNode[])

const panes = computed<Pane[]>(() => {
  return rawChildren.value.map((vnode: VNode, idx: number) => {
    const props = (vnode?.props ?? {}) as Record<string, unknown>
    const filename = typeof props['filename'] === 'string' ? (props['filename'] as string) : undefined
    const language = typeof props['language'] === 'string' ? (props['language'] as string) : undefined
    const code = typeof props['code'] === 'string' ? (props['code'] as string) : undefined
    const label = filename ?? language ?? `Tab ${idx + 1}`
    return {
      label,
      code,
      vnode,
    }
  })
})

const activeIndex = ref(0)
const copied = ref(false)

const onCopy = async () => {
  const text = panes.value[activeIndex.value]?.code ?? ''
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

const renderedChildren = computed(() => {
  return panes.value.map((pane, i) => cloneVNode(pane.vnode, {
    style: i === activeIndex.value ? '' : 'display:none',
    key: `code-pane-${i}`,
  }))
})
</script>

<template>
  <div class="relative rounded-lg border border-border overflow-hidden">
    <div class="flex items-center justify-between bg-muted/60 px-3 py-2 border-b border-border">
      <div class="flex items-center gap-1 overflow-x-auto">
        <button
          v-for="(pane, i) in panes"
          :key="`tab-${i}-${pane.label}`"
          type="button"
          class="px-2 py-1 text-xs rounded-md border transition-colors"
          :class="i === activeIndex ? 'bg-background border-border text-foreground' : 'bg-transparent border-transparent text-foreground/70 hover:bg-muted'"
          @click="activeIndex = i"
        >
          {{ pane.label }}
        </button>
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

    <div>
      <component
        :is="child"
        v-for="(child, i) in renderedChildren"
        :key="`pane-${i}`"
      />
    </div>
  </div>
</template>
