<script setup lang="ts">
const slotContent = ref(null);
const linkTo = ref('');

onMounted(() => {
  if (slotContent.value) {
    const contentText = slotContent.value;
    linkTo.value = `#${contentText}`;
  }
});
</script>

<template>
  <h2 :id="slotContent!" class="block mx-auto mb-6 prose sm:prose-md md:prose-lg lg:prose-xl text-gray-900">
    <NuxtLink
      :to="`#${linkTo}`"
      class="block h-full hover:text-green-300 transition duration-50 no-underline"
    >
      #<ContentSlot
        ref="slotContent"
        :use="$slots.default"
        unwrap="h2"
      />
    </NuxtLink>
  </h2>
</template>
