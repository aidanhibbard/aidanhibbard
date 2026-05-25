<script setup lang="ts">
import type { PostListItem } from '#shared/types/content/post-list-item'
import { formatPostDate } from '@/utils/format-post-date'
import { landingCardFrameClass, landingDateClass } from '@/utils/landing-section-styles'

defineProps<{
  post: PostListItem
}>()
</script>

<template>
  <article :class="[landingCardFrameClass, 'h-full rounded-none']">
    <NuxtLink
      :to="post.path"
      class="group flex h-full min-h-48 flex-col px-5 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-52 sm:px-6 sm:py-7"
    >
      <time
        v-if="post.date"
        :datetime="post.date"
        :class="landingDateClass"
      >
        {{ formatPostDate(post.date) }}
      </time>
      <h3
        class="cn-font-heading mt-3 text-balance text-lg font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl"
      >
        {{ post.title }}
      </h3>
      <p
        v-if="post.description"
        class="mt-3 line-clamp-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-7"
      >
        {{ post.description }}
      </p>
    </NuxtLink>
  </article>
</template>
