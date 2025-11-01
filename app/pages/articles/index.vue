<script setup lang="ts">
import { motion } from 'motion-v'

const route = useRoute()
const state = reactive({
  page: 1,
})

const formState = reactive({
  query: '',
  tags: [],
})

const { data: articles, status, error } = await useAsyncData(
  route.path,
  async () => queryCollection('articles')
    .path(route.path)
    .first(),
  {
    watch: [
      () => state.page,
      () => formState.query,
      () => formState.tags,
    ],
  },
)
</script>

<template>
  <section
    id="blog"
    class="min-h-screen py-24 px-4 md:px-16"
  >
    <ul class="container mx-auto max-w-5xl">
      <motion.li
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true }"
        :transition="{ duration: 0.6 }"
      >
        <div class="space-y-12" />
      </motion.li>
    </ul>
  </section>
</template>
