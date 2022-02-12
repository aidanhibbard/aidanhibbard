<template>
  <div v-if="is404">
    <h1>404 Page Not Found</h1>
    <p>This page could not be found. Please check the pages url.</p>
  </div>
  <div v-else>
    <h1>500 Internal Server Error</h1>
    <p>Something went wrong.</p>
  </div>
</template>

<script setup>
defineProps(['is404'])
</script>

<style scoped>
div {
  padding-top: 15px;
}
div h1 {
  color: red;
}
</style>
