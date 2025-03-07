<script setup lang="ts">
import { BriefcaseIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="container mx-auto px-6 pt-16">
    <div class="lg:flex justify-between gap-10">
      <!-- Left Section (Current Content) -->
      <div class="flex-1 flex flex-col justify-center items-start">
        <h2 class="prose text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-500 to-pink-500 animate-gradient-x">
          Hi, I'm Aidan
        </h2>

        <article class="prose lg:prose-lg mx-auto max-w-2xl mt-10 dark:text-gray-200">
          <div class="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <BriefcaseIcon class="w-5 h-5" />
            <p class="text-lg">
              Currently working at
              <NuxtLink
                to="https://www.linkedin.com/company/legalnature/"
                external
                class="font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 transition"
              >
                LegalNature
              </NuxtLink>
            </p>
          </div>

          <section class="mt-4 text-gray-700 dark:text-[#eeeeee]">
            <p>
              I'm passionate about building efficient, scalable, and maintainable software. I love working on open-source projects that solve real problems.
            </p>
            <p class="mt-2">
              If you're interested in learning more about me or my work, feel free to explore further.
            </p>
            <div class="mt-4 flex space-x-4">
              <NuxtLink
                to="/resume"
                class="text-teal-600 font-medium hover:underline no-underline dark:text-teal-400 dark:hover:text-teal-300 transition"
              >
                View my experience
              </NuxtLink>
            </div>
          </section>

          <section class="mt-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Building With
            </h3>
            <div class="flex flex-wrap gap-2 mt-2">
              <NuxtLink
                v-for="tech in ['Nuxt', 'Vue', 'JSX', 'Nest.js', 'Next.js', 'Rails', 'TypeScript', 'Vite', 'Tailwind']"
                :key="tech"
                :to="`/projects?tag=${tech.toLowerCase()}`"
                class="px-3 py-1 bg-gray-200 text-gray-800 rounded-full transition duration-300 hover:bg-teal-500 hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-teal-600 dark:hover:text-white"
              >
                {{ tech }}
              </NuxtLink>
            </div>
          </section>
        </article>
      </div>

      <!-- Right Section (New Section) -->
      <div class="lg:w-1/3 mt-10 lg:mt-0">
        <!-- You can add your new content here -->
        <section class="p-6 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-white">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            New Section Title
          </h3>
          <p class="mt-2">
            This is a new section that will appear on the right side of the screen. On smaller screens, this section will appear below the content.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
