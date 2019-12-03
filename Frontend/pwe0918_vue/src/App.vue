<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      light
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
<!-- <ul id="menu">
        <a class="menu-button icon-plus" href="#menu" title="Show navigation"><span class="mdi mdi-close"></span></a>
        <a class="menu-button icon-minus" href="#0" title="Hide navigation"><span class="mdi mdi-close"></span></a>
        <li class="menu-item">
        <a href="#menu">
        <span class="mdi mdi-account"></span>
        </a>
    </li>
    <li class="menu-item">
        <a href="#menu">
        <span class="mdi mdi-account"></span>
        </a>
    </li>
    <li class="menu-item">
        <a href="#menu">
        <span class="mdi mdi-account"></span>
        </a>
    </li>
    <li class="menu-item">
        <a href="#menu">
        <span class="mdi mdi-account"></span>
        </a>
    </li>
    </ul> -->
      <v-spacer></v-spacer>
      <v-icon>mdi mdi-account-circle</v-icon>
    </v-app-bar>
    <router-link to="/"></router-link>
    <router-link to="/registration"></router-link>
    <router-link to="/login"></router-link>

    <router-view></router-view>
  </v-app>
</template>

<style lang="scss">
@import 'styles/main.scss';
</style>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  })
};
</script>

