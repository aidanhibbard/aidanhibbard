<template>
<div id="app_main">
  <div id="nav">
    <div id="banner">
      <span id="name">{ Aidan Hibbard }</span>
    </div>
    <div id="links">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/blog">Blog</router-link>
    </div>
  </div>
  <router-view/>
</div>
</template>

<script>

</script>


<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
