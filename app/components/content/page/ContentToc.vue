<script setup lang="ts">
import type { TocLink } from '@nuxtjs/mdc'
import { cn } from '@/lib/utils'
import { flattenContentTocLinks } from '@/utils/flatten-content-toc-links'

const props = defineProps<{
  links: TocLink[]
}>()

const route = useRoute()
const activeId = ref('')
const flatLinks = computed(() => flattenContentTocLinks(props.links))

const scrollOffset = 112

let stopObserver = (): void => {}

const syncActiveFromScroll = (): void => {
  const headings = flatLinks.value
    .map(link => document.getElementById(link.id))
    .filter((element): element is HTMLElement => element !== null)

  if (headings.length === 0) {
    return
  }

  let current = headings[0]!.id

  for (const heading of headings) {
    if (heading.getBoundingClientRect().top <= scrollOffset) {
      current = heading.id
    }
  }

  activeId.value = current
}

const observeHeadings = (): (() => void) => {
  const elements = flatLinks.value
    .map(link => document.getElementById(link.id))
    .filter((element): element is HTMLElement => element !== null)

  if (elements.length === 0) {
    return () => {}
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

      const nextId = visible[0]?.target.id

      if (nextId) {
        activeId.value = nextId
      }
    },
    {
      rootMargin: '-24% 0px -64% 0px',
      threshold: 0,
    },
  )

  elements.forEach(element => observer.observe(element))
  syncActiveFromScroll()

  return () => observer.disconnect()
}

const mountObserver = async (): Promise<void> => {
  stopObserver()

  for (let attempt = 0; attempt < 30; attempt++) {
    await nextTick()

    if (attempt > 0) {
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
    }

    const cleanup = observeHeadings()
    const hasHeadings = flatLinks.value.some(link => document.getElementById(link.id))

    if (hasHeadings) {
      stopObserver = cleanup
      return
    }

    cleanup()
  }
}

onMounted(() => {
  void mountObserver()
})

onUnmounted(() => {
  stopObserver()
})

watch(flatLinks, () => {
  void mountObserver()
})

watch(() => route.path, () => {
  void mountObserver()
})
</script>

<template>
  <nav
    v-if="flatLinks.length > 0"
    aria-label="On this page"
    class="sticky top-22 max-h-[calc(100svh-6.5rem)] overflow-y-auto pt-12 pb-8 pl-6 sm:pt-14"
  >
    <p class="font-mono text-[10px] font-medium tracking-[0.32em] text-muted-foreground/90 uppercase">
      // On this page
    </p>

    <ul class="relative mt-5 border-l border-border/80">
      <li
        v-for="link in flatLinks"
        :key="link.id"
      >
        <a
          :href="`#${link.id}`"
          :class="cn(
            'relative block py-2 text-[13px] leading-5 transition-colors',
            link.depth > 0 ? 'pl-6' : 'pl-4',
            activeId === link.id
              ? 'font-medium text-foreground before:absolute before:top-2 before:bottom-2 before:left-0 before:w-0.5 before:-translate-x-px before:bg-primary before:content-[\'\']'
              : 'text-muted-foreground hover:text-foreground',
          )"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>
