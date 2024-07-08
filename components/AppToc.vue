<script setup lang="ts">
import type { TocLink } from '@nuxt/content';

const props = defineProps<{
  links: TocLink[];
}>();

// https://firefox-source-docs.mozilla.org/performance/scroll-linked_effects.html
onMounted(() => {
  document.addEventListener('scroll', () => {
    const stickyItem = document.getElementById('toc-lg')!;
    const yOffset = window.scrollY;
    const triggerPoint = 512;
    const additionalTop = 64;

    if (yOffset > triggerPoint) {
      stickyItem.style.top = `${additionalTop}px`;
    } else {
      stickyItem.style.top = '0px';
    }
  });
})
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

</style>