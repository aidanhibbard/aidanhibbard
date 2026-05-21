<script setup lang="ts">
import type { TocLink } from '@nuxtjs/mdc'
import { cn } from '@/lib/utils'

defineProps<{
  contentPath: string
  tocLinks: TocLink[]
  ariaLabel?: string
  articleClass?: string
}>()

const gridShellClass = 'mx-auto grid w-full max-w-7xl px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-5 lg:px-8'

const articleClassDefault = 'py-12 sm:py-14 lg:py-16'
</script>

<template>
  <div>
    <header>
      <div :class="gridShellClass">
        <div
          aria-hidden="true"
          class="hidden lg:col-span-2 lg:block"
        />
        <div class="col-span-12 py-12 sm:py-14 lg:col-span-8">
          <slot name="header" />
        </div>
        <div
          aria-hidden="true"
          class="hidden lg:col-span-2 lg:block"
        />
      </div>

      <div :class="gridShellClass">
        <div
          aria-hidden="true"
          class="hidden lg:col-span-2 lg:block"
        />
        <div
          class="col-span-12 flex items-center justify-between gap-4 pt-4 pb-4 lg:col-span-8"
        >
          <ShareActions :path="contentPath" />
          <CopyMarkdown :path="contentPath" />
        </div>
        <div
          aria-hidden="true"
          class="hidden lg:col-span-2 lg:block"
        />
      </div>
    </header>

    <div
      class="border-b border-border"
      aria-hidden="true"
    />

    <div :class="gridShellClass">
      <div
        aria-hidden="true"
        class="relative hidden lg:col-span-2 lg:block"
      >
        <div class="absolute inset-y-0 right-0 w-px bg-border" />
      </div>

      <div class="col-span-12 min-w-0 lg:col-span-8">
        <article
          :class="cn(articleClassDefault, articleClass)"
          :aria-label="ariaLabel"
        >
          <slot />
        </article>
      </div>

      <div class="relative hidden lg:col-span-2 lg:block pt-12 sm:pt-14">
        <div class="absolute inset-y-0 left-0 w-px bg-border" />
        <ContentToc
          v-if="tocLinks.length > 0"
          :links="tocLinks"
        />
      </div>
    </div>
  </div>
</template>
