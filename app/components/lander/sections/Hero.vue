<script setup lang="ts">
import type { LandingContent } from '#shared/types/content/landing-content'
import {
  landingCategoryClass,
  landingHeroHeadlineClass,
  landingHeroLeadClass,
} from '@/utils/landing-section-styles'

defineProps<{
  landing: LandingContent
}>()
</script>

<template>
  <section
    class="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    aria-label="Introduction"
  >
    <div class="mx-auto max-w-3xl text-center">
      <p :class="landingCategoryClass">
        // HOME
      </p>
      <h1 :class="landingHeroHeadlineClass">
        {{ landing.heroHeadline }}
      </h1>
      <p :class="landingHeroLeadClass">
        {{ landing.heroLead }}
      </p>
    </div>

    <div
      class="relative mt-10 min-h-80 w-full overflow-hidden border border-border lg:mt-14 lg:aspect-16/10 lg:min-h-0"
      aria-hidden="true"
    >
      <LanderIllustrationsDotCloud fade-cy="50%" />
      <div class="relative flex size-full items-center justify-center px-4 py-10 sm:py-12">
        <LanderIllustrationsPublishingWorkflow />
      </div>
    </div>
  </section>
</template>
