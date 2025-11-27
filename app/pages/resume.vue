<script setup lang="ts">
import { motion } from 'motion-v'
import { Separator } from '~/components/shadcn/ui/separator'

const { experience } = useResume()
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

        <Separator />

        <!-- Skills -->
        <div class="space-y-4 pt-8">
          <h3 class="font-serif text-2xl font-semibold">
            Skills & Technologies
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <h4 class="font-medium mb-2">
                Frontend
              </h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                React, Next, Vue, Nuxt, Vite, Astro, Angular, Svelte, Webpack
              </p>
            </div>
            <div>
              <h4 class="font-medium mb-2">
                Backend
              </h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Rails, Node, Laravel, Flask, Django
              </p>
            </div>
            <div>
              <h4 class="font-medium mb-2">
                Hosting
              </h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Google Cloud, Kubernetes, Digital Ocean, Railway, AWS, Vercel, Heroku
              </p>
            </div>
            <div>
              <h4 class="font-medium mb-2">
                Creative
              </h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Three, WebGL, GLSL, Canvas, Motion, Tailwind
              </p>
            </div>
            <div>
              <h4 class="font-medium mb-2">
                Tools
              </h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Figma, Canva, Illustrator
              </p>
            </div>
          </div>
        </div>

        <Separator class="my-12" />

        <div class="space-y-12">
          <ResumeExpCard
            v-for="item in experience"
            :key="item.company"
            :item
          />
        </div>
      </motion.div>
    </div>
  </section>
</template>
