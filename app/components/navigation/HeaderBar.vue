<script setup lang="ts">
import { PopoverGroup } from '@headlessui/vue'
import { MoonIcon, SunIcon, Bars3Icon } from '@heroicons/vue/24/solid'

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
  <header class="sticky inset-x-0 top-0 z-50 bg-white/30 dark:bg-[#000000]/30 backdrop-blur-md border-b border-gray-300 dark:border-gray-700">
    <div class="relative">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-6"
        aria-label="Global"
      >
        <div class="flex flex-1">
          <NuxtLink
            href="/"
            class="text-2xl hover:opacity-75 transition-all duration-300 text-gray-900 dark:text-white hover:text-teal-500"
          >
            Aidan Hibbard
          </NuxtLink>
        </div>

        <!-- Hide links on small & medium screens -->
        <div class="hidden md:flex flex-1 justify-center">
          <PopoverGroup class="flex gap-x-8 text-md font-medium transition-all duration-300 text-gray-900 dark:text-white">
            <NuxtLink
              to="/articles"
              class="hover:text-teal-500"
            >Articles</NuxtLink>
            <NuxtLink
              to="/projects"
              class="hover:text-teal-500"
            >Projects</NuxtLink>
            <NuxtLink
              to="/talks"
              class="hover:text-teal-500"
            >Talks</NuxtLink>
            <NuxtLink
              to="/resume"
              class="hover:text-teal-500"
            >Resume</NuxtLink>
          </PopoverGroup>
        </div>

        <!-- Hide toggle on small & medium screens -->
        <div class="hidden md:flex flex-1 justify-end">
          <SharedAppToggle v-model="state.theme">
            <template #checked>
              <SunIcon class="w-4 h-4 text-yellow-500" />
            </template>
            <template #unchecked>
              <MoonIcon class="w-4 h-4 text-gray-500" />
            </template>
          </SharedAppToggle>
        </div>

        <!-- Show menu icon on small & medium screens -->
        <button class="md:hidden text-gray-900 dark:text-white">
          <Bars3Icon class="w-6 h-6" />
        </button>
      </nav>
    </div>
  </header>
</template>
