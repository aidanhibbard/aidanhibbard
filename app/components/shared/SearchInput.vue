<script setup lang="ts">
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/vue/24/outline'

const state = reactive({
  query: '',
})

const clearQuery = () => state.query = ''
</script>

<template>
  <div class="flex flex-1 justify-end relative w-64">
    <input
      v-model="state.query"
      type="text"
      class="w-72 rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#76ABAE] focus:outline-none"
      placeholder="Find anything..."
    >
    <MagnifyingGlassIcon class="absolute right-3 size-3 text-gray-400" />
    <XCircleIcon
      v-if="state.query"
      class="absolute right-9 top-2.5 size-5 cursor-pointer text-gray-400 hover:text-red-500"
      @click="clearQuery"
    />
  </div>
</template>
