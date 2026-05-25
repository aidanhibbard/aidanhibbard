<script setup lang="ts">
import type { LandingContent } from '#shared/types/content/landing-content'
import type { PostListItem } from '#shared/types/content/post-list-item'
import {
  landingCategoryClass,
  landingSectionLeadClass,
} from '@/utils/landing-section-styles'

defineProps<{
  blogPath: string
  landing: LandingContent
  posts: PostListItem[]
  hasPosts: boolean
}>()
</script>

<template>
  <section
    class="mx-auto w-full max-w-7xl border-t border-border px-4 pt-10 pb-12 sm:px-6 sm:pt-12 sm:pb-16 lg:px-8 lg:pt-14 lg:pb-20"
    aria-label="Latest writing"
  >
    <header class="max-w-2xl">
      <p :class="landingCategoryClass">
        // WRITING
      </p>
      <h2
        class="cn-font-heading mt-5 text-balance text-2xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-[2rem] lg:leading-[1.12]"
      >
        {{ landing.blogHeadline }}
      </h2>
      <p
        :class="landingSectionLeadClass"
        class="mt-4! text-base leading-relaxed sm:mt-5! sm:text-lg sm:leading-[1.65]"
      >
        {{ landing.blogLead }}
      </p>
    </header>

    <div
      v-if="hasPosts"
      class="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
    >
      <LandingWritingPostTile
        v-for="post in posts"
        :key="post.path"
        :post="post"
      />
    </div>

    <LandingSectionsSectionCta
      :to="blogPath"
      label="View all posts"
    />
  </section>
</template>
