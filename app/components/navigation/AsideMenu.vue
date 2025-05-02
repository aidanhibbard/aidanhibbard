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
      label: 'Components',
      icon: 'i-lucide-box',
      to: '/components',
    }
  ],
])
</script>

<template>
  <UDrawer v-model:open="drawer" dismissible direction="left" :handle="false" class="rounded-none">
    <template #content>
      <UNavigationMenu variant="pill" color="neutral" size="xl" orientation="vertical" :items="items" class="data-[orientation=vertical]:w-48 p-4" />
    </template>
  </UDrawer>
</template>