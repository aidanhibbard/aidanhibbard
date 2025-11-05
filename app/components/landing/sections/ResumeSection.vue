<script setup lang="ts">
import { motion } from 'motion-v'
import { ArrowRight } from 'lucide-vue-next'

const { landingItems } = useResume()
</script>

<template>
  <section
    id="resume"
    class="min-h-screen py-24 px-4 md:px-16"
  >
    <div class="container mx-auto max-w-4xl">
      <motion.div
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true }"
        :transition="{ duration: 0.6 }"
      >
        <h2 class="font-serif text-4xl md:text-5xl font-bold mb-12">
          Experience
        </h2>

        <div class="space-y-12">
          <ResumeExpCard
            v-for="item in landingItems"
            :key="item.company"
            :item
          />

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
              View my full expierence
              <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
</template>
