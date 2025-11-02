<script setup lang="ts">
import { motion } from 'motion-v'
import { Badge } from '~/shadcn/components/ui/badge'
import { formatISO } from 'date-fns'
import type { ArticlesCollectionItem } from '@nuxt/content'

defineProps<{
  post: Pick<
    ArticlesCollectionItem,
    'description' | 'date' | 'tags' | 'id' | 'stem' | 'title'
  > & {
    index?: number
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
  >
    <NuxtLink
      :to="post.stem"
      class="block space-y-4"
    >
      <div class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <time>{{ formatISO(post.date, { representation: 'date' }) }}</time>
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
    </NuxtLink>
  </motion.article>
</template>
