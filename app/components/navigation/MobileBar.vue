<script setup lang="ts">
import { PopoverGroup } from '@headlessui/vue'
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid'

const { applyTheme } = useTheme()

const state = reactive({
  theme: false,
})

watchEffect(() => {
  if (state.theme) {
    applyTheme('light')
  }
  else {
    applyTheme('dark')
  }
})
</script>

<template>
  <div class="sticky inset-x-0 bottom-0 z-50 bg-white/30 dark:bg-[#0f172a]/30 backdrop-blur-md border-b border-gray-300 dark:border-gray-700">
    <!-- Desktop Navigation (Hidden on sm-) -->
    <nav
      class="hidden md:flex items-center justify-between max-w-7xl mx-auto p-4 lg:px-6"
      aria-label="Desktop Navigation"
    >
      <!-- Brand -->
      <NuxtLink
        href="/"
        class="text-2xl hover:opacity-75 transition-all duration-300 text-gray-900 dark:text-[#F3F4ED] hover:text-teal-500"
      >
        Aidan Hibbard
      </NuxtLink>

      <!-- Navigation Links -->
      <PopoverGroup class="flex gap-x-8 text-md font-medium transition-all duration-300 text-gray-900 dark:text-[#F3F4ED]">
        <NuxtLink
          href="/articles"
          class="hover:text-teal-500"
        >Articles</NuxtLink>
        <NuxtLink
          href="/projects"
          class="hover:text-teal-500"
        >Projects</NuxtLink>
        <NuxtLink
          href="/resume"
          class="hover:text-teal-500"
        >Resume</NuxtLink>
      </PopoverGroup>

      <!-- Dark Mode Toggle -->
      <SharedAppToggle v-model="state.theme">
        <template #icon-left>
          <SunIcon class="w-4 h-4 text-yellow-500" />
        </template>
        <template #icon-right>
          <MoonIcon class="w-4 h-4 text-gray-500" />
        </template>
      </SharedAppToggle>
    </nav>
  </div>
</template>
