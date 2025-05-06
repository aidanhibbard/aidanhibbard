<script setup lang='ts'>
// import type { Toc } from '@nuxt/content'

// interface Meta {
//   body: {
//     toc: Toc
//   }
// }

const { params } = useRoute()
const { data: article } = await useAsyncData(
  'article',
  () =>
    queryCollection('articles')
    .where('stem', '=', `articles/${params.stem}`)
    .first()
)
if (!article)
  throw createError({
    statusCode: 404,
    message: 'Could not find given article'
  })
useSeoMeta({
  title: article.value!.title,
  ogTitle: article.value!.title,
  description: article.value!.description,
  ogDescription: article.value!.description,
})

// const items = computed(() =>
//   tocToItems(
//     (article.value!.meta as unknown as Meta).body.toc
//   )
// )
</script>

<template>
  <UContainer class="px-4 sm:flex sm:justify-center">
    <article class="prose py-8 w-full sm:max-w-3xl">
      <CldImage
        src="private-npm-modules-docker_zzohul"
        alt="My Awesome Image"
        width="800"
        height="450"
        class="w-full sm:max-w-md rounded-lg"
      />
      <div class="prose max-w-none">
        <!-- Published Date -->
        <div class="text-gray-700 dark:text-gray-300 text-sm md:text-base mb-4">
          <UIcon name="mdi:calendar" /> Published on 
          <time>
            {{ new Date(article!.publishedAt).toLocaleDateString() }} 
          </time>
        </div>

        <!-- Tags -->
        <div class="mt-2">
          <div class="flex flex-wrap gap-2">
            <h3 class="text-gray-800 dark:text-gray-100 text-base md:text-lg font-semibold mb-2">
              Tags
            </h3>
            <span
              v-for="t in article?.tags"
              :key="t"
              class="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-900 hover:bg-gray-100"
            >
              <NuxtLink
                :to="`/articles?tags=${t}`"
                class="inline-flex items-center space-x-1 text-sm no-underline"
              >
                <UIcon :name="`catppuccin:${t.toLowerCase()}`" class="text-xl" />
                <span>{{ t }}</span>
              </NuxtLink>
            </span>
          </div>
        </div>
      </div>

      <ContentRenderer
        :value="article!.meta"
        class="mt-8 w-full sm:max-w-prose mx-auto"
      />
    </article>
  </UContainer>
</template>
