<script setup lang="ts">
import type { ArticlesCollectionItem } from '@nuxt/content'

defineProps<{
  content?: ArticlesCollectionItem
}>()

const commentsContainer = ref<HTMLDivElement | null>(null)

const formatDate = (dateString?: string | Date) => {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

onMounted(() => {
  // Only add Utterances if we're on an article page
  const script = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.setAttribute('repo', 'aidanhibbard/aidanhibbard')
  script.setAttribute('issue-term', 'og:title')
  script.setAttribute('theme', 'github-light')
  script.setAttribute('crossorigin', 'anonymous')
  script.setAttribute('async', 'true')
  commentsContainer.value?.appendChild(script)
})
</script>

<template>
  <article
    v-if="content"
    class="max-w-2xl mx-auto p-6"
  >
    <section class="py-4">
      <NuxtImg
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoqMQm4KuOCUn2pV2AOHEBPUxLMXzrLN7eCg&s"
        :alt="content.title"
        class="w-full h-64 object-cover rounded-lg mb-4"
      />

      <!-- Title -->
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        {{ content.title }}
      </h1>

      <!-- Published At -->
      <time class="block mb-2 text-sm font-normal leading-none">Published {{ formatDate(content.publishedAt) }}</time>

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
    </section>
    <ContentRenderer
      class="my-4"
      :value="content.meta"
    />

    <div
      ref="commentsContainer"
      class="mt-8"
    />
  </article>
</template>
