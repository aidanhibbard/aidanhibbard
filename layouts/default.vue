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
  background-color: #83a7ac;
  background-image: linear-gradient(19deg, #83a7ac 0%, #6d6d6d 100%);
}
</style>