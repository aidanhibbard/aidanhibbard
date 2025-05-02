<script setup lang='ts'>
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
</script>

<template>
  <UContainer class="px-4 md:px-8 lg:px-16">
    <div class="grid grid-cols-1 md:grid-cols-[220px_1fr_220px] gap-x-12 gap-y-8">
      
      <!-- Left TOC: sticky at 1rem from top -->
      <aside class="sticky top-4 self-start">
        <UTree
          vertical
          color="neutral"
          :items="tocToItems(article!.meta.body?.toc)"
          class="h-[calc(100vh-1rem)] overflow-auto pr-2"
        />
      </aside>
      
      <!-- Main article: full‑width prose -->
      <article class="prose max-w-none prose-lg">
        <ContentRenderer :value="article!.meta" />
      </article>

      <!-- Right sidebar: sticky too -->
      <aside class="sticky top-4 self-start">
        <div class="h-[calc(100vh-1rem)] overflow-auto pl-2">
          <!-- your right‑hand content -->
        </div>
      </aside>

    </div>
  </UContainer>
</template>

