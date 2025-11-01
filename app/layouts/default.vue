<script setup lang="ts">
import AppFooter from '~/components/layout/AppFooter.vue'
import CustomCursor from '~/components/navigation/mouse/CustomCursor.vue'
</script>

<template>
  <div>
    <NavigationHeaderAppHeader />
    <CustomCursor />
    <slot />
    <AppFooter />
  </div>
</template>
