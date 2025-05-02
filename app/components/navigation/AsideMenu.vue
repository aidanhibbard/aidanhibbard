<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const drawer = useDrawer()

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Home',
      icon: 'mdi:home',
    },
    {
      label: 'Articles',
      icon: 'i-lucide-file-text',
      to: '/articles',
    },
    {
      label: 'Projects',
      icon: 'i-lucide-box',
      to: '/projects',
    },
    {
      label: 'Talks',
      icon: 'i-lucide-message-square-code',
      to: '/talks',
    },
    {
      label: 'About',
      icon: 'i-lucide-user',
      to: '/about',
    }
  ],
])
</script>

<template>
  <UDrawer
    v-model:open="drawer"
    dismissible direction="left"
    :handle="false"
    class="rounded-none"
  >
    <template #content>
      <UNavigationMenu
        variant="pill"
        color="neutral"
        size="xl" orientation="vertical" 
        :items="items"
        class="data-[orientation=vertical]:w-48 p-4"
      >
        <template #item-label="{ item }">
          <span class="text-lg">{{ item.label }}</span>
        </template>
      </UNavigationMenu>
    </template>
  </UDrawer>
</template>