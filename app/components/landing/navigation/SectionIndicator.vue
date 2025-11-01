<script setup lang="ts">
import { motion } from 'motion-v'

const sections = ['hero', 'about', 'articles', 'resume'] as const
const activeSection = ref(0)

const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight / 2

  sections.forEach((section, index) => {
    const element = document.getElementById(section)
    if (!element)
      return

    const { offsetTop, offsetHeight } = element
    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight)
      activeSection.value = index
  })
}

const scrollToSection = (index: number) => {
  const id = sections[index]
  if (!id)
    return

  const element = document.getElementById(id)
  if (element)
    element.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-40">
    <button
      v-for="(_, index) in sections"
      :key="index"
      type="button"
      class="relative w-1 h-12 bg-border rounded-full overflow-hidden group"
      aria-hidden="false"
      @click="scrollToSection(index)"
    >
      <motion.div
        class="absolute inset-0 bg-foreground rounded-full"
        :initial="{ height: '0%' }"
        :animate="{ height: activeSection === index ? '100%' : '0%' }"
        :transition="{ duration: 0.3 }"
      />
      <span class="sr-only">Go to section {{ index + 1 }}</span>
    </button>
  </div>
</template>
