<script setup lang="ts">
import type { LandingContent } from '#shared/types/content/landing-content'
import {
  landingAboutBodyClass,
  landingAboutLeadClass,
  landingCategoryClass,
} from '@/utils/landing-section-styles'

defineProps<{
  aboutPath: string
  landing: LandingContent
}>()
</script>

<template>
  <LandingSectionShell
    label="About"
    variant="about"
  >
    <div class="lg:grid lg:grid-cols-3 lg:items-center lg:gap-5">
      <div class="max-w-3xl lg:col-span-2">
        <p :class="landingCategoryClass">
          // ABOUT
        </p>
        <h2
          class="cn-font-heading mt-6 scroll-m-20 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        >
          {{ landing.aboutHeadline }}
        </h2>
        <p :class="landingAboutLeadClass">
          {{ landing.aboutLead }}
        </p>
        <p :class="landingAboutBodyClass">
          {{ landing.aboutBody }}
        </p>
      </div>

      <div class="mt-12 flex w-full justify-center lg:col-start-3 lg:mt-0 lg:justify-center">
        <LandingIllustrationsFloatingStack class="w-full max-w-xs sm:max-w-sm lg:max-w-none" />
      </div>
    </div>

    <LandingSectionsSectionCta
      :to="aboutPath"
      label="Read the full story"
    />
  </LandingSectionShell>
</template>
