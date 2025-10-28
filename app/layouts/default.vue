<script setup lang="ts">
import AppHeader from '@/components/navigation/header/AppHeader.vue'
</script>

<template>
  <div>
    <AppHeader />
    <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
      <slot />
    </main>
  </div>
</template>
