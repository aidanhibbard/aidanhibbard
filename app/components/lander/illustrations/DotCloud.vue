<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  fadeCy?: string
  fadeR?: string
}>(), {
  fadeCy: '50%',
  fadeR: '58%',
})

const id = useId().replace(/:/g, '')
const patternId = `dot-cloud-pattern-${id}`
const gradientId = `dot-cloud-fade-${id}`
const maskId = `dot-cloud-mask-${id}`
</script>

<template>
  <svg
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 size-full text-muted-foreground/45"
    preserveAspectRatio="none"
    :class="cn(props.class)"
  >
    <defs>
      <pattern
        :id="patternId"
        width="12"
        height="12"
        patternUnits="userSpaceOnUse"
      >
        <circle
          cx="6"
          cy="6"
          r="1"
          fill="currentColor"
        />
      </pattern>
      <radialGradient
        :id="gradientId"
        cx="50%"
        :cy="fadeCy"
        :r="fadeR"
      >
        <stop
          offset="0%"
          stop-color="white"
          stop-opacity="1"
        />
        <stop
          offset="60%"
          stop-color="white"
          stop-opacity="0.65"
        />
        <stop
          offset="100%"
          stop-color="white"
          stop-opacity="0"
        />
      </radialGradient>
      <mask :id="maskId">
        <rect
          width="100%"
          height="100%"
          :fill="`url(#${gradientId})`"
        />
      </mask>
    </defs>
    <rect
      width="100%"
      height="100%"
      :fill="`url(#${patternId})`"
      :mask="`url(#${maskId})`"
    />
  </svg>
</template>
