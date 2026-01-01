<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'

import { Badge } from '~/components/shadcn/ui/badge'
import { Button } from '~/components/shadcn/ui/button'
import { Card, CardContent } from '~/components/shadcn/ui/card'

type Project = {
  title: string
  description: string
  tags: string[]
  image?: string | null
}

defineProps<{
  project: Project
}>()
</script>

<template>
  <Card
    class="group relative overflow-hidden rounded-xl border-0 py-0 gap-0 shadow-sm transition-all duration-300 hover:shadow-md"
  >
    <CardContent class="relative h-[600px] p-0">
      <NuxtImg
        v-if="project.image"
        :src="project.image"
        :alt="project.title"
        class="size-full object-cover"
        width="1200"
        height="800"
        sizes="(max-width: 768px) 100vw, 768px"
        loading="lazy"
        decoding="async"
      />

      <div
        v-else
        class="size-full bg-linear-to-br from-muted to-muted/40"
      />

      <div
        class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90"
      />

      <div class="absolute inset-0 flex flex-col justify-between p-6">
        <div class="translate-y-4 transition-all duration-300">
          <h3 class="mb-2 font-serif text-2xl font-light">
            {{ project.title }}
          </h3>
          <p class="text-sm leading-relaxed text-pretty">
            {{ project.description }}
          </p>
        </div>

        <div class="flex items-end justify-between gap-4">
          <div class="flex flex-wrap gap-2">
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
            class="size-10 rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:bg-white/20"
          >
            <ArrowUpRight class="size-5" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
