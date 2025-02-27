<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const messaging = {
  notFound: 'Sorry that page couldn\'t be found.',
  unexpectedError: 'An unexpected error ocurred.',
}

const displayMessage: ComputedRef<keyof typeof messaging> = computed(() => {
  switch (props.error.statusCode) {
    case 404: {
      return 'notFound'
    }
    case 500: {
      return 'unexpectedError'
    }
    default: {
      return 'unexpectedError'
    }
  }
})

const issueTitle = computed(() => `[${props.error.statusCode}] ${props.error.message}`)

const handleClear = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-indigo-600">
        {{ props.error?.statusCode }}
      </p>
      <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
        {{ props.error?.message }}
      </h1>
      <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
        {{ messaging[displayMessage] }}
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <button
          href="#"
          class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="handleClear"
        >
          Go back home
        </button>
        <NuxtLink
          :to="`https://github.com/aidanHibbard/aidanhibbard/issues/new?title=${issueTitle}&labels=bug&assignees=aidanhibbard`"
          external
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm font-semibold text-gray-900"
        >Open an issue <span aria-hidden="true">&rarr;</span></NuxtLink>
      </div>
    </div>
  </div>
</template>
