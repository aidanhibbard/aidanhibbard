<script setup lang="ts">
import type { ArticlesCollectionItem, ProjectsCollectionItem } from '@nuxt/content'

defineProps<{
  content: ArticlesCollectionItem | ProjectsCollectionItem
}>()

const formatDate = (dateString?: string | Date) => {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}
</script>

<template>
  <section class="py-4">
    <NuxtImg
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoqMQm4KuOCUn2pV2AOHEBPUxLMXzrLN7eCg&s"
      :alt="content.title"
      class="w-full h-64 object-cover rounded-lg mb-4"
    />

    <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
      {{ content.title }}
    </h1>

    <time class="block text-sm text-gray-600 dark:text-gray-400 mb-2">
      Published {{ formatDate(content.publishedAt) }}
    </time>

    <p class="text-gray-700 dark:text-gray-300 mb-4">
      {{ content.desc }}
    </p>

    <div class="flex flex-wrap gap-2">
      <span
        v-for="tag in content.tags"
        :key="tag"
        class="hover:cursor-pointer px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200
           bg-gray-200 text-gray-800 hover:bg-teal-500 hover:text-white
           dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-teal-500 dark:hover:text-white"
      >
        {{ tag }}
      </span>
    </div>
  </section>
</template>
