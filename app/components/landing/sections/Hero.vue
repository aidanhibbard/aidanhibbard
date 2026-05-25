<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import type { LandingContent } from '#shared/types/content/landing-content'
import { Button } from '@/components/shadcn/ui/button'
import {
  landingCategoryClass,
  landingHeroCtaPrimaryClass,
  landingHeroCtaRowClass,
  landingHeroCtaSecondaryClass,
  landingHeroFocusClass,
  landingHeroHeadlineClass,
  landingHeroLeadClass,
} from '@/utils/landing-section-styles'

defineProps<{
  landing: LandingContent
  blogPath: string
  resumePath: string
}>()
</script>

<template>
  <LandingSectionShell
    label="Introduction"
    variant="hero"
  >
    <div class="lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-10 xl:gap-14">
      <div class="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left xl:max-w-2xl">
        <p :class="landingCategoryClass">
          // {{ landing.heroEyebrow }}
        </p>

        <h1 :class="landingHeroHeadlineClass">
          {{ landing.heroHeadline }}
        </h1>

        <p :class="landingHeroLeadClass">
          {{ landing.heroLead }}
        </p>

        <p
          v-if="landing.heroFocus"
          :class="landingHeroFocusClass"
        >
          {{ landing.heroFocus }}
        </p>

        <div :class="landingHeroCtaRowClass">
          <Button
            as-child
            size="lg"
            :class="landingHeroCtaPrimaryClass"
          >
            <NuxtLink :to="blogPath">
              {{ landing.heroCtaPrimaryLabel }}
              <ArrowRight aria-hidden="true" />
            </NuxtLink>
          </Button>

          <Button
            as-child
            variant="outline"
            size="lg"
            :class="landingHeroCtaSecondaryClass"
          >
            <NuxtLink :to="resumePath">
              {{ landing.heroCtaSecondaryLabel }}
            </NuxtLink>
          </Button>
        </div>
      </div>

      <div
        class="relative hidden w-full lg:block"
        aria-hidden="true"
      >
        <LandingIllustrationsDotCloud fade-cy="46%" />
        <div class="relative z-10 flex justify-center px-2 py-2 sm:px-4 sm:py-4 lg:justify-end lg:pr-2 xl:pr-6">
          <LandingIllustrationsPublishingWorkflow class="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl" />
        </div>
      </div>
    </div>
  </LandingSectionShell>
</template>
