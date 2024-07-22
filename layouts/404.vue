<script setup lang="ts">
useHead({
  title: 'Aidan Hibbard',
  titleTemplate: '%s %separator %siteName',
  templateParams: { separator: '|', siteName: 'Error' },
  meta: [
    { name: 'description', content: 'Blog, projects, and more.' },
  ],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <div>
    <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-base font-semibold text-indigo-600">
          404
        </p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <NuxtLink
            to="/"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </NuxtLink>
          <NuxtLink
            href="https://github.com/aidanHibbard/aidanhibbard/issues"
            class="text-sm font-semibold text-gray-900"
          >
            Open an issue on GitHub <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </main>
    <slot />
  </div>
</template>

<style scoped></style>
