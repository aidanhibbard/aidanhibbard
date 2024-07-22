<script setup lang="ts">
const sections = [
  { title: 'Social Links', links: [
    { title: 'LinkedIn', href: 'https://www.linkedin.com/in/aidan-hibbard/' },
    { title: 'GitHub', href: 'https://github.com/AidanHibbard' },
    { title: 'CodePen', href: 'https://codepen.io/your-work' },
    { title: 'Instagram', href: 'https://www.instagram.com/aidan_hibbard/' }
  ]},
  { title: 'Personal Info', links: [
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
    { title: 'Resume', href: '/resume' },
  ]},
];
</script>

<template>
  <footer class="mx-auto mt-8 w-full max-w-container px-4 sm:px-6 lg:px-8">
    <h2
      id="footer-heading"
      class="sr-only"
    >
      Footer
    </h2>
    <div class="mb-16">
      <hr class="mt-10 border-t border-zinc-100">
      <div class="mt-10 flex sm:justify-center md:justify-evenly sm:flex-col md:flex-row">
        <div
          v-for="s in sections"
          .key="s.title"
          class="flex-1 max-w-xs text-center"
        >
          <h3 class="text-sm/6 font-semibold text-gray-900">
            {{ s.title }}
          </h3>
          <ul class="mt-4 space-y-4">
            <li
              v-for="l in s.links"
              .key="l.title"
              class="group"
            >
              <NuxtLink
                :to="l.href"
                class="text-sm/6 text-gray-600 hover:text-gray-900"
              >
                {{ l.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="items-center flex flex-col md:flex-row justify-around gap-4 border-t border-b border-gray-100 py-6">
      <p class="text-sm/6 text-slate-600 max-md:text-center">
        © 2024 Aidan Hibbard. All rights reserved.
      </p>
      <div class="flex items-center justify-center space-x-4 text-sm/6 font-semibold text-slate-900 md:justify-end">
        <a href="/privacy-policy">Contact</a>
        <div class="h-4 w-px bg-slate-200" />
        <a href="/changelog">GitHub</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>