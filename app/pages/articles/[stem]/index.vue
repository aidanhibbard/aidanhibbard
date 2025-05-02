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
  <div>
    <div>
      <UTree vertical color="neutral" :items="tocToItems(article!.meta.body?.toc)" />
    </div>
    <UContainer>
      <ContentRenderer :value="article!.meta" />
    </UContainer>
  </div>
</template>
