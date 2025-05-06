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
      <div class="prose max-w-none w-full sm:max-w-prose mx-auto">
        <!-- Published Date -->
        <div class="text-gray-700 dark:text-white text-sm md:text-base mb-4">
          <UIcon name="mdi:calendar" /> Published on 
          <time>
            {{ new Date(article!.publishedAt).toLocaleDateString() }} 
          </time>
        </div>

        <!-- Tags -->
        <div class="mt-2 w-full sm:max-w-prose mx-auto">
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="(t, i) in article?.tags"
              :key="t"
              :to="`/articles?tags=${t}`"
              class="inline-flex items-center space-x-1 text-sm no-underline dark:text-white"
            >
              <UIcon :name="`catppuccin:${t.toLowerCase()}`" size="24" />
              <span>{{ t }}{{ i === article!.tags.length - 1 ? '' : ',' }}</span>
            </NuxtLink>
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
