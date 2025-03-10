<script setup lang="ts">
import { BriefcaseIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="container mx-auto px-6 pt-16">
    <div class="lg:flex justify-between gap-10">
      <div class="flex-1 flex flex-col justify-center items-start">
        <h2
          class="prose mx-auto text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-500 to-pink-500 animate-gradient-x text-center sm:text-left"
        >
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

          <section class="prose-lg lg:prose-xl transition-all duration-300 mt-4 text-gray-700 dark:text-[#eeeeee]">
            <p>
              I'm passionate about building efficient, scalable, and maintainable software. I love working on open-source projects that solve real problems.
            </p>
            <p class="mt-2">
              Focusing on data driven solutions, climate impact, and building accessible interfaces.
            </p>
            <div class="mt-4 flex space-x-4">
              <NuxtLink
                to="/resume"
                class="text-teal-600 font-medium hover:underline no-underline dark:text-teal-400 dark:hover:text-teal-300 transition"
              >
                View my experience
              </NuxtLink>
              <NuxtLink
                to="/resume"
                class="text-teal-600 font-medium hover:underline no-underline dark:text-teal-400 dark:hover:text-teal-300 transition"
              >
                Read my articles
              </NuxtLink>
              <NuxtLink
                to="/resume"
                class="text-teal-600 font-medium hover:underline no-underline dark:text-teal-400 dark:hover:text-teal-300 transition"
              >
                View my projects
              </NuxtLink>
            </div>
          </section>
        </article>
      </div>

      <div class="lg:w-1/3 mt-10 lg:mt-0">
        <section class="p-6 h-full">
          <div class="flex flex-col items-center space-y-6">
            <h3 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Find me online
            </h3>
            <div class="flex space-x-8">
              <NuxtLink
                to="https://www.linkedin.com/in/aidan-hibbard"
                target="_blank"
                external
                class="text-gray-700 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition duration-300 transform hover:scale-125"
                aria-label="LinkedIn"
              >
                <Icon
                  name="mdi:linkedin"
                  size="48"
                />
              </NuxtLink>
              <a
                href="https://github.com/aidanhibbard"
                target="_blank"
                class="text-gray-700 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition duration-300 transform hover:scale-125"
                aria-label="GitHub"
              >
                <Icon
                  name="mdi:github"
                  size="48"
                />
              </a>
              <a
                href="https://www.instagram.com/aidan_hibbard"
                target="_blank"
                class="text-gray-700 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition duration-300 transform hover:scale-125"
                aria-label="Instagram"
              >
                <Icon
                  name="mdi:instagram"
                  size="48"
                />
              </a>
              <a
                href="https://codepen.io/aidanhibbard"
                target="_blank"
                class="text-gray-700 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition duration-300 transform hover:scale-125"
                aria-label="CodePen"
              >
                <Icon
                  name="mdi:codepen"
                  size="48"
                />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
