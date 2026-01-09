<script setup lang="ts">
// import { Minus } from 'lucide-vue-next'
</script>

<template>
  <section
    id="hero"
    class="min-h-screen flex flex-col md:flex-row items-end md:items-center justify-center md:justify-between gap-8 md:gap-16 px-4 md:px-16 pb-32 md:pb-0 relative"
  >
    <LandingAnimationsHeroBackground />
    <div class="md:w-1/2 max-w-2xl text-center md:text-left">
      <h2 class="font-serif text-5xl md:text-7xl font-bold mb-6 text-balance">
        Senior Software <span class="block md:inline">Engineer</span>
      </h2>
      <p class="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
        Using technology to delight; focusing on elegant systems, thoughtful UX, and resilient architecture.
      </p>
      <!-- <div class="flex flex-row flex-wrap justify-center sm:justify-start sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
        <div class="flex items-center gap-2 whitespace-nowrap">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Available for hire
        </div>

        <Minus class="shrink-0" />

        <div class="whitespace-nowrap">
          Based in the Pacific Time Zone
        </div>
      </div> -->
    </div>

    <div class="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2">
      <NuxtLink
        to="#articles"
        class="font-mono text-xs text-foreground/80"
      >
        Scroll to explore
      </NuxtLink>
    </div>
  </section>
</template>
