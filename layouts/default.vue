<script setup lang='ts'>
useHead({
  title: 'Aidan Hibbard',
  titleTemplate: '%s %separator %siteName',
  templateParams: { separator: '|', siteName: 'Aidan Hibbard' },
})
</script>


<template>
  <div class="h-full antialiased">
    <MaintnenceBanner />
    <NavBar />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>

</style>