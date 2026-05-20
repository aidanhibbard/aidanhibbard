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
      class="absolute inset-0 bg-white/55 backdrop-blur-3xl backdrop-brightness-90 backdrop-saturate-70"
    >
      <div
        class="absolute inset-0 bg-white/45 backdrop-blur-3xl backdrop-brightness-92 backdrop-saturate-75"
      />
      <div
        class="absolute inset-0 bg-white/35 backdrop-blur-3xl backdrop-brightness-95 backdrop-saturate-80"
      />
    </div>
  </div>
</template>
