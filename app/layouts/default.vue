<script setup lang="ts">
import CustomCursor from '~/components/navigation/mouse/CustomCursor.vue'
</script>

<template>
  <div>
    <NavigationHeaderAppHeader />
    <CustomCursor />
    <slot />
  </div>
</template>
