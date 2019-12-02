<template>
  <v-sheet
    width="95vw" height="90vh"
  >
    <!-- <v-overlay
      :opacity="1"
      :absolute= false
      :value="overlaySingleTrofae"
      z-index="5000"
    >        
      <Trofaer
        v-if="showSingleTrofae"
      >
      </Trofaer>
      <v-btn
        fab
        color="red"
        @click="overlaySingleTrofae = false"
      >
        X
      </v-btn>
    </v-overlay> -->
    <v-badge>
      <v-icon large>mdi-trophy</v-icon>
    </v-badge>
    <v-badge>
      <v-icon large>mdi-trophy</v-icon>
    </v-badge>
    <v-badge>
      <v-icon large>mdi-trophy</v-icon>
    </v-badge>
    <v-badge overlap>
      <template v-slot:badge>
        <v-icon dark>mdi-lock</v-icon>
      </template>
      <v-icon large>mdi-trophy</v-icon>
    </v-badge>
    <v-badge overlap>
      <template v-slot:badge>
        <v-icon dark>mdi-lock</v-icon>
      </template>
      <v-icon large>mdi-trophy</v-icon>
    </v-badge>
    <v-badge overlap>
      <template v-slot:badge>
        <v-icon dark>mdi-lock</v-icon>
      </template>
      <v-icon large>mdi-trophy</v-icon>
    </v-badge>
  </v-sheet>
</template>

<script>
//import SingleTrofae from "./SingleTrofae"

export default {
  name: "Trofaer",

  components: {
    //SingleTrofae
  },

  data: () => ({


  Methods: {
    fetchSingleTrofae () {
      this.showSignleTrofae = !this.showSingleTrofae;
    },
  }
    })
};
</script>