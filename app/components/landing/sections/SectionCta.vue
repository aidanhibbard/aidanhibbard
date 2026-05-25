<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import {
  landingSectionCtaArrowClass,
  landingSectionCtaLinkClass,
  landingSectionCtaPlacementClass,
  landingSectionCtaRowClass,
} from '@/utils/landing-section-styles'

defineProps<{
  to: string
  label: string
}>()
</script>

<template>
  <div :class="landingSectionCtaRowClass">
    <NuxtLink
      :to="to"
      :class="[landingSectionCtaLinkClass, landingSectionCtaPlacementClass]"
    >
      <span>{{ label }}</span>
      <ArrowRight :class="landingSectionCtaArrowClass" />
    </NuxtLink>
  </div>
</template>
