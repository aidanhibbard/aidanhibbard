<script setup lang="ts">
import { Minus } from 'lucide-vue-next'
import { motion } from 'motion-v'
</script>

<template>
  <section
    id="hero"
    class="min-h-screen flex flex-col md:flex-row items-end md:items-center justify-center md:justify-between gap-8 md:gap-16 px-4 md:px-16 pb-32 md:pb-0 relative"
  >
    <motion.div
      :initial="{ opacity: 0, y: 30 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, delay: 0.2 }"
      class="md:w-1/2 max-w-2xl text-center md:text-left"
    >
      <h2 class="font-serif text-5xl md:text-7xl font-bold mb-6 text-balance">
        Creative Developer <span class="block md:inline">& Engineer</span>
      </h2>
      <p class="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
        Using technology to delight; focusing on elegant systems, thoughtful UX, and resilient architecture.
      </p>
      <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Available for hire
        </div>
        <Minus />
        <div>Based in the Pacific Time Zone</div>
      </div>
    </motion.div>

    <div class="w-1/2">
      <LandingAnimationsConnectorAnimation />
    </div>

    <div class="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2">
      <NuxtLink
        to="#about"
        class="font-mono text-xs text-foreground/80"
      >
        Scroll to explore
      </NuxtLink>
    </div>
  </section>
</template>
