<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content'
import { ArrowRight } from 'lucide-vue-next'

import { Badge } from '~/components/shadcn/ui/badge'
import { Button } from '~/components/shadcn/ui/button'

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
  <NuxtLink
    :to="project.stem"
    class="block h-full"
  >
    <Card class="h-full flex flex-col transition-colors hover:bg-accent/30">
      <CardHeader>
        <CardTitle>{{ project.title }}</CardTitle>
      </CardHeader>
      <CardContent class="flex-1">
        <CardDescription>{{ project.description }}</CardDescription>
      </CardContent>
      <CardFooter class="flex justify-between">
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
        <Button
          as="span"
          variant="ghost"
          size="icon"
        >
          <ArrowRight class="size-4" />
        </Button>
      </CardFooter>
    </Card>
  </NuxtLink>
</template>
