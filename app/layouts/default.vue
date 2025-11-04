<script setup lang="ts">
import AppFooter from '~/components/layout/AppFooter.vue'
import CustomCursor from '~/components/navigation/mouse/CustomCursor.vue'

import { Toaster } from '~/components/shadcn/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <div>
    <!-- https://www.shadcn-vue.com/docs/components/sonner.html#add-the-toaster-component -->
    <Toaster />
    <NavigationHeaderAppHeader />
    <CustomCursor />
    <slot />
    <AppFooter />
  </div>
</template>
