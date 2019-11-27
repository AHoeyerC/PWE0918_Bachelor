<template>
  <v-sheet>
  <Map/>

    <v-container>
      <v-row>
        <v-col>
          <v-content margin="0">
            <Navigation/>
          </v-content>
        </v-col>
      </v-row>
    </v-container>

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