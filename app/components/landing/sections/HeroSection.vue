<script setup lang="ts">
import { Minus } from 'lucide-vue-next'
import { motion } from 'motion-v'
</script>

<template>
  <section
    id="about"
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

    <div class="md:w-1/2 max-w-xl text-muted-foreground text-sm md:text-base leading-relaxed">
      <p class="mb-4 md:mb-5">
        <strong class="text-foreground">Scaling</strong> distributed systems is a core part of my work. I've designed and built microservices architectures with container orchestrators and Kubernetes. I deliver reliable background processing pipelines and event-driven workflows. My approach emphasizes sound systems design, observability, and graceful failure modes.
      </p>
      <p class="mb-4 md:mb-5">
        <strong class="text-foreground">Frameworks</strong> are my playground. I love building with Vite and Nitro, shipping apps in Nuxt and Next. I write React and Vue comfortably, and reach for Rails when it accelerates product delivery. Whatever the stack, I pick modern tooling that balances DX with long-term maintainability.
      </p>
      <p>
        <strong class="text-foreground">Experience</strong> spans originating greenfield repos and joining mature codebases mid-flight. I've led first commits, shaping conventions and CI from day one. I also help teams adopt web best practices, stronger type safety, and pragmatic testing. Upgrades and migrations are part of my routine to keep systems current and secure.
      </p>
    </div>

    <div class="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2">
      <NuxtLink
        to="#blog"
        class="font-mono text-xs text-foreground/80"
      >
        Scroll to explore
      </NuxtLink>
    </div>
  </section>
</template>
