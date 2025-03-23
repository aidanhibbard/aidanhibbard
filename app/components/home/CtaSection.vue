<script lang="ts" setup>
import { PresentationChartBarIcon, DocumentTextIcon, CodeBracketIcon } from '@heroicons/vue/24/solid';
</script>

<template>
  <section class="relative overflow-hidden bg-white dark:bg-black">
    <!-- Enhanced Background Gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-teal-500 via-cyan-400 to-blue-600 dark:from-gray-900 dark:via-gray-800 dark:to-black opacity-30 pointer-events-none"></div>
    
    <!-- Glass Effect Container (Full Width) -->
    <div class="relative w-full backdrop-blur-xl bg-white/10 dark:bg-black/40 shadow-xl ring-1 ring-white/20 dark:ring-black/50 py-16 px-0 lg:px-24">
      <div class="max-w-5xl mx-auto text-center">
        <!-- Intro Header -->
        <h1 class="text-5xl font-extrabold text-gray-900 dark:text-white">
          Hi, I'm Aidan
        </h1>
        <p class="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Welcome to my portfolio. Explore my talks, articles, and projects.
        </p>

        <!-- CTA Section -->
        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- Latest Talk -->
          <div class="max-w-md mx-auto p-6 rounded-xl bg-white/30 dark:bg-black/30 transition duration-300 hover:bg-white/50 dark:hover:bg-black/50 shadow-lg">
            <div class="flex items-center justify-center gap-3">
              <PresentationChartBarIcon class="h-8 w-8 text-teal-600 dark:text-teal-400" />
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Latest Talk</h3>
            </div>
            <p class="mt-2 text-gray-800 dark:text-gray-200">
              Catch up on my most recent talk. Inspiring ideas and engaging insights.
            </p>
          </div>

          <!-- Latest Article -->
          <div class="max-w-md mx-auto p-6 rounded-xl bg-white/30 dark:bg-black/30 transition duration-300 hover:bg-white/50 dark:hover:bg-black/50 shadow-lg">
            <div class="flex items-center justify-center gap-3">
              <DocumentTextIcon class="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Latest Article</h3>
            </div>
            <p class="mt-2 text-gray-800 dark:text-gray-200">
              Read my newest article on web development and innovative design techniques.
            </p>
          </div>

          <!-- Latest Project -->
          <div class="max-w-md mx-auto p-6 rounded-xl bg-white/30 dark:bg-black/30 transition duration-300 hover:bg-white/50 dark:hover:bg-black/50 shadow-lg">
            <div class="flex items-center justify-center gap-3">
              <CodeBracketIcon class="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Latest Project</h3>
            </div>
            <p class="mt-2 text-gray-800 dark:text-gray-200">
              Explore my latest project showcasing innovative tech and creative design.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
