<script setup lang="ts">
import { MoonIcon, SunIcon, HomeIcon, DocumentIcon, CodeBracketIcon, UserCircleIcon } from '@heroicons/vue/24/solid'

const route = useRoute()
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
  <div class="sticky inset-x-0 bottom-0 z-50 bg-white dark:bg-[#0f172a] border-b border-gray-300 dark:border-gray-700">
    <!-- Desktop Navigation (Hidden on sm-) -->
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
  </div>
</template>
