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

    <LandingSectionsBlogSection />

    <div class="container mx-auto px-4">
      <Separator />
    </div>

    <LandingSectionsResumeSection />

    <!-- Footer -->
    <footer class="py-12 px-4 border-t border-border">
      <div class="container mx-auto text-center text-sm text-muted-foreground">
        <p>© 2025 Aidan Hibbard. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
