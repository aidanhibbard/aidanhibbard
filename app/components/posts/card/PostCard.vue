<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import type { PostListItem } from '#shared/types/content/post-list-item'
import { formatPostDate } from '@/utils/format-post-date'

defineProps<{
  post: PostListItem
}>()

const dateClass
  = 'font-mono text-[11px] font-medium tracking-[0.22em] text-muted-foreground uppercase tabular-nums'
</script>

<template>
  <article>
    <NuxtLink
      :to="post.path"
      class="group -mx-4 flex items-start justify-between gap-6 border-l-2 border-transparent px-4 py-8 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:-mx-6 sm:px-6 sm:py-10"
    >
      <div class="min-w-0 flex-1">
        <time
          :datetime="post.date"
          :class="dateClass"
        >
          {{ formatPostDate(post.date) }}
        </time>
        <h2
          class="cn-font-heading mt-3 text-balance text-2xl font-bold leading-[1.08] tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-[1.75rem] lg:text-3xl"
        >
          {{ post.title }}
        </h2>
        <p
          v-if="post.description"
          class="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground"
        >
          {{ post.description }}
        </p>
      </div>

      <ArrowRight
        class="mt-1 size-4 shrink-0 translate-x-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100"
        aria-hidden="true"
      />
    </NuxtLink>
  </article>
</template>
