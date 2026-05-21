<script setup lang="ts">
import type { PostListItem } from '#shared/types/content/post-list-item'
import { Card } from '@/components/shadcn/ui/card'
import { formatPostDate } from '@/utils/format-post-date'
import {
  landingCardFrameClass,
  landingDateClass,
  landingFeaturedDescriptionClass,
  landingSidebarDescriptionClass,
} from '@/utils/landing-section-styles'

defineProps<{
  blogPath: string
  featuredPost: PostListItem | null
  sidebarPosts: PostListItem[]
  hasPosts: boolean
}>()
</script>

<template>
  <section
    class="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-10 sm:px-6 md:min-h-[calc(100svh-4rem)] lg:px-8 lg:py-14"
    aria-label="Latest writing"
  >
    <div
      v-if="hasPosts"
      class="grid flex-1 gap-4 lg:grid-cols-3 lg:gap-5"
    >
      <Card
        v-if="featuredPost"
        :class="[landingCardFrameClass, 'lg:col-span-2 rounded-none']"
        size="sm"
      >
        <NuxtLink
          :to="featuredPost.path"
          class="group flex min-h-88 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-104 lg:min-h-full"
        >
          <div
            class="flex flex-1 flex-col justify-end gap-6 px-6 py-8 sm:gap-7 sm:px-8 sm:py-10 lg:gap-8 lg:px-10 lg:py-12"
          >
            <h2
              class="cn-font-heading max-w-[16ch] text-balance text-4xl font-bold leading-[1.02] tracking-tight text-foreground transition-opacity group-hover:opacity-80 sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {{ featuredPost.title }}
            </h2>
            <p
              v-if="featuredPost.description"
              :class="landingFeaturedDescriptionClass"
            >
              {{ featuredPost.description }}
            </p>
            <time
              v-if="featuredPost.date"
              :datetime="featuredPost.date"
              :class="landingDateClass"
            >
              {{ formatPostDate(featuredPost.date) }}
            </time>
          </div>
        </NuxtLink>
      </Card>

      <div class="grid gap-4 sm:grid-cols-2 lg:flex lg:min-h-full lg:flex-col lg:gap-5">
        <Card
          v-for="post in sidebarPosts"
          :key="post.path"
          :class="[landingCardFrameClass, 'min-h-56 lg:min-h-0 lg:flex-1 rounded-none']"
          size="sm"
        >
          <NuxtLink
            :to="post.path"
            class="group flex h-full min-h-56 flex-col px-6 py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-7 sm:py-9 lg:min-h-0 lg:px-8 lg:py-10"
          >
            <h3
              class="cn-font-heading text-balance text-2xl font-bold leading-[1.08] tracking-tight text-foreground transition-opacity group-hover:opacity-80 sm:text-[1.65rem] lg:text-3xl"
            >
              {{ post.title }}
            </h3>
            <p
              v-if="post.description"
              :class="landingSidebarDescriptionClass"
            >
              {{ post.description }}
            </p>
            <time
              v-if="post.date"
              :datetime="post.date"
              :class="[landingDateClass, 'mt-auto pt-6 sm:pt-8']"
            >
              {{ formatPostDate(post.date) }}
            </time>
          </NuxtLink>
        </Card>
      </div>
    </div>

    <LanderSectionsSectionCta
      :to="blogPath"
      label="View all posts"
    />
  </section>
</template>
