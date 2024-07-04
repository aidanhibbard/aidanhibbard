<script setup lang="ts">
import type { TocLink } from '@nuxt/content';

const props = defineProps<{
  links?: TocLink[];
}>();
</script>

<template>
  <div class="space-y-2">
    <TocItem
      v-for="link in props.links"
      :key="link.id"
      :link="link"
    />
  </div>
</template>

<style scoped>

</style>