<template>
  <div class="min-h-full bg-white dark:bg-[#222222]">
    <NavigationHeaderBar />
    <main class="relative h-full">
      <slot />
    </main>
    <NavigationFooterBar />
  </div>
</template>
