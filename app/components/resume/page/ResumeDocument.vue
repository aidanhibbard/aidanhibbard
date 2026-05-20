<script setup lang="ts">
import type { ResumePage } from '#shared/types/content/resume-page'

defineProps<{
  resume: ResumePage
}>()

const sectionHeadingClass
  = 'cn-font-heading border-b border-border pb-3 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]'
</script>

<template>
  <div class="mx-auto w-full max-w-3xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16">
    <header class="border-b border-border/70 pb-10">
      <p class="font-mono text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
        // Resume
      </p>
      <h1 class="cn-font-heading mt-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {{ resume.name }}
      </h1>
      <ResumeHeaderContactLinks :contact="resume.contact" />
    </header>

    <section
      class="border-b border-border/70 py-10"
      aria-labelledby="resume-summary-heading"
    >
      <h2
        id="resume-summary-heading"
        :class="sectionHeadingClass"
      >
        Professional Summary
      </h2>
      <p class="mt-6 max-w-prose text-base leading-8 text-muted-foreground sm:text-[1.05rem]">
        {{ resume.summary }}
      </p>
    </section>

    <section
      class="border-b border-border/70 py-10"
      aria-labelledby="resume-skills-heading"
    >
      <h2
        id="resume-skills-heading"
        :class="sectionHeadingClass"
      >
        Technical Summary
      </h2>
      <dl class="mt-8 grid gap-8 sm:grid-cols-2">
        <div
          v-for="skill in resume.skills"
          :key="skill.category"
          class="min-w-0 space-y-2"
        >
          <dt class="font-mono text-[11px] font-medium tracking-[0.24em] text-foreground uppercase">
            {{ skill.category }}
          </dt>
          <dd class="text-sm leading-7 text-muted-foreground">
            {{ skill.items }}
          </dd>
        </div>
      </dl>
    </section>

    <section
      class="py-10"
      aria-labelledby="resume-experience-heading"
    >
      <h2
        id="resume-experience-heading"
        :class="sectionHeadingClass"
      >
        Experience
      </h2>
      <div class="mt-2">
        <ResumeExperienceEntry
          v-for="entry in resume.experience"
          :key="`${entry.organization}-${entry.period}`"
          :experience="entry"
        />
      </div>
    </section>
  </div>
</template>
