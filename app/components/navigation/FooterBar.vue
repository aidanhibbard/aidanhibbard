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
  <footer class="mx-auto mt-8 w-full max-w-container">
    <h2
      id="footer-heading"
      class="sr-only"
    >
      Footer
    </h2>
    <div class="mb-16">
      <hr class="mt-10 border-t border-gray-200">
      <div class="mt-10 flex sm:justify-center md:justify-evenly sm:flex-col md:flex-row">
        <div
          v-for="s in sections"
          .key="s.title"
          class="flex-1 max-w-xs text-center"
        >
          <h3 class="text-sm/6 font-semibold ">
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
                class="text-sm/6"
              >
                {{ l.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="items-center flex flex-col md:flex-row justify-around gap-4 border-t border-gray-200 py-6">
      <p class="text-sm/6 max-md:text-center">
        © {{ new Date().getFullYear() }} Aidan Hibbard. All rights reserved.
      </p>
      <div class="flex items-center justify-center space-x-4 text-sm/6 font-semibold md:justify-end">
        <NuxtLink href="/about#contact">
          Contact
        </NuxtLink>
        <div class="h-4 w-px bg-slate-200" />
        <NuxtLink
          href="github.com/aidanhibbard"
          external
        >
          GitHub
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
