<script setup lang="ts">
import { motion } from 'motion-v'
</script>

<template>
  <motion.li
    class="leading-relaxed"
    :initial="{ opacity: 0, y: 6 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.3, ease: 'easeOut' }"
    :viewport="{ once: true, margin: '-10% 0px' }"
  >
    <slot />
  </motion.li>
</template>
