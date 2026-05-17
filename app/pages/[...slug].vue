<script setup lang="ts">
const route = useRoute()

const {
  data: page,
  // pending,
  // refresh,
  // execute,
  // clear,
  error,
  // status,
} = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (error.value) {
  throw createError({
    statusCode: error.value.status,
    message: error.value.message,
    fatal: error.value.fatal,
    stack: error.value.stack,
  })
}

if (!page.value) {
  throw createError({
    statusCode: 404,
    message: 'Content not found',
  })
}
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
