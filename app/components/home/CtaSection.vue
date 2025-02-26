<script setup lang="ts">
const { data: article } = await useAsyncData(
  'article',
  () => queryCollection('articles')
    .order('publishedAt', 'DESC')
    .select('title', 'desc', 'stem')
    .first(),
)
</script>

<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 lg:pt-16">
      <div class="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
          <h2 class="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
            {{ article?.title }}
          </h2>
          <p class="mt-6 text-lg/8 text-pretty text-gray-300">
            {{ article?.desc }}
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <NuxtLink
              :to="`/${article?.stem}`"
              class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >Read more</NuxtLink>
            <NuxtLink
              to="articles"
              class="text-sm/6 font-semibold text-white"
            >Browse articles <span aria-hidden="true">→</span></NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
