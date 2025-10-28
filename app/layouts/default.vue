<script setup lang="ts">
import AppHeader from '@/components/navigation/header/AppHeader.vue'
import AppSidebar from '@/components/navigation/sidebar/AppSidebar.vue'
import SidebarProvider from '@/shadcn/components/ui/sidebar/SidebarProvider.vue'
import { SidebarInset } from '@/shadcn/components/ui/sidebar'
import { useMediaQuery } from '@vueuse/core'

const isMobile = useMediaQuery('(max-width: 768px)')
</script>

<template>
  <SidebarProvider>
    <AppSidebar v-if="isMobile" />
    <SidebarInset>
      <AppHeader />
      <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
