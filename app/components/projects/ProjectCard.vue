<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content'

import { Badge } from '~/components/shadcn/ui/badge'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui/card'

defineProps<{
  project: Partial<ProjectsCollectionItem>
}>()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ project.title }}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{{ project.description }}</CardDescription>
    </CardContent>
    <CardFooter>
      <div class="flex flex-wrap gap-x-2">
        <Badge
          v-for="(tag, tagIndex) in project.tags"
          :key="tagIndex"
          variant="secondary"
          class="rounded-full border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
        >
          {{ tag }}
        </Badge>
      </div>
    </CardFooter>
  </Card>
</template>
