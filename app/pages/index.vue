<template>
  <UContainer>
    <article
      class="max-w-3xl mx-auto py-16 px-6 prose prose-lg space-y-6 dark:prose-invert"
    >
      <h1 class="text-5xl font-extrabold">Hi, I'm Aidan</h1>

      <p class="prose-xl">
        I'm passionate about building software that scales, and drives
        engagement.
      </p>

      <div
        class="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 mb-8"
      >
        <NuxtLink
          to="/articles"
          class="flex items-center text-teal-600 dark:text-teal-400 hover:underline"
        >
          Read my articles
          <Icon name="mdi:arrow-right" class="ml-2" />
        </NuxtLink>

        <NuxtLink
          to="/projects"
          class="flex items-center text-teal-600 dark:text-teal-400 hover:underline"
        >
          View my works
          <Icon name="mdi:arrow-right" class="ml-2" />
        </NuxtLink>

        <NuxtLink
          to="/talks"
          class="flex items-center text-teal-600 dark:text-teal-400 hover:underline"
        >
          See my talks
          <Icon name="mdi:arrow-right" class="ml-2" />
        </NuxtLink>
      </div>

      <!-- Divider -->
      <hr class="border-gray-300 dark:border-gray-600" >
      <p>
        I love working with tons of technologies, lately I've been using — Vue,
        Nuxt, React, TypeScript, Tailwind CSS, and Ruby on Rails. From crafting
        sleek, responsive UIs to architecting resilient backend services, I
        choose the right tool for the job and delight in exploring new
        frameworks and patterns that drive results.
      </p>
      <p>
        I believe in clean, maintainable code and developer experience:
        accessible interfaces, testing, and thoughtful documentation. By
        embracing open standards, progressive enhancement, and performance-first
        practices, I aim to build software that's not only powerful but
        inclusive and sustainable for years to come.
      </p>
    </article>
  </UContainer>
</template>
