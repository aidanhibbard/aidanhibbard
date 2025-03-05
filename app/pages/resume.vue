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
  <div class="bg-white text-gray-900 p-8 max-w-4xl mx-auto space-y-12">
    <!-- Contact Info Section -->
    <section class="flex flex-col md:flex-row items-center justify-between mb-6">
      <div class="flex items-center space-x-4">
        <PhoneIcon class="h-6 w-6 text-gray-600" />
        <p class="text-sm text-gray-600">
          +1 555 555 5555
        </p>
      </div>
      <div class="flex items-center space-x-4">
        <EnvelopeIcon class="h-6 w-6 text-gray-600" />
        <p class="text-sm text-gray-600">
          aidan@example.com
        </p>
      </div>
      <div class="flex items-center space-x-4">
        <GitHubIcon class="h-6 w-6 text-gray-600" />
        <a
          href="https://github.com/yourusername"
          class="text-sm text-gray-600 hover:underline"
        >GitHub</a>
      </div>
      <div class="flex items-center space-x-4">
        <LinkedInIcon class="h-6 w-6 text-gray-600" />
        <a
          href="https://linkedin.com/in/yourusername"
          class="text-sm text-gray-600 hover:underline"
        >LinkedIn</a>
      </div>
    </section>

    <!-- Name and Summary -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Aidan Hibbard
      </h1>
      <div class="w-20 mx-auto border-t-2 border-gray-300 mb-6" />
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        A passionate software engineer with experience in frontend and backend development, specializing in Vue.js, Nuxt.js, and building scalable, user-centric web applications. I strive to create clean, efficient code and collaborate with teams to deliver seamless solutions.
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
          class="flex flex-col space-y-2"
        >
          <div class="flex items-center space-x-2">
            <BriefcaseIcon class="h-6 w-6 text-gray-600" />
            <h3 class="text-lg font-semibold text-gray-900">
              {{ w.company }}
            </h3>
          </div>
          <p class="text-sm text-gray-500">
            {{ w.role }} - <span class="text-gray-400">{{ w.period }}</span>
          </p>
          <p class="text-base text-gray-700">
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
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tech in techStack"
          :key="tech"
          class="px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-800"
        >
          {{ tech }}
        </span>
      </div>
    </section>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .contact-info {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
