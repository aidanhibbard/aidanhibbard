<script setup lang="ts">
const route = useRoute()

const slug = computed((): string => {
  const param = route.params.slug

  if (typeof param === 'string') {
    return param
  }

  return param?.[0] ?? ''
})

const contentPath = computed(() => `/posts/${slug.value}`)
</script>

<template>
  <PostsArticleShell :content-path="contentPath" />
</template>
