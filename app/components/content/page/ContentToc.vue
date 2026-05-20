<script setup lang="ts">
import type { TocLink } from '@nuxtjs/mdc'
import { cn } from '@/lib/utils'
import { flattenContentTocLinks } from '@/utils/flatten-content-toc-links'

const props = defineProps<{
  links: TocLink[]
}>()

const activeId = ref('')
const flatLinks = computed(() => flattenContentTocLinks(props.links))

const observeHeadings = (): (() => void) => {
  const ids = flatLinks.value.map(link => link.id)
  const elements = ids
    .map(id => document.getElementById(id))
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

  return () => observer.disconnect()
}

let stopObserver = (): void => {}

onMounted(() => {
  stopObserver = observeHeadings()
})

onUnmounted(() => {
  stopObserver()
})

watch(flatLinks, async () => {
  stopObserver()
  await nextTick()
  stopObserver = observeHeadings()
})
</script>

<template>
  <nav
    v-if="flatLinks.length > 0"
    aria-label="On this page"
    class="sticky top-[5.5rem] max-h-[calc(100svh-6.5rem)] overflow-y-auto pt-12 pb-8 pl-6 sm:pt-14"
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
