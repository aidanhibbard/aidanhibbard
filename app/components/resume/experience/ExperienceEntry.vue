<script setup lang="ts">
import type { ResumeExperience } from '#shared/types/content/resume-experience'

defineProps<{
  experience: ResumeExperience
}>()

const sectionHeadingClass
  = 'font-mono text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase'
</script>

<template>
  <article class="border-b border-border/70 py-8 last:border-b-0">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div class="min-w-0 space-y-1">
        <h3 class="cn-font-heading text-balance text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
          {{ experience.title }},
          <span class="text-foreground/90">{{ experience.organization }}</span>
        </h3>
        <p :class="sectionHeadingClass">
          {{ experience.location }}
        </p>
      </div>
      <time
        :datetime="experience.period"
        class="shrink-0 font-mono text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase tabular-nums"
      >
        {{ experience.period }}
      </time>
    </div>

    <ul class="mt-5 space-y-3 leading-relaxed text-muted-foreground">
      <li
        v-for="highlight in experience.highlights"
        :key="highlight"
        class="flex gap-3"
      >
        <span
          class="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary/70"
          aria-hidden="true"
        />
        <span>{{ highlight }}</span>
      </li>
    </ul>
  </article>
</template>
