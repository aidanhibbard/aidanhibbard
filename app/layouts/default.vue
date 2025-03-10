<template>
  <div class="min-h-full bg-white dark:bg-[#1c1f24]">
    <div class="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div
        class="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          class="aspect-577/310 w-[36.0625rem] bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style="clip-path: polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)"
        />
      </div>
      <div
        class="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          class="aspect-577/310 w-[36.0625rem] bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style="clip-path: polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)"
        />
      </div>
      <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p class="text-sm/6 text-gray-900">
          This site is currently being rebuilt with Tailwind and Nuxt 3
        </p>
      </div>
      <div class="flex flex-1 justify-end">
        <button
          type="button"
          class="-m-3 p-3 focus-visible:outline-offset-[-4px]"
        >
          <span class="sr-only">Dismiss</span>
          <XMarkIcon
            class="size-5 text-gray-900"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
    <NavigationDesktopBar class="hidden md:block" />
    <NavigationMobileBar class="md:hidden sm:block" />
    <main class="relative h-full">
      <slot />
    </main>
    <NavigationFooterBar />
  </div>
</template>
