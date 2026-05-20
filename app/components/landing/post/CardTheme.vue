<script setup lang="ts">
import { computed } from 'vue'
import type { PostTheme } from '#shared/types/content/post-theme'
import { resolvePostThemeBackground } from '@/utils/build-post-theme-gradient'

const props = defineProps<{
  theme: PostTheme
  seed: string
}>()

const colorMode = useColorMode()

const gradient = computed(() =>
  resolvePostThemeBackground(
    props.theme,
    colorMode.value === 'dark' ? 'dark' : 'light',
    props.seed,
  ),
)
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    <div
      class="absolute inset-0 scale-105"
      :style="{ background: gradient }"
    />
    <div
      class="absolute inset-0 bg-white/45 backdrop-blur-2xl backdrop-saturate-125 dark:bg-white/38"
    />
    <div
      class="absolute inset-0 bg-linear-to-br from-white/65 via-white/40 to-sky-50/30 dark:from-white/55 dark:via-white/32 dark:to-sky-100/22"
    />
  </div>
</template>
