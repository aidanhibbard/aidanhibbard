<script setup lang="ts">
import { motion } from 'motion-v'
import { ArrowRight } from 'lucide-vue-next'

const { landingItems } = useResume()
</script>

<template>
  <section
    id="resume"
    class="py-24 px-4 md:px-16"
  >
    <div class="container mx-auto max-w-4xl">
      <h2 class="font-serif text-4xl md:text-5xl font-bold mb-12">
        Experience
      </h2>

      <div class="space-y-12">
        <ul class="flex flex-col gap-y-8">
          <motion.li
            v-for="(item, idx) in landingItems"
            :key="item.company"
            :initial="{ opacity: 0, y: 20 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.5, delay: idx * 0.1 }"
          >
            <ResumeExpCard
              :item
            />
          </motion.li>
        </ul>

        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.5, delay: 0.3 }"
          class="mt-12 flex justify-center"
        >
          <NuxtLink
            to="/resume"
            class="group inline-flex items-center gap-2 text-lg font-medium hover:text-foreground transition-colors"
          >
            View my full experience
            <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </motion.div>
      </div>
    </div>
  </section>
</template>
