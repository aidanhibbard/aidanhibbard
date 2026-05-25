<script setup lang="ts">
import type { LandingContent } from '#shared/types/content/landing-content'
import {
  landingHeroHeadlineClass,
  landingHeroLeadClass,
} from '@/utils/landing-section-styles'

defineProps<{
  landing: LandingContent
}>()
</script>

<template>
  <section
    class="mx-auto w-full max-w-7xl px-4 pt-16 pb-10 sm:px-6 sm:pt-20 sm:pb-12 lg:px-8 lg:pt-24 lg:pb-14"
    aria-label="Introduction"
  >
    <div class="mx-auto max-w-3xl text-center">
      <h1 :class="landingHeroHeadlineClass">
        {{ landing.heroHeadline }}
      </h1>
      <p :class="landingHeroLeadClass">
        {{ landing.heroLead }}
      </p>
    </div>

    <div
      class="relative mx-auto mt-6 w-full max-w-3xl sm:mt-8"
      aria-hidden="true"
    >
      <LanderIllustrationsDotCloud fade-cy="48%" />
      <div class="relative z-10 flex justify-center px-4 py-4 sm:py-6">
        <LanderIllustrationsPublishingWorkflow />
      </div>
    </div>
  </section>
</template>
