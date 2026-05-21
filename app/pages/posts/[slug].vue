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

const { data: page } = await useContentPageAsyncData(
  () => `content-page:${contentPath.value}`,
  () => fetchContentPage(contentPath.value, 'Post not found'),
)

if (!page.value) {
  throw createError({
    status: 404,
    message: 'Post not found',
  })
}

useContentSeo(page)

const tocLinks = useContentPageToc(page)
</script>

<template>
  <PostsArticleShell
    v-if="page"
    :content-path="contentPath"
    :page="page"
    :toc-links="tocLinks"
  />
</template>
