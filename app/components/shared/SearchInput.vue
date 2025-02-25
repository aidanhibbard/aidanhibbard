<script setup lang="ts">
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/vue/24/outline'

defineProps<{ modelValue: string, placeholder?: string }>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const clearQuery = () => emit('update:modelValue', '')
</script>

<template>
  <div class="flex flex-1 justify-end relative">
    <input
      :value="modelValue"
      type="text"
      class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#76ABAE] focus:outline-none"
      :placeholder="placeholder || 'Find anything...'"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <MagnifyingGlassIcon class="absolute right-3 top-2 size-5 text-gray-400" />
    <XCircleIcon
      v-if="modelValue"
      class="absolute right-9 top-2.5 size-5 cursor-pointer text-gray-400 hover:text-red-500"
      @click="clearQuery"
    />
  </div>
</template>
