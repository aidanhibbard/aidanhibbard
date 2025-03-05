<script setup lang="ts">
import { ref } from 'vue'
import { FolderIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'

// Define the props interface for the links
interface Link {
  id: string
  depth: number
  text: string
  links?: Link[] // Optional recursive property for nested links
}

defineProps({
  links: {
    type: Array as () => Link[],
    required: true,
  },
})

// A recursive function to handle the state of each folder (open/close)
const toggleState = (id: string) => {
  state[id] = !state[id]
}

// Define a reactive state to track the open/close state of each section
const state = ref<Record<string, boolean>>({})
</script>

<template>
  <nav class="px-4 border-l border-gray-500 overflow-y-auto max-h-screen">
    <ul class="space-y-2">
      <!-- Recursive call for each link -->
      <li
        v-for="link in links"
        :key="link.id"
        class="transition-all duration-300 ease-in-out hover:bg-gray-100 rounded-lg"
      >
        <div class="flex items-center space-x-3 p-2">
          <!-- Folder icon -->
          <FolderIcon
            v-if="link.links"
            class="w-5 h-5 text-gray-600"
          />

          <!-- Clickable section name -->
          <button
            class="text-gray-900 font-semibold hover:text-gray-700 transition duration-200 ease-in-out"
            @click="toggleState(link.id)"
          >
            {{ link.text }}
          </button>

          <!-- Chevron icon to toggle open/close state -->
          <button
            v-if="link.links"
            class="ml-auto text-gray-600 hover:text-gray-800 transition duration-200 ease-in-out"
            @click="toggleState(link.id)"
          >
            <ChevronDownIcon
              v-if="!state[link.id]"
              class="w-5 h-5"
            />
            <ChevronUpIcon
              v-else
              class="w-5 h-5"
            />
          </button>
        </div>

        <!-- Nested links (if any) -->
        <ul
          v-if="state[link.id]"
          class="ml-6 space-y-3 pl-4"
        >
          <li
            v-for="nestedLink in link.links || []"
            :key="nestedLink.id"
            class="transition-all duration-300 ease-in-out hover:bg-gray-100 rounded-lg"
          >
            <div class="flex items-center space-x-3 p-2">
              <!-- Folder icon for nested sections -->
              <FolderIcon class="w-5 h-5 text-gray-600" />

              <!-- Clickable nested section name -->
              <button
                class="text-gray-900 font-semibold hover:text-gray-700 transition duration-200 ease-in-out"
                @click="toggleState(nestedLink.id)"
              >
                {{ nestedLink.text }}
              </button>

              <!-- Chevron icon for nested sections -->
              <button
                class="ml-auto text-gray-600 hover:text-gray-800 transition duration-200 ease-in-out"
                @click="toggleState(nestedLink.id)"
              >
                <ChevronDownIcon
                  v-if="!state[nestedLink.id]"
                  class="w-5 h-5"
                />
                <ChevronUpIcon
                  v-else
                  class="w-5 h-5"
                />
              </button>
            </div>

            <!-- Recursively render nested links -->
            <ul
              v-if="nestedLink.links?.length"
              class="ml-6 space-y-3 pl-4"
            >
              <ContentToc :links="nestedLink.links" />
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
