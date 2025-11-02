<script setup lang="ts">
import { Separator } from '~/shadcn/components/ui/separator'
import SectionIndicator from '~/components/landing/navigation/SectionIndicator.vue'

onMounted(() => {
  document.documentElement.style.scrollBehavior = 'smooth'
})
</script>

<template>
  <div class="relative">
    <SectionIndicator />

    <LandingSectionsHeroSection />

    <div class="container mx-auto px-4">
      <Separator />
    </div>

    <LandingSectionsAboutSection />

    <div class="container mx-auto px-4">
      <Separator />
    </div>

    <LandingSectionsArticlesSection />

    <div class="container mx-auto px-4">
      <Separator />
    </div>

    <LandingSectionsResumeSection />
  </div>
</template>
