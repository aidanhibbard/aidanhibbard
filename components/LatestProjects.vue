<script setup lang='ts'>
const { data } = await useAsyncData(
  'projects',
  () => queryContent('projects')
    .sort({ publishedAt: -1 })
    .find()
)
</script>

<template>
  <div class="sm:mt-0 md:mt-2">
    <div class="pt-8 pb-16">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What I'm working on
          </h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">
            <NuxtLink to="/projects">
              Browse all projects <span aria-hidden="true">→</span>
            </NuxtLink>
          </p>
        </div>
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 pt-4 sm:mt-4 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article
            v-for="p in data"
            :key="p.title"
            class="flex max-w-xl flex-col items-start justify-between"
          >
            <div class="flex items-center gap-x-4 text-xs">
              <span class="text-gray-500">Started <time datetime="2020-03-16">Mar 16, 2020</time></span>
              <NuxtLink
                v-for="t in p.tags.slice(0, 2)"
                :key="t"
                :to="`/projects?tag=${t.toLowerCase()}`"
                class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
              >
                {{ t }}
              </NuxtLink>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a href="#">
                  <span class="absolute inset-0" />
                  {{ p.title }}
                </a>
              </h3>
              <p class="mt-5 line-clamp-3 text-md leading-6 text-gray-600">
                {{ p.desc }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>