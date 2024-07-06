<script setup lang='ts'>
import highlightJS from 'highlight.js';

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!page.value) { throw createError({ statusCode: 404, statusMessage: 'Page not found' }) }

useSeoMeta({
  title: `${page.value.title}`,
  ogTitle: `${page.value.title}`,
  description: page.value.description,
  ogDescription: page.value.description
})

onMounted(() => {
  highlightJS.highlightAll();
})
</script>

<template>
  <div>
    <ArticleHero :page="page!" />
    <div class="sm:flex-col md:flex-col lg:flex-row flex justify-center gap-x-8 sm:px-6 lg:px-8 py-12">
      <AppToc :links="page?.body?.toc?.links!" />
      <ContentDoc
        :path="$route.path"
        class="w-full max-w-4xl"
      >
        <template #found>
          <article class="prose lg:prose-xl mx-auto">
            <ContentRenderer />
          </article>
        </template>
        <template #not-found>
          <article class="text-center text-xl text-gray-500">
            Not found
          </article>
        </template>
      </ContentDoc>
    </div>
  </div>
</template>

<style scoped>
.code {
  border-radius: 8px;
}
</style>
