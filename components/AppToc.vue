<script setup lang="ts">
import type { TocLink } from '@nuxt/content';

const props = defineProps<{
  links: TocLink[];
}>();
</script>

<template>
  <div class="space-y-2 border sticky h-min top-0 rounded-md">
    <TocItem
      v-for="link in props.links"
      :key="link.id"
      :link="link"
      class="block py-2 px-4 rounded hover:bg-gray-100 transition duration-150"
    />
  </div>
</template>

<style scoped>

</style>