<script setup lang="ts">
const { data: about } = await useAsyncData('about-page', () =>
  queryCollection('content').path('/about').first(),
)

if (!about.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'About page not found',
  })
}

useSeoMeta({
  title: about.value.title,
  description: about.value.description,
})
</script>

<template>
  <article
    class="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    aria-label="About"
  >
    <ContentRenderer
      v-if="about"
      :value="about"
    />
  </article>
</template>
