<script setup lang='ts'>

</script>

<template>
  <footer class="bg-white/30 dark:bg-[#000000]/30 backdrop-blur-md border-t border-gray-300 dark:border-gray-700">
    <nav class="flex flex-row justify-center py-4">
      <div>
        <UButton
          external
          to="https://www.instagram.com/aidan_hibbard/"
          color="neutral"
          variant="ghost"
          aria-label="instagram"
        >
          <template #default>
            <UIcon
              name="mdi:instagram"
              class="text-2xl"
            />
          </template>
        </UButton>
        <UButton
          external
          to="https://github.com/AidanHibbard"
          color="neutral"
          variant="ghost"
          aria-label="codepen"
        >
          <template #default>
            <UIcon
              name="mdi:github"
              class="text-2xl"
            />
          </template>
        </UButton>
        <UButton
          external
          to="https://www.linkedin.com/in/aidan-hibbard/"
          color="neutral"
          variant="ghost"
          aria-label="linkedin"
        >
          <template #default>
            <UIcon
              name="mdi:linkedin"
              class="text-2xl"
            />
          </template>
        </UButton>
        <UButton
          external
          to="https://codepen.io/aidanhibbard"
          color="neutral"
          variant="ghost"
          aria-label="codepen"
        >
          <template #default>
            <UIcon
              name="mdi:codepen"
              class="text-2xl"
            />
          </template>
        </UButton>
      </div>
    </nav>
  </footer>
</template>
