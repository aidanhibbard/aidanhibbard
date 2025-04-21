<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#11120c] p-4 text-[#1f1f1f] font-sans">
    <main class="flex-1 flex flex-col lg:flex-row gap-6">
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
        <div
          v-for="i in 9"
          :key="i"
          class="rounded-xl bg-[#f3f6eb] p-6 border border-transparent hover:border-green-600 transition-all duration-200 shadow hover:shadow-md"
        >
          <p class="text-green-900 font-semibold">
            Card {{ i }}
          </p>
        </div>
      </section>

      <!-- Right Section: Full-height Card -->
      <section class="flex">
        <div class="flex-1 rounded-xl p-6transition-all duration-200">
          <div class="grid grid-cols-2 gap-4">
            <NuxtLink
              external
              to="https://instagram.com"
              class="flex items-center justify-center rounded-xl p-6 border border-pink-300 hover:border-pink-500 transition-all duration-300"
            >
              <Icon
                name="mdi:instagram"
                class="text-3xl text-pink-600"
              />
            </NuxtLink>

            <NuxtLink
              external
              to="https://codepen.io"
              class="flex items-center justify-center rounded-xl p-6 border border-gray-300 hover:border-gray-500 transition-all duration-300"
            >
              <Icon
                name="mdi:codepen"
                class="text-3xl text-gray-700"
              />
            </NuxtLink>

            <NuxtLink
              external
              to="https://linkedin.com"
              class="flex items-center justify-center rounded-xl p-6 border border-blue-300 hover:border-blue-500 transition-all duration-300"
            >
              <Icon
                name="mdi:linkedin"
                class="text-3xl text-blue-700"
              />
            </NuxtLink>

            <NuxtLink
              external
              to="https://github.com"
              class="flex items-center justify-center rounded-xl p-6 border border-green-300 hover:border-green-500 transition-all duration-300"
            >
              <Icon
                name="mdi:github"
                class="text-3xl text-green-800"
              />
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
