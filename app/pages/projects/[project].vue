<script setup lang="ts">
const route = useRoute()

const { data: project } = await useAsyncData(() => queryCollection('projects')
  .where('path', '=', route.path)
  .first(),
)

useSeoMeta({
  title: project.value?.title,
  ogTitle: project.value?.title,
  description: project.value?.desc,
  ogDescription: project.value?.desc,
  ogImage: project.value?.desc,
})
</script>

<template>
  <SharedContentArticle :content="project" />
</template>
