<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import {
  landingSectionShellBaseClass,
  landingSectionShellVariantClasses,
} from '@/utils/landing-section-styles'

type LandingSectionShellVariant = keyof typeof landingSectionShellVariantClasses

const props = defineProps<{
  label: string
  variant: LandingSectionShellVariant
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <section
    :class="cn(
      landingSectionShellBaseClass,
      landingSectionShellVariantClasses[props.variant],
      props.class,
    )"
    :aria-label="props.label"
  >
    <slot />
  </section>
</template>
