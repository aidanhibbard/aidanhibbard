<template>
  <div id="home_page">
    <Hero />
  </div>
</template>

<script>
import Hero from '~/components/Hero'
export default {
  components: {
    Hero,
  },
}
</script>

<style scoped>
#home_page {
  margin-top: 56px;
}
</style>