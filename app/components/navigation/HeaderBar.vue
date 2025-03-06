<script setup lang="ts">
import { PopoverGroup } from '@headlessui/vue'
import { MoonIcon, SunIcon, HomeIcon, DocumentIcon, CodeBracketIcon, UserCircleIcon } from '@heroicons/vue/24/solid'

const { applyTheme } = useTheme()
const route = useRoute()

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
  <header class="fixed max-h-20 inset-x-0 bottom-0 md:top-0 z-50 bg-white/30 dark:bg-[#0f172a]/30 backdrop-blur-md border-b border-gray-300 dark:border-gray-700">
    <!-- Mobile Navigation (Hidden on md+) -->
    <nav
      class="mx-auto sm:flex md:hidden max-w-7xl items-center justify-between p-4 lg:px-6"
      aria-label="Mobile Navigation"
    >
      <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
        <NuxtLink
          to="/"
          class="inline-flex flex-col items-center justify-center px-5 py-2 transition duration-200 rounded-s-full active:scale-95"
          :class="route.path === '/' ? 'text-teal-600' : 'text-gray-500 dark:text-gray-400'"
        >
          <HomeIcon
            class="w-6 h-6 mb-1"
            :class="route.path === '/' ? 'text-teal-600' : 'text-gray-500 dark:text-gray-400'"
          />
          <span class="text-sm">Home</span>
        </NuxtLink>

        <NuxtLink
          to="/articles"
          class="inline-flex flex-col items-center justify-center px-5 py-2 transition duration-200 active:scale-95"
          :class="route.path === '/articles' ? 'text-teal-600' : 'text-gray-500 dark:text-gray-400'"
        >
          <DocumentIcon
            class="w-6 h-6 mb-1"
            :class="route.path === '/articles' ? 'text-teal-600' : 'text-gray-500 dark:text-gray-400'"
          />
          <span class="text-sm">Articles</span>
        </NuxtLink>

        <NuxtLink
          to="/projects"
          class="inline-flex flex-col items-center justify-center px-5 py-2 transition duration-200 active:scale-95"
          :class="route.path === '/projects' ? 'text-teal-600' : 'text-gray-500 dark:text-gray-400'"
        >
          <CodeBracketIcon
            class="w-6 h-6 mb-1"
            :class="route.path === '/projects' ? 'text-teal-600' : 'text-gray-500 dark:text-gray-400'"
          />
          <span class="text-sm">Projects</span>
        </NuxtLink>

        <NuxtLink
          to="/resume"
          class="inline-flex flex-col items-center justify-center px-5 py-2 transition duration-200 active:scale-95"
          :class="route.path === '/resume' ? 'text-teal-600' : 'text-gray-500 dark:text-gray-400'"
        >
          <UserCircleIcon
            class="w-6 h-6 mb-1"
            :class="route.path === '/resume' ? 'text-teal-600' : 'text-gray-500 dark:text-gray-400'"
          />
          <span class="text-sm">Resume</span>
        </NuxtLink>

        <SharedAppToggle v-model="state.theme">
          <template #icon-left>
            <SunIcon class="w-5 h-5 text-yellow-500" />
          </template>
          <template #icon-right>
            <MoonIcon class="w-5 h-5 text-gray-500" />
          </template>
        </SharedAppToggle>
      </div>
    </nav>

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
  </header>
</template>
