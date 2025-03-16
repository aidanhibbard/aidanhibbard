<script setup lang="ts">
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { FolderIcon } from '@heroicons/vue/24/solid'
import type { TocLink } from '@nuxtjs/mdc'

const props = defineProps<{ links: TocLink[] }>()

const query = ref('')
const openSections = ref<Record<string, boolean>>({})
const activeSection = ref<string | null>(null)

const topLevel = computed(() => props.links[0]?.depth === 2)

// Toggle section visibility
const toggleSection = (id: string) => {
  openSections.value[id] = !openSections.value[id]
}

// **SEARCH**: Filter TOC based on query
const filteredLinks = computed(() => {
  if (!query.value.trim()) return props.links

  const filter = (links: TocLink[]): TocLink[] =>
    links
      .map(l => ({
        ...l,
        children: l.children ? filter(l.children) : undefined,
      }))
      .filter(l => l.text.toLowerCase().includes(query.value.toLowerCase()) || (l.children && l.children.length > 0))

  return filter(props.links)
})

// **INTERSECTION OBSERVER**: Highlight active section & auto-open folders
watchEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          if (id) {
            activeSection.value = id
            autoExpandFolders(id)
          }
        }
      }
    },
    { rootMargin: '-50% 0px -50% 0px', threshold: 0.1 },
  )

  document.querySelectorAll('h2, h3, h4, h5, h6').forEach((section) => {
    observer.observe(section)
  })
})

// **AUTO-EXPAND FOLDERS**: Open all necessary sections to reveal the current section
const autoExpandFolders = (id: string) => {
  const openRecursively = (links: TocLink[], path: string[] = []) => {
    for (const link of links) {
      if (link.id === id) {
        path.forEach(p => (openSections.value[p] = true))
        return true
      }
      if (link.children && openRecursively(link.children, [...path, link.id])) {
        return true
      }
    }
    return false
  }
  openRecursively(props.links)
}
</script>

<template>
  <ul class="px-4 text-gray-900 dark:text-gray-200 flex flex-col gap-y-2">
    <SharedSearchInput
      v-if="topLevel"
      v-model:model-value="query"
      placeholder="Search sections"
    />

    <li
      v-for="l in filteredLinks"
      :key="l.id"
      class="relative"
    >
      <div
        class="flex items-center gap-x-2 cursor-pointer"
        @click="l.children && toggleSection(l.id)"
      >
        <FolderIcon
          v-if="l.children"
          class="w-4.5 h-4.5 text-gray-500 dark:text-gray-400"
        />
        <NuxtLink
          class="text-sm/6 truncate transition-colors duration-300"
          :to="`#${l.id}`"
          :class="{ 'text-teal-500 font-semibold': activeSection === l.id, 'hover:text-teal-500': true }"
        >
          {{ l.text }}
        </NuxtLink>
        <ChevronRightIcon
          v-if="l.children && !openSections[l.id]"
          class="w-6 h-6 transition-transform duration-300 text-gray-600 dark:text-gray-400"
        />
        <ChevronDownIcon
          v-if="l.children && openSections[l.id]"
          class="w-6 h-6 transition-transform duration-300 text-gray-600 dark:text-gray-400"
        />
      </div>

      <transition name="fade">
        <ContentToc
          v-if="l.children && openSections[l.id]"
          :links="l.children"
          class="ml-2 border-l border-gray-300 dark:border-gray-600"
        />
      </transition>
    </li>
  </ul>
</template>

<style scoped>
/* Smooth fade in/out for nested lists */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
