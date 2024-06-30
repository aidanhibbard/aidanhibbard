<script setup lang='ts'>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

if (!page.value) { throw createError({ statusCode: 404, statusMessage: 'Page not found' }) }

useSeoMeta({
  title: `${page.value.title}`,
  ogTitle: `${page.value.title}`,
  description: page.value.description,
  ogDescription: page.value.description
})
</script>

<template>
  <div class="flex justify-center px-4 sm:px-6 lg:px-8 py-12">
    <ContentDoc
      :path="$route.path"
      class="w-full max-w-4xl"
    >
      <template #found>
        <article class="prose lg:prose-xl prose-slate mx-auto">
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
</template>

<style scoped>
</style>
