<script setup lang="ts">
import { Toaster } from '~/components/shadcn/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <!-- https://www.shadcn-vue.com/docs/components/sonner.html#add-the-toaster-component -->
    <Toaster />
    <Suspense>
      <NuxtPage />
    </Suspense>
  </NuxtLayout>
</template>
