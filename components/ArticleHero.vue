<script setup lang='ts'>
import type { ParsedContent } from '@nuxt/content';

defineProps<{
  page: ParsedContent;
}>();

function formatDate(dateString: string): string {
  // 06-17-24
  const [month, day, year] = dateString.split('-');
  const date = new Date(`20${year}-${month}-${day}`);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formattedDate;
}
</script>

<template>
  <div class="sm:mt-0 md:mt-0 lg:mt-14">
    <div class="mx-auto max-w-7xl py-18 sm:px-6 sm:py-1">
      <div class="relative isolate overflow-hidden px-6 pt-8 sm:px-16 md:pt-10 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-8 lg:text-left">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {{ page.title }}
          </h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            {{ page.desc }}
          </p>
          <p class="mt-4 text-sm leading-4 text-gray-600">
            Published {{ formatDate(page.publishedAt) }}
          </p>
          <p class="text-sm leading-4 text-gray-600">
            Last edited {{ formatDate(page.lastEditedAt) }}
          </p>
          <div class="flex justify-between mt-4 mx-auto">
            <NuxtLink
              v-for="t in (page.tags as string).split(',')"
              :key="t"
              :to="`/articles?tag=${t}`"
              class="block px-1 py-1 rounded-md bg-gray-300 text-gray-900 text-sm"
            >
              {{ t }}
            </NuxtLink>
          </div>
        </div>
        <div class="relative h-80 mt-8">
          <img
            class="absolute left-0 top-0 w-[57rem] max-w-none"
            :src="page.img"
            alt="App screenshot"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>