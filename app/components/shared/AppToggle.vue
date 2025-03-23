<script setup lang="ts">
import { Switch } from '@headlessui/vue'

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
  <!-- Use the `checked` state to conditionally style the button. -->
  <Switch
    v-slot="{ checked }"
    as="template"
    @click="emits('update:modelValue', !modelValue)"
  >
    <button
      class="relative inline-flex h-6 w-11 items-center rounded-full"
      :class="checked ? 'bg-blue-600' : 'bg-gray-200'"
    >
      <span class="sr-only">{{ label }}</span>
      <span
        :class="checked ? 'translate-x-6' : 'translate-x-1'"
        class="inline-block h-4 w-4 transform rounded-full bg-white transition"
      >
        <slot
          v-if="checked"
          name="checked"
        />
        <slot
          v-else
          name="unchecked"
        />
      </span>
    </button>
  </Switch>
</template>
