<script setup lang="ts">
import { onMounted } from 'vue'
import { motion } from 'motion-v'
import { Badge } from '~/shadcn/components/ui/badge'
import { Separator } from '~/shadcn/components/ui/separator'
import { ArrowRight } from 'lucide-vue-next'

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

onMounted(() => {
  document.documentElement.style.scrollBehavior = 'smooth'
})
</script>

<template>
  <div class="relative">
    <!-- Landing Section -->
    <section
      id="about"
      class="min-h-screen flex items-end md:items-center justify-center md:justify-start px-4 md:px-16 pb-32 md:pb-0"
    >
      <motion.div
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.2 }"
        class="max-w-2xl text-center md:text-left"
      >
        <h2 class="font-serif text-5xl md:text-7xl font-bold mb-6 text-balance">
          Creative Developer <span class="block md:inline">& Designer</span>
        </h2>
        <p class="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
          Crafting beautiful digital experiences at the intersection of design and technology. Specializing in
          interactive web applications, shader art, and minimalist interfaces.
        </p>
      </motion.div>
    </section>

    <!-- Divider -->
    <div class="container mx-auto px-4">
      <Separator />
    </div>

    <!-- Blog Section -->
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
            <a
              href="/blog"
              class="group inline-flex items-center gap-2 text-lg font-medium hover:text-foreground transition-colors"
            >
              View All Articles
              <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>

    <!-- Divider -->
    <div class="container mx-auto px-4">
      <Separator />
    </div>

    <!-- Resume Section -->
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

    <!-- Footer -->
    <footer class="py-12 px-4 border-t border-border">
      <div class="container mx-auto text-center text-sm text-muted-foreground">
        <p>© 2025 Aidan Hibbard. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
