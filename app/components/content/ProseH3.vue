<script setup lang="ts">
const { headings, } = useRuntimeConfig().public.mdc;

const props = defineProps<{ id?: string }>();

const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h3)),);
</script>

<template>
  <h3 :id="props.id">
    <NuxtLink
      v-if="props.id && generate"
      :href="`#${props.id}`"
      class="text-xl text-gray-900 dark:text-[#F3F4ED] hover:text-teal-600 font-bold no-underline transition-all duration-300 inline-flex items-center"
    >
      <slot md-unwrap="h3" />
    </NuxtLink>
    <slot v-else />
  </h3>
</template>
