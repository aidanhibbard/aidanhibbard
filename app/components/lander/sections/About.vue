<script setup lang="ts">
import type { LandingContent } from '#shared/types/content/landing-content'
import { landingCategoryClass } from '@/utils/landing-section-styles'

defineProps<{
  aboutPath: string
  landing: LandingContent
}>()
</script>

<template>
  <section
    class="mx-auto w-full max-w-7xl border-t border-border px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
    aria-label="About"
  >
    <div class="max-w-3xl">
      <p :class="landingCategoryClass">
        // ABOUT
      </p>
      <h2
        class="cn-font-heading mt-6 scroll-m-20 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        {{ landing.aboutHeadline }}
      </h2>
      <p class="mt-8 text-xl leading-relaxed text-muted-foreground">
        {{ landing.aboutLead }}
      </p>
      <p class="mt-6 leading-7 text-muted-foreground">
        {{ landing.aboutBody }}
      </p>
    </div>

    <LanderSectionsSectionCta
      :to="aboutPath"
      label="Read the full story"
    />
  </section>
</template>
