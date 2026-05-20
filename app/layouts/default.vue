<script setup lang="ts">
import { SidebarProvider } from '@/components/shadcn/ui/sidebar'
</script>

<template>
  <SidebarProvider :default-open="false">
    <AsideSideBar />
    <div class="flex min-h-svh w-full flex-col">
      <NavigationHeaderAppHeader />
      <main
        id="main-content"
        class="flex-1 outline-none"
        tabindex="-1"
      >
        <slot />
      </main>
    </div>
  </SidebarProvider>
</template>
