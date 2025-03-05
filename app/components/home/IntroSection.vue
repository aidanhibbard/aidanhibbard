<script setup lang="ts">
import { BriefcaseIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <article class="prose lg:prose-lg mx-auto max-w-2xl px-6 pt-10 transition-all duration-300">
    <div class="flex items-center space-x-2 mt-1">
      <BriefcaseIcon class="w-5 h-5 text-gray-700" />
      <p class="text-lg">
        I'm currently working at <NuxtLink
          to="https://www.linkedin.com/company/legalnature/"
          external
          class="font-semibold"
        >LegalNature</NuxtLink>
      </p>
    </div>

    <section class="mt-4">
      <p class="text-gray-700">
        I'm passionate about building efficient, scalable, and maintainable software. I love working on open-source projects that solve real problems.
      </p>
      <p class="text-gray-700 mt-2">
        If you're interested in learning more about me or my work, feel free to explore further.
      </p>
      <div class="mt-4 flex space-x-4">
        <NuxtLink
          to="/about"
          class="text-teal-600 font-medium hover:underline no-underline"
        >Read more about me</NuxtLink>
        <NuxtLink
          to="/resume"
          class="text-teal-600 font-medium hover:underline no-underline"
        >View my experience</NuxtLink>
      </div>
    </section>

    <section class="mt-4">
      <h2 class="text-lg font-semibold">
        Building With
      </h2>
      <div class="flex flex-wrap gap-2 mt-2">
        <NuxtLink
          v-for="tech in ['Nuxt 3', 'Vue', 'JSX', 'React', 'Next.js', 'Rails', 'TypeScript', 'Vite', 'Tailwind', 'TypeOrm']"
          :key="tech"
          :to="`/projects?tag=${tech.toLowerCase()}`"
          class="px-3 no-underline py-1 bg-gray-200 text-gray-800 rounded-full transition duration-300 hover:bg-teal-500 hover:text-white"
        >
          {{ tech }}
        </NuxtLink>
      </div>
    </section>
  </article>
</template>
