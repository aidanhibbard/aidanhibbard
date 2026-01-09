<script setup lang="ts">
import { Separator } from '~/components/shadcn/ui/separator'

const { contact, professionalSummary, technicalSummary, experience } = useResume()
</script>

<template>
  <LayoutPageContainer id="resume">
    <div class="space-y-12">
      <div class="space-y-3">
        <h1 class="font-serif text-4xl md:text-5xl font-bold">
          {{ contact.name }}
        </h1>
        <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <NuxtLink
            class="hover:text-foreground transition-colors"
            :href="`mailto:${contact.email}`"
          >
            {{ contact.email }}
          </NuxtLink>
          <span aria-hidden="true">|</span>
          <NuxtLink
            class="hover:text-foreground transition-colors"
            :to="contact.links.linkedin"
            external
          >
            LinkedIn
          </NuxtLink>
          <span aria-hidden="true">|</span>
          <NuxtLink
            class="hover:text-foreground transition-colors"
            :to="contact.links.github"
            external
          >
            GitHub
          </NuxtLink>
        </div>
      </div>

      <Separator />

      <div class="space-y-4">
        <h2 class="font-serif text-2xl font-semibold">
          Professional Summary
        </h2>
        <p class="text-muted-foreground leading-relaxed">
          {{ professionalSummary }}
        </p>
      </div>

      <Separator />

      <div class="space-y-4">
        <h2 class="font-serif text-2xl font-semibold">
          Technical Summary
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="section in technicalSummary"
            :key="section.category"
          >
            <h3 class="font-medium mb-2">
              {{ section.category }}
            </h3>
            <p class="text-sm text-muted-foreground leading-relaxed">
              {{ section.items.join(', ') }}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      <div class="space-y-8">
        <h2 class="font-serif text-4xl md:text-5xl font-bold">
          Experience
        </h2>
        <div class="space-y-12">
          <ResumeExpCard
            v-for="item in experience"
            :key="item.company"
            :item
          />
        </div>
      </div>
    </div>
    </div>
  </LayoutPageContainer>
</template>
