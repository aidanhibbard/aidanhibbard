<script setup lang="ts">
interface Project {
  id: number;
  title: string;
  subtitle: string;
  link: string;
  visitText: string;
  image: string;
}

// demo data
const projects = ref<Project[]>([
  {
    id: 1,
    title: "US Historical Wilfire Map",
    subtitle:
      "A map built with D3 showing the boundries of fires sourced from the NIFC. Data processed using ogr2ogr and topojson-server. Dashboard built with Vue and PrimeVue.",
    link: "https://github.com/AidanHibbard/historical-oregon-fires",
    visitText: 'View the writeup on GitHub',
    image: 'https://raw.githubusercontent.com/AidanHibbard/historical-oregon-fires/main/image.png'
  },
  {
    id: 2,
    title: "Olallie",
    subtitle:
      "TypeSafe state mechanism for framework-less projects to use for simple reactivity.",
    link: "https://github.com/AidanHibbard/Olallie/",
    visitText: 'View the writeup on GitHub',
    image: '/images/projects/olallie.png'
  },
  {
    id: 3,
    title: "ElevationTool",
    subtitle:
      "A dashboard using Google Maps to display the elevation change along a given trail, road, or feature.",
    link: "https://github.com/AidanHibbard/Olallie/",
    visitText: 'View the writeup on GitHub',
    image: '/images/projects/olallie.png'
  },
]);
</script>

<template>
  <UContainer class="my-4">
    <!-- Header -->
    <section class="text-center my-12">
      <h1 class="text-5xl font-extrabold">My Projects</h1>
      <p class="mt-2 text-lg text-gray-600 dark:text-gray-300">
        A collection of everything from utilities to dashboards.
      </p>
    </section>

    <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
      <NuxtLink
        v-for="p in projects"
        :key="p.id"
        :to="p.link"
        class="block border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-colors"
        external
      >
        <NuxtImg
          :src="p.image"
          width="100%"
          :alt="p.title"
          loading="lazy"
        />
        <div class="flex flex-col p-4">
          <div class="flex-1">
            <div class="flex-1 flex flex-col">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex-1">
                {{ p.title }}
              </h2>
              <p class="mt-2 text-base leading-relaxed text-gray-600 dark:text-gray-400 flex-1">
                {{ p.subtitle }}
              </p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </UContainer>
</template>
