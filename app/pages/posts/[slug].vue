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

const { page, tocLinks } = useContentPageQuery(contentPath, {
  notFoundMessage: 'Post not found',
})
</script>

<template>
  <PostsArticleShell
    v-if="page"
    :content-path="contentPath"
    :page="page"
    :toc-links="tocLinks"
  />
</template>
