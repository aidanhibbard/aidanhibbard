<template>
  <p class="block mx-auto mb-6 prose sm:prose-lg md:prose-lg lg:prose-lg text-gray-900">
    <ContentSlot
      :use="$slots.default"
      unwrap="p"
    />
  </p>
</template>
