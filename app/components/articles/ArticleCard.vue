<script setup lang="ts">
import { Badge } from '~/components/shadcn/ui/badge'
import { Button } from '~/components/shadcn/ui/button'
import { formatISO } from 'date-fns'
import { ArrowRight } from 'lucide-vue-next'
import type { ArticlesCollectionItem } from '@nuxt/content'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/shadcn/ui/card'

defineProps<{
  post: Pick<
    ArticlesCollectionItem,
    'description' | 'date' | 'tags' | 'id' | 'stem' | 'title'
  >
}>()
</script>

<template>
  <article>
    <NuxtLink
      :to="post.stem"
      class="block"
    >
      <Card class="transition-colors hover:bg-accent/30">
        <CardHeader class="gap-4">
          <div class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <time>{{ formatISO(post.date, { representation: 'date' }) }}</time>
          </div>

          <CardTitle class="font-serif text-2xl md:text-3xl font-semibold">
            {{ post.title }}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription class="text-base leading-relaxed">
            {{ post.description }}
          </CardDescription>
        </CardContent>

        <CardFooter class="flex justify-between">
          <div class="flex flex-wrap gap-2">
            <Badge
              v-for="tag in post.tags"
              :key="tag"
              class="text-xs"
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
  </article>
</template>
