<script setup lang="ts">
import type { ExperienceItem } from '~/composables/use-resume'
import { Badge } from '~/components/shadcn/ui/badge'

defineProps<{
  item: ExperienceItem
}>()
</script>

<template>
  <div
    class="space-y-4"
  >
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <h3 class="font-serif text-2xl font-semibold">
        {{ item.title }}
      </h3>
      <span class="text-muted-foreground">{{ item.from }} — {{ item.to ?? 'Present' }}</span>
    </div>
    <p class="text-lg text-muted-foreground">
      {{ item.company }}, {{ item.location }}{{ item.contract ? ' · Contract' : '' }}
    </p>
    <p class="leading-relaxed">
      {{ item.description }}
    </p>
    <div class="flex flex-wrap gap-2 pt-2">
      <Badge
        v-for="tag in item.tags"
        :key="tag"
      >
        {{ tag }}
      </Badge>
    </div>
  </div>
</template>
