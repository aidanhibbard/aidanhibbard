<script setup lang='ts'>
import type { ParsedContent } from '@nuxt/content';

defineProps<{
  article: ParsedContent;
}>();
</script>

<template>
  <div class="overflow-hidden px-6 sm:px-16 sm:pt-0 lg:flex lg:gap-x-20 lg:px-24 lg:pt-24 w-full">
    <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:text-left">
      <h3 class="text-lg font-semibold text-gray-700">
        Latest Article
      </h3>
      <NuxtLink :to="article._path">
        <h2 class="font-bold tracking-tight text-gray-900 text-4xl">
          {{ article.title }}
        </h2>
      </NuxtLink>
      <p class="mt-6 leading-8 text-gray-800 sm:text-xl">
        {{ article.desc }}
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
        <NuxtLink
          :to="article._path"
          class="px-5 py-2.5 text-xl font-semibold text-white bg-gray-900 shadow-sm rounded hover:shadow-xl delay-75"
        >
          Read
        </NuxtLink>
        <NuxtLink
          to="/articles"
          class="text-lg font-semibold leading-6 text-gray-900"
        >
          Browse articles <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
