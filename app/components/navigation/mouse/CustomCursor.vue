<script setup lang="ts">
const
  outerRef = ref<HTMLDivElement | null>(null),
  innerRef = ref<HTMLDivElement | null>(null),
  position = reactive({ x: 0, y: 0 }),
  targetPosition = reactive({ x: 0, y: 0 }),
  isPointer = ref(false),
  animationFrameId = ref<null | number>(null)

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor
}

const updateCursor = () => {
  position.x = lerp(position.x, targetPosition.x, 0.15)
  position.y = lerp(position.y, targetPosition.y, 0.15)

  const outer = outerRef.value
  const inner = innerRef.value

  if (outer && inner) {
    const scale = isPointer.value ? 1.5 : 1
    const innerScale = isPointer.value ? 0.5 : 1

    outer.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${scale})`
    inner.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${innerScale})`
  }

  animationFrameId.value = requestAnimationFrame(updateCursor)
}

const handleMouseMove = (e: MouseEvent) => {
  targetPosition.x = e.clientX
  targetPosition.y = e.clientY

  const target = e.target as HTMLElement | null
  if (target) {
    const style = window.getComputedStyle(target)
    isPointer.value = style.cursor === 'pointer' || target.tagName === 'BUTTON' || target.tagName === 'A'
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  animationFrameId.value = requestAnimationFrame(updateCursor)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  if (animationFrameId.value !== null) {
    cancelAnimationFrame(animationFrameId.value)
  }
})
</script>

<template>
  <Teleport to="body">
    <div>
      <div
        ref="outerRef"
        class="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference will-change-transform"
        :style="{ contain: 'layout style paint' }"
      >
        <div class="h-4 w-4 rounded-full border-2 border-white" />
      </div>
      <div
        ref="innerRef"
        class="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference will-change-transform"
        :style="{ contain: 'layout style paint' }"
      >
        <div class="h-2 w-2 rounded-full bg-white" />
      </div>
    </div>
  </Teleport>
</template>
