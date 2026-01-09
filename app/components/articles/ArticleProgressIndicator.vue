<script setup lang="ts">
import { motion } from 'motion-v'

const props = defineProps<{
  target?: HTMLElement | null
  headingsSelector?: string
}>()

const headingsSelector = computed(() => props.headingsSelector ?? 'h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]')

const progress = ref(0) // 0..1
const progressPercent = computed(() => Math.round(progress.value * 100))

let markerYs: number[] = []
let rafUpdate = 0
let rafRebuild = 0
let resizeObserver: ResizeObserver | null = null

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

const getHeaderOffsetPx = () => {
  const header = document.querySelector('header')
  return header instanceof HTMLElement ? header.offsetHeight : 64
}

const rebuildMarkers = () => {
  const el = props.target
  if (!el) {
    markerYs = []
    progress.value = 0
    return
  }

  const rect = el.getBoundingClientRect()
  const top = rect.top + window.scrollY
  const bottom = top + rect.height

  const headings = Array
    .from(el.querySelectorAll(headingsSelector.value))
    .filter((node): node is HTMLElement => node instanceof HTMLElement)

  const headingYs = headings.map(h => h.getBoundingClientRect().top + window.scrollY)

  const all = [top, ...headingYs, bottom]
    .filter(Number.isFinite)
    .sort((a, b) => a - b)

  const unique: number[] = []
  for (const y of all) {
    const prev = unique.at(-1)
    // Avoid 0-length segments (multiple headings can land on the same y)
    if (prev === undefined || Math.abs(y - prev) > 2)
      unique.push(y)
  }

  markerYs = unique.length >= 2 ? unique : [top, bottom]

  updateProgress()
}

const updateProgress = () => {
  if (markerYs.length < 2) {
    progress.value = 0
    return
  }

  const headerPx = getHeaderOffsetPx() + 8
  const rawReadY = window.scrollY + headerPx

  const start = markerYs[0]!
  const endRaw = markerYs.at(-1)!
  // We can never scroll the "reading line" (below the fixed header) all the way to the true end
  // of the article. Instead, treat "100%" as the point where the article bottom has reached the
  // bottom of the viewport.
  const visibleBelowReadLine = Math.max(0, window.innerHeight - headerPx)
  const end = endRaw - visibleBelowReadLine

  // If the article is shorter than the viewport, just consider it complete once the bottom is visible.
  if (end <= start) {
    const viewportBottom = window.scrollY + window.innerHeight
    progress.value = viewportBottom >= endRaw ? 1 : 0
    return
  }

  const readY = Math.min(rawReadY, end)
  const effectiveMarkers = markerYs.map(y => Math.min(y, end))
  const uniqueMarkers: number[] = []
  for (const y of effectiveMarkers) {
    const prev = uniqueMarkers.at(-1)
    // Avoid 0-length segments after clamping (headings near the bottom can collapse into the end)
    if (prev === undefined || Math.abs(y - prev) > 2)
      uniqueMarkers.push(y)
  }

  if (uniqueMarkers.length < 2) {
    progress.value = 1
    return
  }

  const effectiveStart = uniqueMarkers[0]!
  const effectiveEnd = uniqueMarkers.at(-1)!

  if (readY <= effectiveStart) {
    progress.value = 0
    return
  }

  if (readY >= effectiveEnd) {
    progress.value = 1
    return
  }

  const segments = uniqueMarkers.length - 1

  // Binary search for segment where markerYs[i] <= readY < markerYs[i+1]
  let lo = 0
  let hi = uniqueMarkers.length - 2
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    const a = uniqueMarkers[mid]!
    const b = uniqueMarkers[mid + 1]!

    if (readY < a) {
      hi = mid - 1
      continue
    }

    if (readY >= b) {
      lo = mid + 1
      continue
    }

    const span = b - a
    const t = span > 0 ? (readY - a) / span : 0
    progress.value = clamp01((mid + t) / segments)
    return
  }

  // Fallback (should be rare)
  progress.value = clamp01((readY - effectiveStart) / (effectiveEnd - effectiveStart))
}

const scheduleUpdate = () => {
  if (rafUpdate)
    return
  rafUpdate = window.requestAnimationFrame(() => {
    rafUpdate = 0
    updateProgress()
  })
}

const scheduleRebuild = () => {
  if (rafRebuild)
    return
  rafRebuild = window.requestAnimationFrame(() => {
    rafRebuild = 0
    rebuildMarkers()
  })
}

onMounted(() => {
  window.addEventListener('scroll', scheduleUpdate, { passive: true })
  window.addEventListener('resize', scheduleRebuild, { passive: true })

  if ('ResizeObserver' in window)
    resizeObserver = new ResizeObserver(() => scheduleRebuild())

  nextTick(() => {
    rebuildMarkers()

    if (props.target && resizeObserver)
      resizeObserver.observe(props.target)
  })
})

watch(
  () => props.target,
  (nextEl, prevEl) => {
    if (!resizeObserver && nextEl && import.meta.client && 'ResizeObserver' in window)
      resizeObserver = new ResizeObserver(() => scheduleRebuild())

    if (resizeObserver && prevEl)
      resizeObserver.unobserve(prevEl)
    if (resizeObserver && nextEl)
      resizeObserver.observe(nextEl)

    if (import.meta.client) {
      nextTick(() => {
        rebuildMarkers()
      })
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scheduleUpdate)
  window.removeEventListener('resize', scheduleRebuild)

  if (rafUpdate)
    window.cancelAnimationFrame(rafUpdate)
  if (rafRebuild)
    window.cancelAnimationFrame(rafRebuild)

  resizeObserver?.disconnect()
  resizeObserver = null
})
</script>

<template>
  <!-- Desktop: right-side vertical progress -->
  <div class="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3">
    <div class="relative w-1.5 h-44 bg-border rounded-full overflow-hidden">
      <motion.div
        class="absolute inset-x-0 top-0 bg-foreground rounded-full"
        :initial="{ height: '0%' }"
        :animate="{ height: `${progressPercent}%` }"
        :transition="{ duration: 0.25 }"
      />
    </div>
  </div>

  <!-- Mobile: sticky-under-header horizontal progress -->
  <div class="md:hidden fixed top-16 left-0 right-0 z-40 bg-background/60 backdrop-blur-md border-b border-border">
    <div class="container mx-auto max-w-3xl px-4 py-2 flex items-center gap-3">
      <div class="relative h-1.5 flex-1 bg-border rounded-full overflow-hidden">
        <motion.div
          class="absolute inset-y-0 left-0 bg-foreground rounded-full"
          :initial="{ width: '0%' }"
          :animate="{ width: `${progressPercent}%` }"
          :transition="{ duration: 0.25 }"
        />
      </div>
    </div>
  </div>
</template>
