<script setup lang="ts">
const error = useError()

const message = computed(() => {
  switch (error.value!.statusCode) {
    case 500: {
      return 'Uh oh! Something went wrong!'
    }
    case 404: {
      return "The page you're looking for doesn't exist."
    }
    default: {
      return 'There was an unrecognized error...'
    }
  }
})
</script>

<template>
  <div class="h-full">
    <main class="grid h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-xl font-semibold text-indigo-600">
          {{ error!.statusCode }}
        </p>
        <h1 class="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {{ message }}
        </h1>
        <p class="text-lg font-semibold text-indigo-600 my-6">
          {{ error!.message ?? '' }}
        </p>
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-y-4 sm:gap-x-6">
          <NuxtLink
            to="/"
            class="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </NuxtLink>
          <NuxtLink
            href="https://github.com/aidanHibbard/aidanhibbard/issues"
            class="text-base font-semibold text-gray-900"
          >
            Open an issue on GitHub <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </main>
    <slot />
  </div>
</template>
