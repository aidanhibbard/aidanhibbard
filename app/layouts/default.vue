<script setup lang="ts">
import AppHeader from '@/components/navigation/header/AppHeader.vue'
import CustomCursor from '~/components/navigation/mouse/CustomCursor.vue'

const svgGrain = '<svg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'noiseFilter\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(#noiseFilter)\'/></svg>'
const grainStyle = {
  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgGrain)}")`,
  mixBlendMode: 'overlay',
} as const

const { pageBackgroundStyle } = useTheme()
</script>

<template>
  <div :style="pageBackgroundStyle">
    <div
      class="pointer-events-none fixed inset-0 z-40 opacity-[0.08]"
      :style="grainStyle"
    />
    <CustomCursor />
    <AppHeader />
    <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
      <slot />
    </main>
  </div>
</template>
