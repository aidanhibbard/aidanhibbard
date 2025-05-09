<script setup lang="ts">
interface Experience {
  companyRole: string;
  contractType?: string;
  period: string;
  location: string;
  description: string;
}

const experiences: Experience[] = [
  {
    companyRole: 'Senior Developer / Legal Nature',
    contractType: 'Contract',
    period: 'August 2024 - Present',
    location: 'Remote',
    description:
      'Developing features in an API-first architecture with Nuxt and Rails. Refactored applications for maintainability and test coverage. Led TypeScript adoption, introduced unit testing, and mentored developers on front-end best practices.',
  },
  {
    companyRole: 'Lead Developer / Central Oregon Community College',
    contractType: 'Contract',
    period: 'March 2025 - June 2025',
    location: 'Bend Oregon',
    description:
      `Developed schools first front end widgets using Vue and Tailwind. Created a UI to filter degrees, awards, and pathways using URL bound data so advisors could share with students. 
      Built a public facing chat service using oepnai with NitroJS and BullMQ for the backend to communicate with users over websockets.
      Helped introduce best practices, guidelines, testing, and CI to keep future development in check.
      Created a custom Vite build process to ensure generated files could be drag-and-dropped into the schools CMS.
      `,
  },
  {
    companyRole: 'Lead Developer / Ability Hub',
    contractType: 'Contract',
    period: 'September 2024 - April 2025',
    location: 'Remote',
    description:
      'Built a learning platform for climate regulations and sustainability resources using Nuxt and Tailwind. Implemented CI, testing architecture, Stripe payments, and an AI document search with OpenAI on DigitalOcean.',
  },
  {
    companyRole: 'Software Developer / RealPage',
    period: 'May 2022 - August 2024',
    location: 'Remote',
    description:
      'Built and maintained ETL pipelines between vendor CRMs and internal inventory with Rails. Developed real-time WebSocket services, optimized queries, and maintained Kubernetes-deployed microservices with pub/sub communication.',
  },
  {
    companyRole: 'Lead Developer / GreenT Climate',
    contractType: 'Contract',
    period: 'July 2023 - May 2024',
    location: 'Remote',
    description:
      'Developed data-processing services with NitroJS and BullMQ. Created interactive Nuxt + D3 dashboards, researched Energy Star integrations, built Postman collections, and managed Google Cloud infra.',
  },
];
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <h2 class="text-2xl font-semibold mb-6">
      Experience
    </h2>
    <ul class="relative border-l-2 border-gray-200 dark:border-gray-700">
      <li
        v-for="(exp, idx) in experiences"
        :key="idx"
        :class="['ml-6', idx < experiences.length - 1 ? 'mb-10' : '',]"
      >
        <!-- Pin -->
        <span
          class="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full
                 bg-blue-500 ring-8 ring-white dark:ring-gray-900"
        >
          <Icon
            name="mdi:code-braces"
            class="text-white"
          />
        </span>

        <!-- Title & Badge -->
        <h3 class="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
          {{ exp.companyRole }}
        </h3>

        <!-- Date & Location -->
        <time class="block mb-2 text-sm leading-none text-gray-500 dark:text-gray-400">
          {{ exp.period }}, {{ exp.location }}
          <template v-if="exp.contractType">
            <span
              class="ml-2 rounded bg-blue-100 px-2 py-0.5 text-sm font-medium text-blue-800"
            >
              {{ exp.contractType }}
            </span>
          </template>
        </time>

        <!-- Description -->
        <p class="text-gray-700 dark:text-gray-300">
          {{ exp.description }}
        </p>
      </li>
    </ul>
  </div>
</template>
