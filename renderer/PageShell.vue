<template>
<div id="app_main">
  <div id="nav">
    <div id="banner">
      <span id="name">{ Aidan Hibbard }</span>
    </div>
    <div id="links">
      <Link href="/">Home</Link> |
      <Link href="/about">About</Link> |
      <Link href="/blog">Blog</Link> |
      <Link href="/projects">Projects</Link>
    </div>
  </div>
  <slot />
</div>
</template>

<script setup>
import Link from './Link.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Ubuntu;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding-top: 10px;
}
#nav a {
  font-weight: bold;
  font-size: 18px;
  color: #2c3e50;
}
#name {
  color: #0c2a2c;
  font-weight: bold;
  font-size: 22px;
}
#links {
  padding-top: 10px;
}
#nav a.active {
  color: #42b983;
}
</style>
