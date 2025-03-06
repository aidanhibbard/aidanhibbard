<script setup lang="ts">
import { BriefcaseIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/solid'

const workHistory = [
  {
    company: 'LegalNature',
    role: 'Senior Software Engineer',
    period: 'Aug 2024 - Present',
    type: 'Full-Time',
    description: 'Worked on building scalable software solutions for legal services.',
  },
  {
    company: 'Ability Hub',
    role: 'Lead Developer',
    period: 'Oct 2024 - Present',
    type: 'Contract',
    description: 'Led the development of web applications for accessibility tools.',
  },
  {
    company: 'Climate Art Collection',
    role: 'Lead Developer',
    period: 'Jun 2024 - Present',
    type: 'Contract',
    description: 'Created web-based applications for managing art collections and sustainability projects.',
  },
  {
    company: 'G5 / RealPage',
    role: 'Software Developer',
    period: 'Dec 2020 - Aug 2024',
    type: 'Full-Time',
    description: 'Developed real estate marketing solutions and optimized backend systems.',
  },
]

const techStack = [
  'Vue.js', 'Nuxt.js', 'TypeScript', 'Tailwind CSS', 'Ruby on Rails',
  'PostgreSQL', 'Google Cloud', 'Docker', 'CI/CD', 'Three.js',
]
</script>

<template>
  <div class="p-8 max-w-4xl mx-auto space-y-12 text-gray-900 dark:text-gray-100">
    <!-- Contact Info Section -->
    <section class="flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center space-x-4">
        <PhoneIcon class="h-6 w-6 text-teal-500" />
        <p class="text-sm text-gray-600 dark:text-gray-300">
          +1 555 555 5555
        </p>
      </div>
      <div class="flex items-center space-x-4">
        <EnvelopeIcon class="h-6 w-6 text-teal-500" />
        <p class="text-sm text-gray-600 dark:text-gray-300">
          aidan@example.com
        </p>
      </div>
      <div class="flex items-center space-x-4">
        <GitHubIcon class="h-6 w-6 text-teal-500" />
        <a
          href="https://github.com/yourusername"
          class="text-sm text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300"
        >GitHub</a>
      </div>
      <div class="flex items-center space-x-4">
        <LinkedInIcon class="h-6 w-6 text-teal-500" />
        <a
          href="https://linkedin.com/in/yourusername"
          class="text-sm text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300"
        >LinkedIn</a>
      </div>
    </section>

    <!-- Name and Summary -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Aidan Hibbard
      </h1>
      <div class="w-20 mx-auto border-t-2 border-gray-300 dark:border-gray-700 mb-6 transition-all duration-300" />
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
        A passionate software engineer with experience in frontend and backend development, specializing in Vue.js, Nuxt.js, and building scalable, user-centric web applications.
      </p>
    </div>

    <!-- Work History Section -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Work History
      </h2>
      <ol class="space-y-6">
        <li
          v-for="w in workHistory"
          :key="w.company"
          class="flex flex-col space-y-2 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition-all duration-300"
        >
          <div class="flex items-center space-x-2">
            <BriefcaseIcon class="h-6 w-6 text-teal-500" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {{ w.company }}
            </h3>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ w.role }} - <span class="text-gray-400 dark:text-gray-500">{{ w.period }}</span>
          </p>
          <p class="text-base text-gray-700 dark:text-gray-300">
            {{ w.description }}
          </p>
        </li>
      </ol>
    </section>

    <!-- Tech Stack Section -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Tech Stack
      </h2>
      <div class="flex flex-wrap gap-3">
        <span
          v-for="tech in techStack"
          :key="tech"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-800 dark:text-gray-200 
                 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-400 dark:hover:text-gray-900 transition-colors duration-300"
        >
          {{ tech }}
        </span>
      </div>
    </section>
  </div>
</template>
