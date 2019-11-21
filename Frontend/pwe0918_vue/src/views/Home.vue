<template>
  <v-sheet>
  <Map/>

    <v-container>
      <v-row>
        <v-col>
          <v-content>
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