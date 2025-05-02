<template>
  <UApp class="flex flex-col flex-1">
    <section
      class="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white"
      aria-label="Site upgrade notice"
    >

      <Icon name="mdi:information-outline" class="text-xl" />

      <p class="prose-md font-medium py-2">
        This site is currently being upgraded from Nuxt 2 → Nuxt 3
      </p>
    </section>
    <NavigationHeaderMenu />
    <div class="flex flex-col flex-1">
      <NavigationAsideMenu />
      <main class="flex flex-col flex-1">
        <slot />
      </main>
    </div>
    <NavigationFooterMenu />
  </UApp>
</template>
