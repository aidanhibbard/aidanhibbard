<script setup lang="ts">
defineProps<{
  type: string;
}>();
</script>

<template>
  <pre>
    <code :class="[`language-${type}`]">
      <slot />
    </code>
  </pre>
</template>

<style>

</style>