<template>
  <NuxtLink
    class="text-gray-900 font-bold text-2xl no-underline hover:text-gray-700 transition-all duration-300 inline-flex items-center gap-2 py-2"
  >
    <span class="text-gray-400 transition-all duration-300 group-hover:text-gray-600">#</span>
    <slot mdc-unwap="h2" />
  </NuxtLink>
</template>
