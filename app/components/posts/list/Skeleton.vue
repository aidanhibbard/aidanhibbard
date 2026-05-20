<script setup lang="ts">
import { Skeleton } from '@/components/shadcn/ui/skeleton'

const PLACEHOLDER_COUNT = 5
</script>

<template>
  <div
    class="divide-y divide-border"
    aria-hidden="true"
  >
    <div
      v-for="index in PLACEHOLDER_COUNT"
      :key="index"
      class="space-y-3 px-4 py-8 sm:px-6 sm:py-10"
    >
      <Skeleton class="h-3 w-32 rounded-none" />
      <Skeleton class="h-8 w-full max-w-lg rounded-none" />
      <Skeleton class="h-4 w-full max-w-2xl rounded-none" />
      <Skeleton class="h-4 w-full max-w-xl rounded-none" />
    </div>
  </div>
</template>
