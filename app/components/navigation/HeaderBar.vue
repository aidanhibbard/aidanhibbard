<script setup lang="ts">
import { reactive } from 'vue'
import { Bars3Icon, MagnifyingGlassIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import { PopoverGroup } from '@headlessui/vue'
import NavDrawer from './DrawerBar.vue'

const drawer = useDrawer()
const state = reactive({
  query: '',
})

const clearSearch = () => {
  state.query = ''
}
</script>

<template>
  <header class="bg-white sticky top-0 z-50">
    <div class="relative">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-6"
        aria-label="Global"
      >
        <!-- Left Section -->
        <div class="flex flex-1">
          <NuxtLink
            href="/"
            class="text-2xl text-[#76ABAE] transition-all duration-300 hover:opacity-75"
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
        <PopoverGroup class="hidden lg:flex lg:gap-x-8 text-md font-medium text-gray-900">
          <NuxtLink
            href="articles"
            class="hover:text-[#76ABAE]"
          >Articles</NuxtLink>
          <NuxtLink
            href="projects"
            class="hover:text-[#76ABAE]"
          >Projects</NuxtLink>
          <NuxtLink
            href="about"
            class="hover:text-[#76ABAE]"
          >About</NuxtLink>
          <NuxtLink
            href="resume"
            class="hover:text-[#76ABAE]"
          >Resume</NuxtLink>
        </PopoverGroup>

        <!-- Search Bar (Desktop) -->
        <div class="hidden lg:flex lg:flex-1 lg:justify-end relative w-64">
          <input
            v-model="state.query"
            type="text"
            class="w-72 rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#76ABAE] focus:outline-none"
            placeholder="Find anything..."
          >
          <MagnifyingGlassIcon class="absolute right-3 top-2.5 size-5 text-gray-400" />
          <XCircleIcon
            v-if="state.query"
            class="absolute right-9 top-2.5 size-5 cursor-pointer text-gray-400 hover:text-red-500"
            @click="clearSearch"
          />
        </div>
      </nav>

      <NavDrawer />
    </div>
  </header>
</template>
