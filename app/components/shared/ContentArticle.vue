<script setup lang="ts">
import type { ArticlesCollectionItem } from '@nuxt/content'

defineProps<{
  content?: ArticlesCollectionItem
}>()
</script>

<template>
  <article
    v-if="content"
    class="max-w-2xl mx-auto p-6"
  >
    <NuxtImg
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoqMQm4KuOCUn2pV2AOHEBPUxLMXzrLN7eCg&s"
      :alt="content.title"
      class="w-full h-64 object-cover rounded-lg mb-4"
    />

    <!-- Title -->
    <h1 class="text-3xl font-bold text-gray-900 mb-2">
      {{ content.title }}
    </h1>

    <!-- Description -->
    <p class="text-gray-700 mb-4">
      {{ content.desc }}
    </p>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2">
      <span
        v-for="tag in content.tags"
        :key="tag"
        class="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
      >
        {{ tag }}
      </span>
    </div>
    <ContentRenderer :value="content.meta" />
  </article>
</template>
