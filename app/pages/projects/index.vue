<script setup lang="ts">
import ProjectCard from '~/components/projects/ProjectCard.vue'

const { data: projects } = await useAsyncData(
  'projects-index',
  () => {
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
      .all()
  },
)
</script>

<template>
  <LayoutPageContainer id="projects">
    <div class="container mx-auto max-w-5xl">
      <h2 class="font-serif text-4xl md:text-5xl font-bold mb-4">
        Side Projects
      </h2>
      <p class="text-muted-foreground text-lg mb-12">
        How many is too many?
      </p>
    </div>

    <ul
      v-if="projects?.length"
      class="container mx-auto max-w-5xl grid gap-8 md:grid-cols-2"
    >
      <li
        v-for="project in projects"
        :key="project.id"
      >
        <ProjectCard :project="project" />
      </li>
    </ul>
  </LayoutPageContainer>
</template>
