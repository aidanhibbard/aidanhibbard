<script setup lang="ts">
import { formatDate } from '#imports'

const props = defineProps<{
  type: 'articles' | 'projects'
  title: string
  description: string
}>()

const { data } = await useAsyncData(props.type, async () =>
  queryCollection(props.type).order('publishedAt', 'DESC').limit(3).select('title', 'desc', 'tags', 'publishedAt', 'stem').all())
</script>

<template>
  <div class="sm:pt-12 sm:pb-8 md:pt-24 md:pb-16">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          {{ props.title }}
        </h2>
        <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">
          {{ props.description }}
        </p>
      </div>
      <div
        class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 dark:border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <article
          v-for="c in data"
          :key="c.title"
          class="flex flex-col max-w-xl h-full space-y-4"
        >
          <div class="group relative flex flex-col flex-grow">
            <h3 class="mt-3 text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-teal-500 dark:group-hover:text-teal-300 transition-colors">
              <NuxtLink :to="c.stem">
                <span class="absolute inset-0" />
                {{ c.title }}
              </NuxtLink>
            </h3>
            <div class="flex items-center gap-x-4 text-sm text-gray-500 dark:text-gray-400">
              {{ props.type === 'articles' ? 'Published' : 'Started' }} on <time>{{ formatDate(c.publishedAt) }}</time>
            </div>

            <!-- This div ensures description and tags stay at the bottom -->
            <div class="mt-auto">
              <p class="mb-4 line-clamp-3 text-base text-gray-600 dark:text-gray-400">
                {{ c.desc }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in c.tags"
                  :key="tag"
                  class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-teal-100 dark:hover:bg-teal-600 transition-colors"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
