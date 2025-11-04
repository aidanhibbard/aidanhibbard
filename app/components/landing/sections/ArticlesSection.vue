<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { motion } from 'motion-v'
import ArticleCard from '~/components/articles/ArticleCard.vue'

const { data: articles } = await useAsyncData(
  'articles',
  () =>
    queryCollection('articles')
      .order('date', 'DESC')
      .limit(3)
      .select(
        'date',
        'description',
        'id',
        'tags',
        'stem',
        'title',
      )
      .all(),
)
</script>

<template>
  <section
    id="articles"
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
            v-for="(post, idx) in articles"
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
            to="/articles"
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
