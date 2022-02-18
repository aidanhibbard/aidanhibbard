<template>
    <div id="app_main">
    <div id="nav">
        <div id="banner">
        <span id="name"> { Aidan Hibbard }</span>
        </div>
        <div id="links">
            <nuxt-link to="/">Home</nuxt-link>
            <nuxt-link to="/about">About</nuxt-link>
            <nuxt-link to="/blog">Blog</nuxt-link>
            <nuxt-link to="/projects">Projects</nuxt-link>
        </div>
    </div>
        <slot />
    </div>
</template>

<script>
export default {
    setup () {
        useMeta({
            title: 'Aidan Hibbard'
        })
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
body {
    background-color: #2c3e50;
}
#app {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#nav {
    padding-top: 10px;
    text-align: center;
}
#nav a {
    font-weight: bold;
    font-size: 18px;
    color: white;
    padding: 10px;
}
#name {
    color: #57d3d3;
    font-weight: bold;
    font-size: 22px;
}
#links {
    padding-top: 10px;
}
#nav a.router-link-exact-active {
    color: #57d3d3;
}
</style>