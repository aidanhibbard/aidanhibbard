<template>
  <NuxtLink
    class="relative hover:cursor-pointer text-teal-500 hover:text-teal-600 font-bold text-2xl no-underline transition-all duration-300 inline-flex items-center gap-2 py-2"
  >
    <!-- The hash is hidden by default and only shown on hover -->
    <span class="absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      #
    </span>
    <!-- Use a default slot and wrap the content inside an h2 -->
    <h2
      ref="h2"
      class="text-2xl"
    >
      <slot md-unwrap="h2" />
    </h2>
  </NuxtLink>
</template>
