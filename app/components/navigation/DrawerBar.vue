<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const drawer = useDrawer()
</script>

<template>
  <Dialog
    class="lg:hidden"
    :open="drawer"
  >
    <div class="fixed inset-0 z-10" />
    <DialogPanel class="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div class="flex items-center justify-end">
        <button
          type="button"
          class="-m-2.5 rounded-md p-2.5 text-gray-700"
          @click="drawer = false"
        >
          <span class="sr-only">Close menu</span>
          <XMarkIcon
            class="size-6"
            aria-hidden="true"
          />
        </button>
      </div>
    </DialogPanel>
  </Dialog>
</template>
