<script setup lang="ts">
import { motion } from 'motion-v'
</script>

<template>
  <section
    id="about"
  >
    <div class="relative md:min-h-screen flex flex-col md:flex-row items-start md:items-center justify-center md:justify-between gap-8 px-4 md:px-16 py-16 md:py-0">
      <motion.div
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.2 }"
        class="hidden md:block md:w-1/2 max-w-4xl text-center md:text-left"
      >
        <NuxtImg
          src="https://res.cloudinary.com/dlnxtpill/image/upload/v1762231414/IMG_0961_ivuxop.jpg"
          class="rounded-md"
          alt="Image of mountains"
        />
      </motion.div>

      <motion.div
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.2 }"
        class="md:w-1/2 max-w-xl text-muted-foreground text-sm md:text-base leading-relaxed"
      >
        <p class="mb-4 md:mb-5">
          <strong class="text-foreground">Passionate</strong> about exploring the world, and am often found at the top of a summit with my husky Bella.
        </p>
        <p class="mb-4 md:mb-5">
          <strong class="text-foreground">Frameworks</strong> are my playground. I love building with Vite and Nitro, shipping apps in Nuxt and Next. I write React and Vue comfortably, and reach for Rails when it accelerates product delivery. Whatever the stack, I pick modern tooling that balances DX with long-term maintainability.
        </p>
        <p>
          <strong class="text-foreground">Experience</strong> spans originating greenfield repos and joining mature codebases mid-flight. I've led first commits, shaping conventions and CI from day one. I also help teams adopt web best practices, stronger type safety, and pragmatic testing. Upgrades and migrations are part of my routine to keep systems current and secure.
        </p>
      </motion.div>
      <motion.div
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.25 }"
        class="md:hidden w-full"
      >
        <NuxtImg
          src="https://res.cloudinary.com/dlnxtpill/image/upload/v1762231414/IMG_0961_ivuxop.jpg"
          class="w-full rounded-md"
          alt="Image of mountains"
        />
      </motion.div>
    </div>
  </section>
</template>
