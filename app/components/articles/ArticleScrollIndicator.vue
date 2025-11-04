<script setup lang="ts">
import { motion } from 'motion-v'

const progress = ref(0)

function computeProgress(): number {
  if (typeof window === 'undefined')
    return 0

  const doc = document.documentElement
  const scrollTop = window.pageYOffset || doc.scrollTop || 0
  const docHeight = doc.scrollHeight
  const winHeight = window.innerHeight
  const max = Math.max(1, docHeight - winHeight)
  const ratio = Math.min(1, Math.max(0, scrollTop / max))
  return Math.round(ratio * 100)
}

function onScroll() {
  progress.value = computeProgress()
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  progress.value = computeProgress()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div class="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-40">
    <div
      class="relative w-1 h-48 bg-border rounded-full overflow-hidden"
      aria-hidden="false"
    >
      <motion.div
        class="absolute bottom-0 left-0 right-0 bg-foreground rounded-full"
        :initial="{ height: '0%' }"
        :animate="{ height: `${progress}%` }"
        :transition="{ duration: 0.2 }"
      />
      <span class="sr-only">Scroll progress {{ progress }} percent</span>
    </div>
  </div>
</template>
