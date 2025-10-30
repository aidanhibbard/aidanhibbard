<script setup lang="ts">
import CustomCursor from '~/components/navigation/mouse/CustomCursor.vue'
</script>

<template>
  <LayoutLandingShader>
    <NavigationHeaderAppHeader />
    <CustomCursor />
    <slot />
  </LayoutLandingShader>
</template>
