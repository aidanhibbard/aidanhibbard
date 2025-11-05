<script setup lang="ts">
import AppFooter from '~/components/layout/AppFooter.vue'
import CustomCursor from '~/components/navigation/mouse/CustomCursor.vue'

import { Toaster } from '~/components/shadcn/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <div>
    <NuxtLink
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-background focus:px-3 focus:py-2 focus:text-foreground focus:outline focus:outline-2 focus:outline-primary"
    >
      Skip to main content
    </NuxtLink>
    <!-- https://www.shadcn-vue.com/docs/components/sonner.html#add-the-toaster-component -->
    <Toaster />
    <NavigationHeaderAppHeader />
    <!-- This has to be below the header -->
    <CustomCursor v-if="$device.isDesktopOrTablet" />
    <main
      id="main-content"
      tabindex="-1"
    >
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
