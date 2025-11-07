<script setup lang="ts">
// Deterministic pseudo-random to avoid hydration mismatch while breaking uniform patterns
const pseudoRandom = (seed: number): number => {
  const x = Math.sin(seed * 78.233) * 43758.5453123
  return x - Math.floor(x)
}

const horizontalLines = Array.from({ length: 15 }, (_, i) => {
  // Base layout
  const baseTop = 5 + i * 6.5
  // Jitter position within ±1.2% of viewport height
  const topJitter = (pseudoRandom(101 + i) - 0.5) * 2.4
  // Stagger with slight randomization to avoid phasing
  const delay = i * 0.6 + pseudoRandom(201 + i) * 0.9
  // Diverse durations ~7–13s
  const duration = 7 + pseudoRandom(301 + i) * 6
  // Random color index 1..3
  const colorIndex = (Math.floor(pseudoRandom(401 + i) * 3) % 3) + 1
  return {
    id: `h-${i}`,
    position: baseTop + topJitter,
    delay,
    duration,
    colorIndex,
  }
})

const verticalLines = Array.from({ length: 12 }, (_, i) => {
  const baseLeft = 8 + i * 7.5
  const leftJitter = (pseudoRandom(501 + i) - 0.5) * 2.4
  const delay = i * 0.9 + pseudoRandom(601 + i) * 1.1
  const duration = 7.5 + pseudoRandom(701 + i) * 6.5
  const colorIndex = (Math.floor(pseudoRandom(801 + i) * 3) % 3) + 1
  return {
    id: `v-${i}`,
    position: baseLeft + leftJitter,
    delay,
    duration,
    colorIndex,
  }
})
</script>

<template>
  <!-- eslint-disable vue/max-attributes-per-line -->
  <div
    class="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    <div class="absolute inset-0 grid-background">
      <svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              stroke-width="0.5"
              class="text-border/40"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>

    <div class="absolute inset-0 pulse-lines">
      <div
        v-for="line in horizontalLines"
        :key="line.id"
        class="pulse-line"
        :style="{
          top: `${line.position}%`,
          animationDelay: `${line.delay}s`,
          animationDuration: `${line.duration}s`,
          background: `linear-gradient(90deg, transparent 0%, var(--pulse-color-${line.colorIndex}) 50%, transparent 100%)`,
        }"
      />

      <div
        v-for="line in verticalLines"
        :key="line.id"
        class="pulse-line-vertical"
        :style="{
          left: `${line.position}%`,
          animationDelay: `${line.delay}s`,
          animationDuration: `${line.duration}s`,
          background: `linear-gradient(180deg, transparent 0%, var(--pulse-color-${line.colorIndex}) 50%, transparent 100%)`,
        }"
      />
    </div>
  </div>
</template>
