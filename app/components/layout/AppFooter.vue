<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="py-12 px-4 border-t border-border">
    <div class="container mx-auto text-center text-sm text-muted-foreground">
      <p>© {{ currentYear }} Aidan Hibbard. All rights reserved.</p>
    </div>
  </footer>
</template>
