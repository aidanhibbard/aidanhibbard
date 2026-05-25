<script setup lang="ts">
import type { Component } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import {
  Braces,
  CheckCheck,
  Package,
  Rocket,
  TestTube2,
  Zap,
} from 'lucide-vue-next'

type PipelineNode = {
  label: string
  icon: Component
}

const steps: PipelineNode[] = [
  { label: 'Commit', icon: Zap },
  { label: 'Lint', icon: CheckCheck },
  { label: 'Typecheck', icon: Braces },
  { label: 'Tests', icon: TestTube2 },
  { label: 'Build image', icon: Package },
  { label: 'Deploy', icon: Rocket },
]

type Point = {
  x: number
  y: number
}

const containerRef = ref<HTMLElement | null>(null)
const nodeRefs = ref<(HTMLElement | null)[]>([])
const edgePaths = ref<string[]>([])

const setNodeRef = (index: number, element: Element | ComponentPublicInstance | null): void => {
  nodeRefs.value[index] = element instanceof HTMLElement ? element : null
}

const getHandlePoint = (element: HTMLElement, side: 'top' | 'bottom'): Point => {
  const container = containerRef.value!.getBoundingClientRect()
  const rect = element.getBoundingClientRect()

  return {
    x: rect.left + rect.width / 2 - container.left,
    y: side === 'top' ? rect.top - container.top : rect.bottom - container.top,
  }
}

const buildVerticalEdgePath = (from: Point, to: Point): string => {
  const deltaY = to.y - from.y
  const controlOffset = Math.max(deltaY * 0.42, 14)

  return `M ${from.x} ${from.y} C ${from.x} ${from.y + controlOffset}, ${to.x} ${to.y - controlOffset}, ${to.x} ${to.y}`
}

const updateEdges = (): void => {
  const container = containerRef.value
  const nodes = nodeRefs.value

  if (!container || nodes.length !== steps.length || nodes.some(node => !node)) {
    return
  }

  const paths: string[] = []

  for (let index = 0; index < steps.length - 1; index += 1) {
    const from = getHandlePoint(nodes[index]!, 'bottom')
    const to = getHandlePoint(nodes[index + 1]!, 'top')
    paths.push(buildVerticalEdgePath(from, to))
  }

  edgePaths.value = paths
}

onMounted(() => {
  nextTick(updateEdges)
})

useResizeObserver(containerRef, () => {
  updateEdges()
})
</script>

<template>
  <div
    class="flex w-full justify-center"
    role="img"
    aria-label="CI/CD pipeline: commit, lint, typecheck, tests, build image, deploy"
  >
    <div
      ref="containerRef"
      class="relative w-full max-w-64 px-2 py-2 sm:max-w-72"
    >
      <svg
        class="pointer-events-none absolute inset-0 z-0 size-full overflow-visible text-primary/35"
        aria-hidden="true"
      >
        <path
          v-for="(path, index) in edgePaths"
          :key="`edge-${index}`"
          :d="path"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-dasharray="5 5"
          stroke-linecap="round"
        />
      </svg>

      <div class="relative z-10 flex flex-col items-center gap-8 sm:gap-10 lg:gap-12">
        <div
          v-for="(step, index) in steps"
          :key="step.label"
          :ref="(element) => setNodeRef(index, element)"
          class="relative w-full"
        >
          <span
            v-if="index > 0"
            class="absolute top-0 left-1/2 z-20 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/45 bg-background"
            aria-hidden="true"
          />
          <div
            class="relative flex items-center gap-3 rounded-lg border border-border bg-card/90 px-5 py-4 shadow-sm sm:gap-3.5 sm:px-6 sm:py-5"
          >
            <component
              :is="step.icon"
              class="size-5 shrink-0 text-primary/65 sm:size-6"
            />
            <p class="font-mono text-xs font-medium tracking-[0.06em] text-foreground whitespace-nowrap sm:text-sm">
              {{ step.label }}
            </p>
          </div>
          <span
            v-if="index < steps.length - 1"
            class="absolute bottom-0 left-1/2 z-20 size-2.5 -translate-x-1/2 translate-y-1/2 rounded-full border border-primary/45 bg-background"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>
