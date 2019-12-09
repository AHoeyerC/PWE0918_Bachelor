<template>
  <v-app> 
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

