<script setup lang="ts">
const { data: articles } = await useAsyncData('articles', async () =>
  queryCollection('articles').order('publishedAt', 'DESC').limit(3).select('title', 'desc', 'tags', 'publishedAt', 'stem').all())
</script>

<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Latest Posts
        </h2>
        <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Stay updated with our latest insights and stories.
        </p>
      </div>
      <div
        class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 dark:border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <article
          v-for="a in articles"
          :key="a.title"
          class="flex max-w-xl flex-col items-start justify-between space-y-4"
        >
          <div class="group relative">
            <h3 class="mt-3 text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-teal-500 dark:group-hover:text-teal-300 transition-colors">
              <NuxtLink :to="a.stem">
                <span class="absolute inset-0" />
                {{ a.title }}
              </NuxtLink>
            </h3>
            <div class="flex items-center gap-x-4 text-sm text-gray-500 dark:text-gray-400">
              <time>{{ a.publishedAt }}</time>
            </div>
            <p class="mt-4 line-clamp-3 text-base text-gray-600 dark:text-gray-400">
              {{ a.desc }}
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in a.tags"
                :key="tag"
                class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-teal-100 dark:hover:bg-teal-600 transition-colors"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
