<script setup lang="ts">
import {
  ArrowRight,
} from 'lucide-vue-next'

const { data: projects } = await useAsyncData(
  'projects-landing',
  async () => {
    return queryCollection('projects')
      .order('date', 'DESC')
      .select(
        'date',
        'description',
        'id',
        'link',
        'stem',
        'tags',
        'title',
      )
      .limit(4)
      .all()
  },
)
</script>

<template>
  <section
    id="projects"
    class="py-24 px-4 md:px-16"
  >
    <div class="container mx-auto max-w-5xl">
      <div>
        <h2 class="font-serif text-4xl md:text-5xl font-bold mb-4">
          Side Projects
        </h2>
        <p class="text-muted-foreground text-lg mb-12">
          How many is too many?
        </p>

        <ul
          v-if="projects?.length"
          class="container mx-auto max-w-5xl grid gap-8 md:grid-cols-2"
        >
          <li
            v-for="project in projects"
            :key="project.id"
          >
            <ProjectsProjectCard :project="project" />
          </li>
        </ul>

        <div class="mt-12 flex justify-center">
          <NuxtLink
            to="/projects"
            class="group inline-flex items-center gap-2 text-lg font-medium hover:text-foreground transition-colors"
          >
            View all projects
            <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
