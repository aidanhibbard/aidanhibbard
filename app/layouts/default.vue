<template>
  <div class="min-h-full bg-white dark:bg-[#1c1f24]">
    <NavigationHeaderBar />
    <main class="relative h-full">
      <slot />
    </main>
    <NavigationFooterBar />
  </div>
</template>
