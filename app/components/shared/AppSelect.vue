<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'

const props = defineProps<{ label?: string, options: { value: string, label: string }[], modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: { value: string, label: string }] }>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const selectId = computed(() => `dropdown-${Math.random().toString(36)}`)

const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    ref="dropdownRef"
    class="relative w-full"
  >
    <!-- Label -->
    <label
      :for="selectId"
      class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1"
    >
      {{ label }}
    </label>

    <!-- Select Box -->
    <div
      class="relative w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600
             rounded-lg shadow-sm flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
      @click="isOpen = !isOpen"
    >
      <span class="flex-1 truncate">{{ props.label ?? 'Select an option' }}</span>
      <ChevronDownIcon
        v-if="!isOpen"
        class="w-5 h-5 text-gray-500 dark:text-gray-300"
      />
      <ChevronUpIcon
        v-else
        class="w-5 h-5 text-gray-500 dark:text-gray-300"
      />
    </div>

    <!-- Dropdown List -->
    <div
      v-if="isOpen"
      class="absolute left-0 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600
             rounded-lg shadow-md z-10 overflow-hidden"
    >
      <div
        v-for="option in options"
        :key="option.value"
        class="px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-teal-500 hover:text-white cursor-pointer"
        @click="emit('update:modelValue', option); isOpen = false"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>
