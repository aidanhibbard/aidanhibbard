<script lang="ts" setup>
import { PresentationChartBarIcon, DocumentTextIcon, CodeBracketIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <section class="relative overflow-hidden bg-white dark:bg-gray-950">
    <!-- Background Gradient Enhancement -->
    <div class="absolute inset-0 bg-gradient-to-br antialiased from-teal-500 via-cyan-400 to-blue-600 dark:from-black dark:via-gray-800 dark:to-black opacity-30 pointer-events-none" />

    <!-- Main Container -->
    <div class="relative mx-auto max-w-6xl px-6 sm:px-12 lg:px-16 py-20">
      <div class="text-center space-y-6">
        <!-- Dynamic Intro -->
        <p class="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          I'm Aidan, a software developer passionate about creating elegant and high-performance applications.
          My expertise spans front-end and back-end technologies, ensuring seamless user experiences.
        </p>
      </div>

      <!-- Cards Section -->
      <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Latest Talk -->
        <div class="group relative p-8 rounded-xl bg-white dark:bg-gray-900 shadow-xl transition-transform transform hover:scale-105">
          <div class="absolute -top-5 -left-5 bg-teal-500 dark:bg-teal-400 p-4 rounded-full">
            <PresentationChartBarIcon class="h-8 w-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
            Latest Talk
          </h3>
        </div>

        <!-- Latest Article -->
        <div class="group relative p-8 rounded-xl bg-white dark:bg-gray-900 shadow-xl transition-transform transform hover:scale-105">
          <div class="absolute -top-5 -left-5 bg-blue-600 dark:bg-blue-400 p-4 rounded-full">
            <DocumentTextIcon class="h-8 w-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
            Latest Article
          </h3>
        </div>

        <!-- Latest Project -->
        <div class="group relative p-8 rounded-xl bg-white dark:bg-gray-900 shadow-xl transition-transform transform hover:scale-105">
          <div class="absolute -top-5 -left-5 bg-purple-600 dark:bg-purple-400 p-4 rounded-full">
            <CodeBracketIcon class="h-8 w-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
            Latest Project
          </h3>
        </div>
      </div>
    </div>
  </section>
</template>
