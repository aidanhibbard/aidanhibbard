<script setup lang="ts">
import { motion } from 'motion-v'
</script>

<template>
  <motion.ul
    class="space-y-3 text-lg text-foreground/90 mb-6 list-disc list-inside"
    :initial="{ opacity: 0 }"
    :while-in-view="{ opacity: 1 }"
    :transition="{ duration: 0.3 }"
    :viewport="{ once: true, margin: '-10% 0px' }"
  >
    <slot />
  </motion.ul>
</template>
