<script setup lang="ts">
import type { Component } from 'vue'
import { ClipboardCheck, FilePenLine, Rocket } from 'lucide-vue-next'

type WorkflowStep = {
  label: string
  icon: Component
}

const steps: WorkflowStep[] = [
  { label: 'Draft', icon: FilePenLine },
  { label: 'Review', icon: ClipboardCheck },
  { label: 'Publish', icon: Rocket },
]
</script>

<template>
  <div
    class="relative flex flex-col items-center"
    role="img"
    aria-label="Publishing workflow: Draft, Review, Publish"
  >
    <template
      v-for="(step, index) in steps"
      :key="step.label"
    >
      <div
        class="relative z-10 w-44 border border-primary bg-card px-3 py-2.5"
      >
        <div class="flex items-center gap-2.5">
          <component
            :is="step.icon"
            class="size-4 shrink-0 text-primary"
          />
          <span class="font-mono text-[11px] font-medium tracking-[0.18em] text-foreground uppercase">
            {{ step.label }}
          </span>
        </div>
      </div>

      <div
        v-if="index < steps.length - 1"
        class="flex h-12 flex-col items-center"
        aria-hidden="true"
      >
        <span class="size-2 shrink-0 rounded-full border-2 border-primary bg-background" />
        <span class="w-px flex-1 border-l border-dashed border-primary/40" />
        <span class="size-2 shrink-0 rounded-full border-2 border-primary bg-background" />
      </div>
    </template>
  </div>
</template>
