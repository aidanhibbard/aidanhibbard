<script setup lang="ts">
const { primaryNav } = useNavigation()

const blogPath = primaryNav.find(item => item.label === 'Blog')?.to ?? '/posts'
const aboutPath = primaryNav.find(item => item.label === 'About')?.to ?? '/about'
const resumePath = primaryNav.find(item => item.label === 'Resume')?.to ?? '/resume'

const {
  landing,
  currentRole,
  pastRoles,
  featuredPost,
  sidebarPosts,
  hasPosts,
} = useLandingContent()
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col">
    <LanderSectionsHero
      v-if="landing"
      :landing="landing"
    />

    <LanderSectionsLatestWriting
      v-if="landing"
      :blog-path="blogPath"
      :landing="landing"
      :featured-post="featuredPost"
      :sidebar-posts="sidebarPosts"
      :has-posts="hasPosts"
    />

    <LanderSectionsAbout
      v-if="landing"
      :about-path="aboutPath"
      :landing="landing"
    />

    <LanderSectionsResume
      v-if="currentRole"
      :current-role="currentRole"
      :past-roles="pastRoles"
      :resume-path="resumePath"
    />
  </div>
</template>
