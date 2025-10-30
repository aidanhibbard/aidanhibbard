<script setup lang="ts">
import { Badge } from '~/shadcn/components/ui/badge'
import { motion } from 'motion-v'
import { Separator } from '~/shadcn/components/ui/separator'
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
          <!-- Experience Item -->
          <div class="space-y-4">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h3 class="font-serif text-2xl font-semibold">
                Senior Creative Developer
              </h3>
              <span class="text-muted-foreground">2023 — Present</span>
            </div>
            <p class="text-lg text-muted-foreground">
              Digital Agency
            </p>
            <p class="leading-relaxed">
              Leading development of interactive web experiences for major brands. Specializing in WebGL
              implementations, custom animations, and performance optimization. Collaborating with designers to
              push the boundaries of web technology.
            </p>
            <div class="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">
                React
              </Badge>
              <Badge variant="secondary">
                Three.js
              </Badge>
              <Badge variant="secondary">
                GLSL
              </Badge>
              <Badge variant="secondary">
                Next.js
              </Badge>
            </div>
          </div>

          <Separator />

          <!-- Experience Item -->
          <div class="space-y-4">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h3 class="font-serif text-2xl font-semibold">
                Frontend Developer
              </h3>
              <span class="text-muted-foreground">2021 — 2023</span>
            </div>
            <p class="text-lg text-muted-foreground">
              Tech Startup
            </p>
            <p class="leading-relaxed">
              Built and maintained responsive web applications with focus on user experience and accessibility.
              Implemented design systems and component libraries. Mentored junior developers and established best
              practices.
            </p>
            <div class="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">
                TypeScript
              </Badge>
              <Badge variant="secondary">
                Vue.js
              </Badge>
              <Badge variant="secondary">
                Tailwind CSS
              </Badge>
            </div>
          </div>

          <Separator />

          <!-- Skills -->
          <div class="space-y-4 pt-8">
            <h3 class="font-serif text-2xl font-semibold">
              Skills & Technologies
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <h4 class="font-medium mb-2">
                  Frontend
                </h4>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  React, Next.js, Vue, TypeScript, HTML/CSS
                </p>
              </div>
              <div>
                <h4 class="font-medium mb-2">
                  Creative
                </h4>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  Three.js, WebGL, GLSL, Canvas API, Framer Motion
                </p>
              </div>
              <div>
                <h4 class="font-medium mb-2">
                  Tools
                </h4>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  Git, Figma, Blender, Adobe Creative Suite
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
</template>
