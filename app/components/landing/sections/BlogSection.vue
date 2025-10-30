<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { motion } from 'motion-v'

type BlogPost = {
  title: string
  date: string
  tags: string[]
  description: string
}

const blogPosts: BlogPost[] = [
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
          Recent Writing
        </h2>
        <p class="text-muted-foreground text-lg mb-12">
          Thoughts on design, development, and creative technology
        </p>

        <div class="space-y-12">
          <motion.article
            v-for="(post, index) in blogPosts"
            :key="post.title"
            :initial="{ opacity: 0, y: 20 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.5, delay: index * 0.1 }"
            class="space-y-3"
          >
            <div class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <time>{{ post.date }}</time>
              <span class="hidden md:inline">•</span>
              <div class="flex flex-wrap gap-2">
                <Badge
                  v-for="tag in post.tags"
                  :key="tag"
                  variant="outline"
                  class="text-xs"
                >
                  {{ tag }}
                </Badge>
              </div>
            </div>
            <h3 class="font-serif text-2xl md:text-3xl font-semibold">
              {{ post.title }}
            </h3>
            <p class="text-muted-foreground leading-relaxed">
              {{ post.description }}
            </p>
          </motion.article>
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
