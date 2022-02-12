<template>
    <div id="nav">
        <div id="banner">
        <span id="name">Aidan Hibbard</span>
        </div>
        <div id="links">
            <nuxt-link to="/">Home</nuxt-link>
            <nuxt-link to="/about">About</nuxt-link>
            <nuxt-link to="/blog">Blog</nuxt-link>
            <nuxt-link to="/projects">Projects</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {

}
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
#nav a.router-link-exact-active {
    color: #42b983;
}
</style>