<template>
  <v-sheet>
  <Map/>
  <Navigation/>
  </v-sheet>
</template>

<script>
  import Map from "../components/Map"
  import Navigation from "../components/Navigation"
  // import NavWheel from "../components/NavWheel"
  

  export default {
  name: 'Home',

  components: {
    Navigation,
    Map,
    // NavWheel
    
  },

  data: () => ({
    //
  }),
};
</script>