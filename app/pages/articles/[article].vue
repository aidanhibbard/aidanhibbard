<script setup lang="ts">
const route = useRoute()

const { data: article } = await useAsyncData(() => queryCollection('articles')
  .where('path', '=', route.path)
  .first(),
)

console.log(article.value)

useSeoMeta({
  title: article.value?.title,
  ogTitle: article.value?.title,
  description: article.value?.desc,
  ogDescription: article.value?.desc,
  ogImage: 'https://example.com/image.png',
})
</script>

<template>
  <article v-if="article">
    <ContentRenderer :value="article" />
  </article>
</template>
