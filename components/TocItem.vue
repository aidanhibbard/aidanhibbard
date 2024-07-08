<script setup lang="ts">
import type { TocLink } from '@nuxt/content';
defineProps<{
  link: TocLink;
}>();
</script>

<template>
  <div :class="`pl-${link.depth * 4}`">
    <a
      :href="`#${link.id}`"
      class="text-gray-900 text-lg block h-full py-2 px-4 border-b hover:bg-gray-100 transition duration-150"
    >{{ link.text }}</a>
    <div v-if="link.children && link.children.length">
      <TocItem
        v-for="child in link.children"
        :key="child.id"
        :link="child"
      />
    </div>
  </div>
</template>

<style scoped>
/* Additional styles can be added here if needed */
</style>