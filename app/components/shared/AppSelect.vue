<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'

const props = defineProps<{
  label?: string
  options: { value: string, label: string }[]
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectId = computed(() => `dropdown-${Math.random().toString(36).substr(2, 9)}`)
</script>

<template>
  <div>
    <!-- Properly Associated Label -->
    <label
      :for="selectId"
      class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1"
    >
      {{ label }}
    </label>

    <div class="relative">
      <!-- Select Wrapper -->
      <div
        class="relative w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm
               flex items-center px-3 py-2 cursor-pointer"
        @click="isOpen = !isOpen"
      >
        <!-- Selected Option -->
        <span class="flex-1">
          {{ props.label ?? 'Select an option' }}
        </span>

        <!-- Chevron Icon -->
        <ChevronDownIcon
          v-if="!isOpen"
          class="w-5 h-5 text-gray-500 dark:text-gray-300"
        />
        <ChevronUpIcon
          v-else
          class="w-5 h-5 text-gray-500 dark:text-gray-300"
        />
      </div>

      <!-- Select Element (Properly Associated for Accessibility) -->
      <select
        :id="selectId"
        class="absolute inset-0 w-full h-full opacity-0"
        :value="modelValue"
        @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        @blur="isOpen = false"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <!-- Dropdown List -->
      <div
        v-if="isOpen"
        class="absolute mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md z-10"
      >
        <div
          v-for="option in options"
          :key="option.value"
          class="px-3 py-2 text-gray-900 dark:text-gray-100 hover:bg-teal-500 hover:text-white cursor-pointer"
          @click="emit('update:modelValue', option.value); isOpen = false"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>
