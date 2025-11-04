<script setup lang="ts">
import { motion } from 'motion-v'
</script>

<template>
  <motion.blockquote
    class="my-12 pl-6 border-l-4 border-primary/50 italic text-xl text-foreground/80 leading-relaxed"
    :initial="{ opacity: 0, x: -8 }"
    :while-in-view="{ opacity: 1, x: 0 }"
    :transition="{ duration: 0.35, ease: 'easeOut' }"
    :viewport="{ once: true, margin: '-10% 0px' }"
  >
    <p class="mb-4">
      <slot />
    </p>
  </motion.blockquote>
</template>
