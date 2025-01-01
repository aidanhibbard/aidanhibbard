<template>
  <div class="block my-2 px-4 py-2 bg-gray-900 rounded-md w-full">
    <ContentSlot
      :use="$slots.default"
      unwrap="code"
    />
  </div>
</template>
