<script setup lang="ts">
import { useSlots, computed, ref, cloneVNode } from 'vue'
import { Copy, Check } from 'lucide-vue-next'

type Pane = {
  label: string
  code?: string
  vnode: any
}

const slots = useSlots()
const rawChildren = computed(() => slots.default?.() ?? [])

const panes = computed<Pane[]>(() => {
  return rawChildren.value.map((vnode: any, idx: number) => {
    const props = vnode?.props ?? {}
    const label = props.filename || props.language || `Tab ${idx + 1}`
    return {
      label,
      code: props.code,
      vnode,
    }
  })
})

const activeIndex = ref(0)
const copied = ref(false)

async function onCopy() {
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
          @click="activeIndex = i as any"
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
        v-for="(child, i) in renderedChildren"
        :is="child"
        :key="`pane-${i}`"
      />
    </div>
  </div>
</template>


