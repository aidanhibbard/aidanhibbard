<script setup lang="ts">
import type { ResumeRole } from '#shared/types/content/resume-role'
import {
  landingCategoryClass,
  landingDateClass,
} from '@/utils/landing-section-styles'

defineProps<{
  currentRole: ResumeRole
  pastRoles: ResumeRole[]
  resumePath: string
}>()
</script>

<template>
  <section
    class="mx-auto w-full max-w-7xl border-t border-border px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    aria-label="Resume"
  >
    <p :class="landingCategoryClass">
      // RESUME
    </p>

    <article
      class="mt-6 max-w-2xl lg:mt-8"
      aria-label="Current role"
    >
      <time
        :datetime="currentRole.period"
        :class="landingDateClass"
      >
        {{ currentRole.period }}
      </time>
      <h2
        class="cn-font-heading mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
      >
        {{ currentRole.title }}
      </h2>
      <p class="mt-2 font-mono text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
        {{ currentRole.organization }}
      </p>
      <p class="mt-4 leading-7 text-muted-foreground">
        {{ currentRole.summary }}
      </p>
    </article>

    <div
      v-if="pastRoles.length > 0"
      class="mt-10 lg:mt-12"
      aria-label="Previous roles"
    >
      <p :class="landingCategoryClass">
        // PREVIOUSLY
      </p>
      <ol
        class="mt-6 flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:gap-10"
      >
        <li
          v-for="entry in pastRoles"
          :key="`${entry.period}-${entry.title}-${entry.organization}`"
          class="min-w-0 lg:border-l lg:border-border lg:pl-10 lg:first:border-l-0 lg:first:pl-0"
        >
          <time
            :datetime="entry.period"
            :class="landingDateClass"
          >
            {{ entry.period }}
          </time>
          <p class="cn-font-heading mt-3 text-balance text-base font-bold leading-snug tracking-tight text-foreground sm:text-lg">
            {{ entry.title }}
          </p>
          <p class="mt-1.5 font-mono text-[11px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
            {{ entry.organization }}
          </p>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
            {{ entry.summary }}
          </p>
        </li>
      </ol>
    </div>

    <LanderSectionsSectionCta
      :to="resumePath"
      label="View full resume"
    />
  </section>
</template>
