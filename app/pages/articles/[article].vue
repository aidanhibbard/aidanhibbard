<script setup lang="ts">
const route = useRoute()

const { data: article } = await useAsyncData(() => queryCollection('articles')
  .where('path', '=', route.path)
  .first(),
)

useSeoMeta({
  title: article.value?.title,
  ogTitle: article.value?.title,
  description: article.value?.desc,
  ogDescription: article.value?.desc,
  ogImage: article.value?.desc,
})
</script>

<template>
  <SharedContentArticle :content="article" />
</template>
