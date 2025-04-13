<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <main class="h-full p-4 grid grid-cols-1 md:grid-cols-4 gap-2 lg:grid-cols-6">
    <!-- 1 Large box spanning 2x2 -->
    <div class="rounded-4xl md:col-span-2 md:row-span-1 bg-white" />
    <!-- 2 Tall box spanning 2 rows -->
    <div class="rounded-4xl md:row-span-1 bg-white" />
    <!-- 3 Regular box -->
    <div class="rounded-4xl md:row-span-3 lg:row-span-1 bg-white" />
    <!-- 4 Wide box spanning 2 columns -->
    <div class="rounded-4xl md:col-span-2 bg-white" />
    <!-- 5 Tall box spanning 2 rows -->
    <div class="rounded-4xl md:row-span-2 lg:col-span-2 bg-white" />
    <!-- 6 Regular boxes -->
    <div class="rounded-4xl md:col-span-2 bg-white" />
    <!-- 7  box -->
    <div class="rounded-4xl lg:col-span-2 bg-white" />
    <!-- 8 Wide box spanning 3 columns -->
    <div class="rounded-4xl md:col-span-3 bg-white" />
    <!-- 9 Regular boxes -->
    <div class="rounded-4xl lg:col-span-2 bg-white" />
    <!-- 10 box -->
    <div class="rounded-4xl col-span-full lg:col-span-1 bg-white" />
  </main>
</template>
