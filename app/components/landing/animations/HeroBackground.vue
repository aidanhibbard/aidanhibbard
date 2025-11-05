<script setup lang="ts">
const horizontalLines = Array.from({ length: 15 }, (_, i) => ({
  id: `h-${i}`,
  position: 5 + i * 6.5, // Spread across the viewport
  delay: i * 0.8,
  duration: 8 + (i % 5),
  colorIndex: (i % 3) + 1,
}))

const verticalLines = Array.from({ length: 12 }, (_, i) => ({
  id: `v-${i}`,
  position: 8 + i * 7.5, // Spread across the viewport
  delay: i * 1.2,
  duration: 9 + (i % 4),
  colorIndex: (i % 3) + 1,
}))
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
