<script setup lang='ts'>
const { data } = await useAsyncData(
  'article',
  () => queryContent('articles')
    .sort({ publishedAt: -1 })
    .find()
)
</script>

<template>
  <div
    id="gradient"
    class="py-16"
  >
    <div
      class="mx-auto max-w-7xl sm:px-6 sm:py-1 flex justify-around"
    >
      <LatestArticle :article="data![0]" />
      <LatestArticles
        :articles="data"
      />
    </div>
  </div>
</template>

<style scoped>
#gradient {
  background: linear-gradient(225deg, #82cdf6 0%, #e3baa5 100%),
    url('/images/gradient.png') no-repeat center center;
  background-size: cover;
}
</style>