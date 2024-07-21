<script setup lang='ts'>
import type { ParsedContent } from '@nuxt/content';

const props = defineProps<{
  articles: ParsedContent[] | null;
}>();
</script>

<template>
  <div class="overflow-hidden px-6 sm:px-16 md:pt-10 lg:flex-col lg:gap-x-20 lg:px-24 lg:pt-0 hidden lg:block w-full">
    <h4 class="text-lg font-semibold text-gray-800">
      More to read
    </h4>
    <article
      v-for="a in props.articles"
      :key="a.title"
      class="flex max-w-xl flex-col items-start justify-between"
    >
      <NuxtLink
        :to="a._path"
        class="block h-full pb-8"
      >
        <div class="group relative">
          <h3 class="mt-3 text-2xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <span class="absolute inset-0" />
            {{ a.title }}
          </h3>
          <p class="mt-5 line-clamp-3 text-lg leading-6 text-gray-800">
            {{ a.desc }}
          </p>
        </div>
      </NuxtLink>
    </article>
  </div>
</template>
