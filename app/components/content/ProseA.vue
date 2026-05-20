<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
    default: '_blank',
    required: false,
  },
})
</script>

<template>
  <NuxtLink
    :href="props.href"
    :target="props.target"
    class="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
  >
    <slot />
  </NuxtLink>
</template>
