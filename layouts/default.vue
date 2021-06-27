<template>
  <v-app>
    <center>
      <v-app-bar
        color="light-blue"
        fixed
      >
        <v-toolbar-title><a href="/">Aidan Hibbard</a></v-toolbar-title>
        <v-spacer />
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="light-blue--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-book</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Blog</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Projects</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-pen</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Contact</v-list-item-title>
            </v-list-item>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </center>
    
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
      drawer: false,
      group: null,
    }),
}
</script>

<style scoped>
.v-toolbar__title {
  color: white;
}
.v-btn--icon.v-size--default .v-icon, .v-btn--fab.v-size--default .v-icon {
  color: white;
}
.v-list-item__title, .v-list-item__subtitle {
  flex: none;
}
.v-main {
  margin-top: 56px;
}
</style>