<script setup lang="ts">
import type { ExperienceItem } from '~/types/experience-item'
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
    <ul
      v-if="item.bullets?.length"
      class="list-disc pl-5 space-y-2 leading-relaxed"
    >
      <li
        v-for="(bullet, idx) in item.bullets"
        :key="idx"
      >
        {{ bullet }}
      </li>
    </ul>
    <div
      v-if="item.tags?.length"
      class="flex flex-wrap gap-2 pt-2"
    >
      <Badge
        v-for="tag in item.tags"
        :key="tag"
      >
        {{ tag }}
      </Badge>
    </div>
  </div>
</template>
