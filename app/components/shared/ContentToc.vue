<script setup lang="ts">
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'

const props = defineProps<{
  content: ContentType
}>()

const isOpen = ref(true)
const activeSection = ref<number | null>(null)
const activePosition = ref<'left' | 'right'>('left')

// Toggle section visibility on mobile
const toggleSection = (index: number) => {
  activeSection.value = activeSection.value === index ? null : index
}

// Switch TOC position on desktop
const togglePosition = () => {
  activePosition.value = activePosition.value === 'left' ? 'right' : 'left'
}

const containerClasses = computed(() => ({
  'left-4': activePosition.value === 'left',
  'right-4': activePosition.value === 'right',
}))
</script>

<template>
  <nav>
    <!-- Desktop TOC -->
    <div
      class="hidden lg:block fixed top-20 w-64 p-4 border border-gray-200 rounded-xl transition-all bg-white"
      :class="[containerClasses]"
    >
      <!-- Position Switch -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">
          Table of Contents
        </h3>
        <button
          class="text-gray-500 hover:text-gray-800 transition-colors"
          @click="togglePosition"
        >
          {{ activePosition === "left" ? "Right →" : "← Left" }}
        </button>
      </div>

      <ul class="space-y-4">
        <li
          v-for="(section, index) in props.content.body.toc.links"
          :key="index"
        >
          <span class="text-gray-900 font-medium block mb-2">{{
            section.text
          }}</span>
          <ul class="pl-4 border-l border-gray-200 space-y-2">
            <li
              v-for="child in section.children"
              :key="child.anchor"
            >
              <NuxtLink
                :href="child.anchor"
                class="text-gray-600 hover:text-teal-500 text-sm transition-colors"
              >
                {{ child.title }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- Mobile TOC -->
    <div class="lg:hidden p-4 fixed bottom-4 left-4 right-4 z-50 shadow-lg rounded-lg bg-white transition-all duration-600 border border-gray-300">
      <button
        class="w-full flex justify-between items-center transition-all duration-600"
        @click="isOpen = !isOpen"
      >
        <span class="text-gray-800 font-medium">Table of Contents</span>
        <ChevronDownIcon
          class="w-5 h-5 text-gray-600 transition"
          :class="{ 'rotate-180': isOpen }"
        />
      </button>

      <div
        v-if="isOpen"
        class="max-h-60 overflow-auto"
      >
        <ul>
          <li
            v-for="(section, index) in content.body.toc"
            :key="section.title"
          >
            <button
              class="flex items-center justify-between w-full text-gray-800 font-medium py-2"
              @click="toggleSection(index)"
            >
              {{ section.title }}
              <ChevronRightIcon
                class="w-5 h-5 text-gray-600 transition"
                :class="{ 'rotate-90': activeSection === index }"
              />
            </button>
            <ul
              v-if="activeSection === index"
              class="pl-4 space-y-2"
            >
              <li
                v-for="child in section.links"
                :key="child.anchor"
              >
                <a
                  :href="child.anchor"
                  class="text-blue-600 hover:underline text-sm block"
                >
                  {{ child.title }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
