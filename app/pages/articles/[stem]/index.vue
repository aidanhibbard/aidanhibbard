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
  <!-- 1. add some side‑padding; don’t center until sm: -->
  <UContainer class="px-4 sm:flex sm:justify-center">
    <!-- 2. full‑width by default, sm: cap to a max width: -->
    <article class="prose py-8 w-full sm:max-w-3xl">
      <!-- 3. image: fill container on mobile, then cap it at sm: -->
      <CldImage
        src="private-npm-modules-docker_zzohul"
        alt="My Awesome Image"
        width="800"
        height="450"
        class="w-full sm:max-w-md rounded-lg"
      />

      <!-- 4. same for your rendered content -->
      <ContentRenderer
        :value="article!.meta"
        class="mt-8 w-full sm:max-w-prose mx-auto"
      />
    </article>
  </UContainer>
</template>
