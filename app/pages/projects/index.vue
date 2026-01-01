<script setup lang="ts">
const { data: projects, error } = await useAsyncData('projects', async () => {
  return []
})
</script>

<template>
  <LayoutPageContainer id="projects">
  </LayoutPageContainer>
</template>
