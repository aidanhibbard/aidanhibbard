<script setup lang="ts">
import {
  ArrowRight,
} from 'lucide-vue-next'
</script>

<template>
  <section
    id="projects"
    class="py-24 px-4 md:px-16"
  >
    <div class="container mx-auto max-w-5xl">
      <div>
        <h2 class="font-serif text-4xl md:text-5xl font-bold mb-4">
          Side Projects
        </h2>
        <p class="text-muted-foreground text-lg mb-12">
          How many is to many?
        </p>

        <div class="space-y-12" />

        <div
          class="mt-12 flex justify-center"
        >
          <NuxtLink
            to="/projects"
            class="group inline-flex items-center gap-2 text-lg font-medium hover:text-foreground transition-colors"
          >
            View All Projects
            <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
