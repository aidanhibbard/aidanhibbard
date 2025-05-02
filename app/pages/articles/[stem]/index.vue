<script setup lang='ts'>
import type { Toc } from '@nuxt/content'

interface Meta {
  body: {
    toc: Toc
  }
}

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

const items = computed(() =>
  tocToItems(
    (article.value!.meta as unknown as Meta).body.toc
  )
)
</script>

<template>
  <UContainer class="px-4 md:px-8 lg:px-16">
    <div class="grid grid-cols-1 md:grid-cols-[220px_1fr_220px] gap-x-12 gap-y-8">
      <aside class="sticky self-start">
        <UTree
          vertical
          color="neutral"
          :items
          class="overflow-auto pr-2 mt-8"
        />
      </aside>
      <article class="prose max-w-none prose-lg">
        <ContentRenderer :value="article!.meta" />
      </article>
      <aside class="sticky self-start">
        <div class="overflow-auto pl-2"/>
      </aside>
    </div>
  </UContainer>
</template>

