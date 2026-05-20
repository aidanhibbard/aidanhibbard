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

const { page, tocLinks } = await useContentPageQuery(contentPath, {
  notFoundMessage: 'Post not found',
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found',
  })
}

const resolvedPage = page.value
</script>

<template>
  <PostsArticleShell
    :content-path="contentPath"
    :page="resolvedPage"
    :toc-links="tocLinks"
  />
</template>
