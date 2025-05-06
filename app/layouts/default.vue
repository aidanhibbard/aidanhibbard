<template>
  <UApp class="flex flex-col flex-1">
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
