<template>
  <v-app dark>
    <v-bottom-navigation>
      <v-btn icon="add_circle_outline"><span>Start Område</span></v-btn>
      <v-btn icon="emoji_flags"><span>Mine Områder</span></v-btn>
      <v-btn icon="format_list_bulleted"><span>Highscore</span></v-btn>
      <v-btn icon="emoji_events"><span>Trofæer</span></v-btn>
    </v-bottom-navigation>
    <main>
      
    </main>
  </v-app>
</template>

<style lang="scss">
@import '/styles/main.scss'; //imports the main stylesheet which includes all sub-styles

#app {
  font-family: $font-primary;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
