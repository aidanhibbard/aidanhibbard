<template>
  <div class="min-h-full">
    <NavigationHeaderBar />
    <main class="relative h-full bg-white dark:bg-[#1b1b1f]">
      <slot />
    </main>
    <NavigationFooterBar />
  </div>
</template>
