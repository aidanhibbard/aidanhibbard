<script setup lang='ts'>

</script>

<template>
  <div id="app">
    <NavBar />
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100%;
}
</style>