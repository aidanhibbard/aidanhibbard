<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'
import { motion } from 'motion-v'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h6)))
</script>

<template>
  <motion.h6
    :id="props.id"
    class="text-base font-semibold mt-6 mb-3 tracking-tight"
    :initial="{ opacity: 0, y: 12 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.4, ease: 'easeOut' }"
    :viewport="{ once: true, margin: '-10% 0px' }"
  >
    <NuxtLink
      v-if="props.id && generate"
      :to="`#${props.id}`"
    >
      <slot />
    </NuxtLink>
    <slot v-else />
  </motion.h6>
</template>
