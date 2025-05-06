<script setup lang="ts">
const colorMode = useColorMode()
const drawer = useDrawer()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
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
            class="text-2xl hover:opacity-75 transition-all duration-300 text-gray-900 dark:text-white hover:text-teal-300"
            active-class="text-teal-300 dark:text-teal-300"
          >
            Aidan Hibbard
          </NuxtLink>
        </div>

        <!-- Hide links on small & medium screens -->
        <div class="hidden md:flex flex-1 justify-center">
          <div class="flex gap-x-8 text-md font-medium transition-all duration-300">
            <NuxtLink
              to="/articles"
              class="hover:text-teal-300"
              active-class="text-teal-300 dark:text-teal-300"
            >Articles</NuxtLink>
            <NuxtLink
              to="/projects"
              class="hover:text-teal-300"
              active-class="text-teal-300 dark:text-teal-300"
            >Projects</NuxtLink>
            <NuxtLink
              to="/talks"
              class="hover:text-teal-300"
              active-class="text-teal-300 dark:text-teal-300"
            >Talks</NuxtLink>
            <NuxtLink
              to="/about"
              class="hover:text-teal-300"
              active-class="text-teal-300 dark:text-teal-300"
            >About</NuxtLink>
          </div>
        </div>

        <!-- Tablet and greater -->
        <div class="hidden md:flex flex-1 justify-end items-center gap-x-4 h-full">
          <UButton external to="https://www.instagram.com/aidan_hibbard/" color="neutral" variant="ghost">
            <template #default>
              <UIcon name="mdi:instagram" class="text-2xl" />
            </template>
          </UButton>
          <UButton external to="https://github.com/AidanHibbard" color="neutral" variant="ghost">
            <template #default>
              <UIcon name="mdi:github" class="text-2xl" />
            </template>
          </UButton>
          <UButton external to="https://www.linkedin.com/in/aidan-hibbard/" color="neutral" variant="ghost">
            <template #default>
              <UIcon name="mdi:linkedin" class="text-2xl" />
            </template>
          </UButton>
          <UButton external to="https://codepen.io/aidanhibbard" color="neutral" variant="ghost">
            <template #default>
              <UIcon name="mdi:codepen" class="text-2xl" />
            </template>
          </UButton>
          <ClientOnly v-if="!colorMode?.forced">
            <USwitch
              v-model="isDark"
              color="neutral"
              checked-icon="material-symbols-light:moon-stars"
              unchecked-icon="material-symbols:sunny-rounded"
              size="xl"
            />
          </ClientOnly>
        </div>

        <!-- Mobile -->
        <div class="flex md:hidden flex-1 justify-end items-center gap-x-4 h-full">
          <ClientOnly v-if="!colorMode?.forced">
            <USwitch
              v-model="isDark"
              checked-icon="material-symbols-light:moon-stars"
              unchecked-icon="material-symbols:sunny-rounded"
              size="xl"
              color="neutral"
            />
          </ClientOnly>
          <UButton color="neutral" variant="ghost" @click="drawer = !drawer">
            <template #default>
              <UIcon name="mdi:menu" class="text-2xl" />
            </template>
          </UButton>
        </div>
      </nav>
    </div>
  </header>
</template>
