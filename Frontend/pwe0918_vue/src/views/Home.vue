<template>
  <v-container>
    <v-row>
      <v-col>
        <v-content margin="0">
          <Map/>
        </v-content>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-content margin="0">
          <Navigation/>
        </v-content>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Map from "../components/Map"
  import Navigation from "../components/Navigation"
  

  export default {
  name: 'Home',

  components: {
    Navigation,
    Map
    
  },

  data: () => ({
    //
  }),
};
</script>