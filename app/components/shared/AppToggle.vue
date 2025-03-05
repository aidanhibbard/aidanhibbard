<script setup lang="ts">
defineProps<{
  modelValue: boolean
  disabled?: boolean
  label?: string
}>()

const emits = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <label
    for="toggleTheme"
    class="flex items-center cursor-pointer select-none p-1 transition"
  >
    <div class="relative w-14 h-8">
      <input
        id="toggleTheme"
        type="checkbox"
        class="peer sr-only"
        :checked="modelValue"
        @change="emits('update:modelValue', !modelValue)"
      >
      <div
        class="block w-full h-full rounded-full transition"
        :class="modelValue ? 'bg-black' : 'bg-white border-2 rounded-2xl'"
      />
      <div
        class="absolute top-1 left-1 w-6 h-6 flex items-center justify-center rounded-full transition-transform transform
        peer-checked:translate-x-6"
        :class="modelValue ? 'bg-white' : 'bg-black'"
      >
        <slot
          v-if="modelValue"
          name="icon-left"
        />
        <slot
          v-else
          name="icon-right"
        />
      </div>
    </div>
  </label>
</template>
