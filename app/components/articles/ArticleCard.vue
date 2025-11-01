<script setup lang="ts">
import { motion } from 'motion-v'
import { Badge } from '~/shadcn/components/ui/badge'

defineProps<{
  post: {
    title: string
    index?: number
    date: string
    tags: string[]
    description: string
  }
}>()
</script>

<template>
  <motion.article
    :key="post.title"
    :initial="{ opacity: 0, y: 20 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :viewport="{ once: true }"
    :transition="{ duration: 0.5, delay: post.index ? post.index * 0.1 : undefined }"
    class="space-y-4"
  >
    <div class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
      <time>{{ post.date }}</time>
      <span class="hidden md:inline">•</span>
      <div class="flex flex-wrap gap-2">
        <Badge
          v-for="tag in post.tags"
          :key="tag"
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
</template>
