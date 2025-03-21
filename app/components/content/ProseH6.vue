<script setup lang="ts">
const { headings } = useRuntimeConfig().public.mdc

const props = defineProps<{ id?: string }>()

const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h6)))
</script>

<template>
  <h6 :id="props.id">
    <NuxtLink
      v-if="props.id && generate"
      :href="`#${props.id}`"
      class="text-2xl text-gray-900 dark:text-[#F3F4ED] hover:text-teal-600 font-bold no-underline transition-all duration-300 inline-flex items-center"
    >
      <slot md-unwrap="h6" />
    </NuxtLink>
    <slot v-else />
  </h6>
</template>
