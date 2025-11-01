<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { motion } from 'motion-v'
import ArticleCard from '~/components/articles/ArticleCard.vue'

const blogPosts = [
  {
    title: 'Building Immersive WebGL Experiences',
    date: 'January 15, 2025',
    tags: ['WebGL', 'Three.js', 'Creative Coding'],
    description:
      'Exploring the intersection of art and technology through shader programming and interactive 3D graphics.',
  },
  {
    title: 'The Art of Minimalist Design',
    date: 'December 28, 2024',
    tags: ['Design', 'UI/UX', 'Minimalism'],
    description:
      'How constraints and simplicity can lead to more powerful and memorable user experiences.',
  },
  {
    title: 'Modern Animation Techniques',
    date: 'December 10, 2024',
    tags: ['Animation', 'Framer Motion', 'React'],
    description:
      'Creating smooth, performant animations that enhance rather than distract from the user experience.',
  },
]
</script>

<template>
  <section
    id="blog"
    class="min-h-screen py-24 px-4 md:px-16"
  >
    <div class="container mx-auto max-w-5xl">
      <motion.div
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true }"
        :transition="{ duration: 0.6 }"
      >
        <h2 class="font-serif text-4xl md:text-5xl font-bold mb-4">
          Recent Writings
        </h2>
        <p class="text-muted-foreground text-lg mb-12">
          Thoughts on design, development, and creative technology
        </p>

        <div class="space-y-12">
          <ArticleCard
            v-for="(post, idx) in blogPosts"
            :key="post.title"
            :post="{ ...post, index: idx }"
          />
        </div>

        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.5, delay: 0.3 }"
          class="mt-12 flex justify-center"
        >
          <NuxtLink
            to="/blog"
            class="group inline-flex items-center gap-2 text-lg font-medium hover:text-foreground transition-colors"
          >
            View All Articles
            <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </motion.div>
      </motion.div>
    </div>
  </section>
</template>
