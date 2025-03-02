<script setup lang="ts">
import { BriefcaseIcon } from '@heroicons/vue/24/solid'

// Placeholder for GitHub projects
const projects = [
  { name: "pg-nano", url: "https://github.com/yourusername/pg-nano" },
  { name: "Olallie", url: "https://github.com/yourusername/olallie" },
  { name: "Vike.js", url: "https://github.com/yourusername/vike.js" }
];
</script>

<template>
  <article class="prose-md lg:prose-lg mx-auto max-w-2xl px-6 pt-10 transition-all duration-300">
    <h1 class="text-3xl font-bold">I'm Aidan</h1>

    <div class="flex items-center space-x-2 mt-1">
      <BriefcaseIcon class="w-5 h-5 text-gray-700" />
      <p class="text-lg">I'm currently working at <span class="font-semibold">LegalNature</span></p>
    </div>

    <section class="mt-2">
      <h2 class="text-lg font-semibold">What I'm Working On</h2>
      <ul class="list-disc list-inside text-gray-700">
        <li v-for="project in projects" :key="project.name">
          <a :href="project.url" target="_blank" class="text-teal-600 hover:underline">
            {{ project.name }}
          </a>
        </li>
      </ul>
    </section>

    <section class="mt-4">
      <p class="text-gray-700">
        I'm passionate about building efficient, scalable, and maintainable software. I love working on open-source projects that solve real problems.
      </p>
      <p class="text-gray-700 mt-2">
        If you're interested in learning more about me or my work, feel free to explore further.
      </p>
    </section>

    <section class="mt-4">
      <h2 class="text-lg font-semibold">Building With</h2>
      <div class="flex flex-wrap gap-2 mt-2">
        <NuxtLink
          v-for="tech in ['Nuxt 3', 'Vue', 'JSX', 'React', 'Next.js', 'Rails', 'TypeScript', 'Vite', 'Tailwind', 'TypeOrm']"
          :key="tech"
          :to="`/article?tag=${tech.toLowerCase()}`"
          class="px-3 py-1 bg-gray-200 text-gray-800 rounded-full transition duration-300 hover:bg-teal-500 hover:text-white"
        >
          {{ tech }}
        </NuxtLink>
      </div>
    </section>

    <div class="mt-4 flex space-x-4">
      <NuxtLink to="/about" class="text-teal-600 font-medium hover:underline">Read more about me</NuxtLink>
      <NuxtLink to="/resume" class="text-teal-600 font-medium hover:underline">View my experience</NuxtLink>
    </div>
  </article>
</template>
