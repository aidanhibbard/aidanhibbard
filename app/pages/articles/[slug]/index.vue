<script setup lang="ts">
const { path } = useRoute()

const { data: page, pending, error } = await useAsyncData(path, () => {
  return queryCollection('articles').path(path).first()
})
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
