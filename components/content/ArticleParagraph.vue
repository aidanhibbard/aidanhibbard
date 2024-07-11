<template>
  <p class="block mx-auto mb-6 prose sm:prose-lg md:prose-lg lg:prose-lg text-gray-900 leading-relaxed">
    <ContentSlot
      :use="$slots.default"
      unwrap="p"
    />
  </p>
</template>
