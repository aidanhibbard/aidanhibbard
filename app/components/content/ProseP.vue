<script setup lang="ts">
import { motion } from 'motion-v'
</script>

<template>
  <motion.p
    class="text-lg leading-relaxed text-foreground/90 mb-6"
    :initial="{ opacity: 0, y: 8 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.35, ease: 'easeOut' }"
    :viewport="{ once: true, margin: '-10% 0px' }"
  >
    <slot />
  </motion.p>
</template>
