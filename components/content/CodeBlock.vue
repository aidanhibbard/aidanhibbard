<template>
  <div class="block mx-auto my-6 px-6 py-8 bg-gray-900 rounded-md">
    <ContentSlot
      :use="$slots.default"
      unwrap="code"
    />
  </div>
</template>
