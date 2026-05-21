<template>
  <div class="flex min-h-svh w-full flex-col antialiased">
    <NavigationHeaderAppHeader />
    <main
      id="main-content"
      class="flex flex-1 flex-col items-center justify-center px-4 py-12 outline-none"
      tabindex="-1"
    >
      <slot />
    </main>
  </div>
</template>
