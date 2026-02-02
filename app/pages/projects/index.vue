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
        'image',
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
