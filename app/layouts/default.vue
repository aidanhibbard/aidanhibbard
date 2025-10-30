<script setup lang="ts">
import AppFooter from '~/components/layout/AppFooter.vue'
import CustomCursor from '~/components/navigation/mouse/CustomCursor.vue'
</script>

<template>
  <LayoutLandingShader>
    <NavigationHeaderAppHeader />
    <CustomCursor />
    <slot />
    <AppFooter />
  </LayoutLandingShader>
</template>
