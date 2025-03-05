<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline'
import { PopoverGroup } from '@headlessui/vue'
import NavDrawer from './DrawerBar.vue'
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid'

const drawer = useDrawer()
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
  <header class="bg-white sticky top-0 z-50 border-b border-gray-200">
    <div class="relative">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-6"
        aria-label="Global"
      >
        <!-- Left Section -->
        <div class="flex">
          <NuxtLink
            href="/"
            class="text-2xl text-gray-900 transition-all duration-300 hover:opacity-75"
          >
            Aidan Hibbard
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <div class="flex lg:hidden">
          <button
            type="button"
            class="rounded-md p-2 text-gray-700"
            @click="drawer = !drawer"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon
              class="size-6"
              aria-hidden="true"
            />
          </button>
        </div>

        <!-- Desktop Navigation -->
        <PopoverGroup class="hidden lg:flex lg:gap-x-8 text-md font-medium text-gray-900 mx-auto">
          <NuxtLink
            href="/articles"
            class="hover:text-[#76ABAE]"
          >Articles</NuxtLink>
          <NuxtLink
            href="/projects"
            class="hover:text-[#76ABAE]"
          >Projects</NuxtLink>
          <NuxtLink
            href="/about"
            class="hover:text-[#76ABAE]"
          >About</NuxtLink>
          <NuxtLink
            href="/resume"
            class="hover:text-[#76ABAE]"
          >Resume</NuxtLink>
        </PopoverGroup>

        <!-- Search Bar (Desktop) -->
        <SharedAppToggle
          v-model="state.theme"
        >
          <template #icon-left>
            <SunIcon class="w-4 h-4 text-yellow-500" />
          </template>
          <template #icon-right>
            <MoonIcon class="w-4 h-4 text-gray-500" />
          </template>
        </SharedAppToggle>
      </nav>

      <NavDrawer />
    </div>
  </header>
</template>
