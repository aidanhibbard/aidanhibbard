<script setup lang="ts">
import { motion } from 'motion-v'
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
      <ClientOnly>
        <motion.li
          v-for="(project, idx) in projects"
          :key="project.id"
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.5, delay: idx * 0.1 }"
        >
          <NuxtLink
            :href="project.link"
            external
            class="block"
          >
            <ProjectCard :project="project" />
          </NuxtLink>
        </motion.li>
      </ClientOnly>
    </ul>
  </LayoutPageContainer>
</template>
