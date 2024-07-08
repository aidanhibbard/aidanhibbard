<template>
  <h2 class="block mx-auto mb-6 prose sm:prose-md md:prose-lg lg:prose-xl text-gray-900">
    <a class="block h-full">
      <ContentSlot
        :use="$slots.default"
        unwrap="h2"
      />
    </a>
  </h2>
</template>
