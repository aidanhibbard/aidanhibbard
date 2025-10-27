<script setup lang="ts">
import AppSidebar from '@/components/navigation/sidebar/AppSidebar.vue'
import AppHeader from '@/components/navigation/header/AppHeader.vue'
import {
  SidebarInset,
  SidebarProvider,
} from '@/shadcn/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <AppHeader />
      <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
