<script setup lang="ts">
defineProps<{
  modelValue: boolean
  disabled?: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg' // Allow sizes to be passed as props
}>()

const emits = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <label
    class="flex items-center cursor-pointer select-none p-1 transition"
    :for="label"
  >
    <div
      class="relative"
      :class="{
        'w-10 h-5': size === 'sm',
        'w-12 h-6': size === 'md' || !size,
        'w-14 h-7': size === 'lg',
      }"
    >
      <input
        id="toggleTheme"
        type="checkbox"
        class="peer sr-only"
        :checked="modelValue"
        :disabled="disabled"
        @change="emits('update:modelValue', !modelValue)"
      >
      <div
        class="block w-full h-full rounded-full transition-all ease-in-out"
        :class="{
          'bg-gray-200': modelValue,
          'bg-gray-300 dark:bg-gray-600': !modelValue,
          'cursor-not-allowed opacity-50': disabled,
        }"
      />
      <div
        class="absolute top-0.5 left-0.5 w-5 h-5 flex items-center justify-center rounded-full transition-transform transform
        peer-checked:translate-x-full"
        :class="{
          'bg-white': modelValue,
          'bg-gray-800': !modelValue,
        }"
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
    <span
      v-if="label"
      class="ml-3 text-sm text-gray-900 dark:text-gray-200"
    >{{ label }}</span>
  </label>
</template>
