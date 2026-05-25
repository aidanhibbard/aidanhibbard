<script setup lang="ts">
import type { LandingContent } from '#shared/types/content/landing-content'
import type { PostListItem } from '#shared/types/content/post-list-item'
import { Card } from '@/components/shadcn/ui/card'
import { formatPostDate } from '@/utils/format-post-date'
import {
  landingCardFrameClass,
  landingCategoryClass,
  landingDateClass,
  landingFeaturedDescriptionClass,
  landingSectionHeadlineClass,
  landingSectionLeadClass,
  landingSidebarDescriptionClass,
} from '@/utils/landing-section-styles'

defineProps<{
  blogPath: string
  landing: LandingContent
  featuredPost: PostListItem | null
  sidebarPosts: PostListItem[]
  hasPosts: boolean
}>()
</script>

<template>
  <section
    class="mx-auto w-full max-w-7xl border-t border-border px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
    aria-label="Latest writing"
  >
    <div class="max-w-3xl">
      <p :class="landingCategoryClass">
        // WRITING
      </p>
      <h2 :class="landingSectionHeadlineClass">
        {{ landing.blogHeadline }}
      </h2>
      <p :class="landingSectionLeadClass">
        {{ landing.blogLead }}
      </p>
    </div>

    <div
      v-if="hasPosts"
      class="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-3 lg:gap-5"
    >
      <Card
        v-if="featuredPost"
        :class="[landingCardFrameClass, 'lg:col-span-2 rounded-none']"
        size="sm"
      >
        <NuxtLink
          :to="featuredPost.path"
          class="group flex min-h-72 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-80 lg:min-h-96"
        >
          <div
            class="flex flex-1 flex-col gap-6 px-6 py-8 sm:gap-7 sm:px-8 sm:py-10 lg:gap-8 lg:px-10 lg:py-12"
          >
            <h3
              class="cn-font-heading max-w-[16ch] text-balance text-4xl font-bold leading-[1.02] tracking-tight text-foreground transition-opacity group-hover:opacity-80 sm:text-5xl lg:text-6xl"
            >
              {{ featuredPost.title }}
            </h3>
            <p
              v-if="featuredPost.description"
              :class="landingFeaturedDescriptionClass"
            >
              {{ featuredPost.description }}
            </p>
            <time
              v-if="featuredPost.date"
              :datetime="featuredPost.date"
              :class="[landingDateClass, 'mt-auto']"
            >
              {{ formatPostDate(featuredPost.date) }}
            </time>
          </div>
        </NuxtLink>
      </Card>

      <div class="grid gap-4 sm:grid-cols-2 lg:flex lg:min-h-0 lg:flex-col lg:gap-5">
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
