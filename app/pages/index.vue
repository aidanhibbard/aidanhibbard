<script setup lang="ts">
const { primaryNav } = useNavigation()

const blogPath = primaryNav.find(item => item.label === 'Blog')?.to ?? '/posts'
const aboutPath = primaryNav.find(item => item.label === 'About')?.to ?? '/about'
const resumePath = primaryNav.find(item => item.label === 'Resume')?.to ?? '/resume'

const {
  landing,
  currentRole,
  pastRoles,
  latestPosts,
  hasPosts,
} = useLandingContent()
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col">
    <LandingSectionsHero
      v-if="landing"
      :landing="landing"
      :blog-path="blogPath"
      :resume-path="resumePath"
    />

    <LandingSectionsLatestWriting
      v-if="landing"
      :blog-path="blogPath"
      :landing="landing"
      :posts="latestPosts"
      :has-posts="hasPosts"
    />

    <LandingSectionsAbout
      v-if="landing"
      :about-path="aboutPath"
      :landing="landing"
    />

    <LandingSectionsResume
      v-if="currentRole"
      :current-role="currentRole"
      :past-roles="pastRoles"
      :resume-path="resumePath"
    />
  </div>
</template>
