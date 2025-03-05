<script setup lang="ts">
const sections = [
  { title: 'Social Links', links: [
    { title: 'LinkedIn', href: 'https://www.linkedin.com/in/aidan-hibbard/' },
    { title: 'GitHub', href: 'https://github.com/AidanHibbard' },
    { title: 'CodePen', href: 'https://codepen.io/your-work' },
    { title: 'Instagram', href: 'https://www.instagram.com/aidan_hibbard/' },
  ] },
  { title: 'Personal Info', links: [
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/about#contact' },
    { title: 'Resume', href: '/resume' },
  ] },
]
</script>

<template>
  <footer class="mx-auto mt-8 w-full max-w-container px-6">
    <h2 id="footer-heading" class="sr-only">Footer</h2>

    <div class="mb-16">
      <hr class="mt-10 border-t border-gray-300 dark:border-gray-700 transition-colors duration-300" />
      <div class="mt-10 flex flex-col md:flex-row md:justify-evenly">
        <div
          v-for="s in sections"
          :key="s.title"
          class="flex-1 max-w-xs text-center"
        >
          <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {{ s.title }}
          </h3>
          <ul class="mt-4 space-y-4">
            <li
              v-for="l in s.links"
              :key="l.title"
              class="group"
            >
              <NuxtLink
                :to="l.href"
                class="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {{ l.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row items-center justify-between border-t border-gray-300 dark:border-gray-700 py-6 transition-colors duration-300">
      <p class="text-sm text-gray-600 dark:text-gray-300 text-center md:text-left transition-colors duration-300">
        © {{ new Date().getFullYear() }} Aidan Hibbard. All rights reserved.
      </p>
      <div class="flex items-center space-x-4 text-sm font-semibold">
        <NuxtLink 
          to="/about#contact"
          class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
        >
          Contact
        </NuxtLink>
        <div class="h-4 w-px bg-gray-300 dark:bg-gray-700 transition-colors duration-300" />
        <NuxtLink
          to="https://github.com/aidanhibbard"
          external
          class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
        >
          GitHub
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
