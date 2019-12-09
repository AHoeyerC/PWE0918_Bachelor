<template>
  <v-sheet>
  <Map/>
  <Navigation/>
  </v-sheet>
</template>

<script>
  import Map from "../components/Map"
  import Navigation from "../components/Navigation"
  

  export default {
  name: 'Home',

  components: {
    Navigation,
    Map,
    
  },

  data: () => ({
    
  }),
};
</script>