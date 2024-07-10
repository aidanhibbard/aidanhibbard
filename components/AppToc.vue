<script setup lang="ts">
import type { TocLink } from '@nuxt/content';

const props = defineProps<{
  links: TocLink[];
}>();
</script>

<template>
  <div
    id="toc-lg"
    class="sticky top-0 h-min"
  >
    <TocItem
      v-for="link in props.links"
      :key="link.id"
      :link="link"
    />
  </div>
</template>

<style scoped>
#toc-lg {
  position: sticky;
  top: 64px;
}
</style>