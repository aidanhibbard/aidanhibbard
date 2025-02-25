<script setup lang="ts">
import { BriefcaseIcon } from '@heroicons/vue/20/solid'

const workHistory = [
  {
    company: 'LegalNature',
    role: 'Senior Software Engineer',
    period: 'Aug 2024 - Present',
    type: 'Full-Time',
    links: [],
    description: '',
  },
  {
    company: 'Ability Hub',
    role: 'Lead Developer',
    period: 'Oct 2024 - Present',
    type: 'Contract',
    links: [],
    description: '',
  },
  {
    company: 'Climate Art Collection',
    role: 'Lead Developer',
    period: 'Jun 2024 - Present',
    type: 'Contract',
    links: [],
    description: '',
  },
  {
    company: 'G5 / RealPage',
    role: 'Software Developer',
    period: 'Dec 2020 - Aug 2024',
    type: 'Full-Time',
    links: [],
    description: '',
  },
]

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/yourusername' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
  { name: 'Instagram', url: 'https://instagram.com/yourusername' },
]

const techStack = [
  'Vue.js', 'Nuxt.js', 'TypeScript', 'Tailwind CSS', 'Ruby on Rails',
  'PostgreSQL', 'Google Cloud', 'Docker', 'CI/CD', 'Three.js',
]
</script>

<template>
  <div class="bg-white text-gray-900 p-8 max-w-4xl mx-auto space-y-12">
    <div class="text-center space-y-4">
      <p class="text-lg text-gray-600">
        Developer | UI Enthusiast
      </p>
    </div>

    <!-- Work History -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Work History
      </h2>
      <ol class="relative border-s dark:border-gray-700 flex flex-col gap-y-4">
        <li
          v-for="w in workHistory"
          :key="w.company"
          class="ms-6"
        >
          <span class="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -start-3 ring-2 ring-black">
            <BriefcaseIcon />
          </span>
          <div class="flex flex-col p-4 bg-white border border-gray-200 rounded-lg shadow-xs dark:bg-gray-700 dark:border-gray-600">
            <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              {{ w.company }}
            </h3>
            <time class="block mb-2 text-sm font-normal leading-none text-[#eeeeee]">{{ w.period }}</time>
            <p class="text-base font-normal text-gray-500 dark:text-gray-400">
              {{ w.type }}
            </p>
            <p class="text-base font-normal text-gray-500 dark:text-gray-400">
              {{ w.description }}
            </p>
          </div>
        </li>
      </ol>
    </section>

    <!-- Social Links -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Personal Links
      </h2>
      <div class="flex flex-wrap gap-4">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all text-lg font-medium"
        >
          {{ link.name }}
        </a>
      </div>
    </section>

    <!-- Tech Stack -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Tech Stack
      </h2>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tech in techStack"
          :key="tech"
          class="px-3 py-1 text-sm bg-gray-200 rounded-full"
        >
          {{ tech }}
        </span>
      </div>
    </section>
  </div>
</template>
