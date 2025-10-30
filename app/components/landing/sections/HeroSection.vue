<script setup lang="ts">
import { motion } from 'motion-v'
</script>

<template>
  <section
    id="about"
    class="min-h-screen flex items-end md:items-center justify-center md:justify-start px-4 md:px-16 pb-32 md:pb-0"
  >
    <motion.div
      :initial="{ opacity: 0, y: 30 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, delay: 0.2 }"
      class="max-w-2xl text-center md:text-left"
    >
      <h2 class="font-serif text-5xl md:text-7xl font-bold mb-6 text-balance">
        Creative Developer <span class="block md:inline">& Designer</span>
      </h2>
      <p class="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
        Crafting beautiful digital experiences at the intersection of design and technology. Specializing in
        interactive web applications, shader art, and minimalist interfaces.
      </p>
    </motion.div>
  </section>
</template>
