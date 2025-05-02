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

const items = computed(() => {
  const toc = article.value!.meta.body.toc
  // Only top‑level (depth ≤ toc.depth) for simplicity; you can nest further if needed.
  return toc.links
    .filter(link => link.depth <= toc.depth)
    .map(link => ({
      label: link.text,
      value: link.id,              // so we know which heading to scroll to
      // defaultExpanded: link.depth < toc.searchDepth  // optionally expand up to a certain level
    }))
})
</script>

<template>
  <UContainer>
    <UTree :items />
  </UContainer>
</template>
