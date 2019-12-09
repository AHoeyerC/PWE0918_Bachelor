<template>
  <v-sheet
    width="95vw" height="90vh" light
  >
    <v-overlay
      light
      :absolute= false
      :value="overlaySingleTrofae"
      z-index="5000"
    >        
      <SingleTrofae
        v-if="showSingleTrofae"
      >
      </SingleTrofae>
      <v-btn
        fab
        color="red"
        @click="overlaySingleTrofae = false"
      >
        x
      </v-btn>
    </v-overlay>
    <v-container fluid class="header-grey py-1">
        <v-row>
          <v-col cols="12" justify="center" align="center">
            <v-sheet class="header-grey">Trofæer</v-sheet>
          </v-col>
        </v-row>
    </v-container>
    <v-container>
      <v-row justify="center">
        <v-col cols="9" >
          <div class="text-center">5/14</div>
          <v-progress-linear
            color="success"
          >
          </v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row cols="12">
        <v-col align="center" md="4">
          <v-btn @click="overlaySingleTrofae = !overlaySingleTrofae" elevation="false" outlined fab>
            <!-- <v-overlay 
              :opacity="1"
              v-if="locked"
              absolute
            >
              <v-card
              width="56px"
              height="56px"
              >
                <v-icon large>mdi-account</v-icon>
              </v-card>
            </v-overlay> -->
            <v-icon large>mdi-trophy</v-icon>
          </v-btn>
        </v-col>
        <v-col align="center" md="4">
          <v-btn elevation="false" outlined fab>
            <v-icon large>mdi-trophy</v-icon>
          </v-btn>
        </v-col>
        <v-col align="center" md="4">
          <v-btn elevation="false" outlined fab>
            <v-icon large>mdi-trophy</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row cols="12">
        <v-col align="center" md="4">
          <v-btn elevation="false" outlined fab>
            <v-icon large>mdi-trophy</v-icon>
          </v-btn>
        </v-col>
        <v-col align="center" md="4">
          <v-btn elevation="false" outlined fab>
            <v-icon large>mdi-trophy</v-icon>
          </v-btn>
        </v-col>
        <v-col align="center" md="4">
          <v-btn elevation="false" outlined fab>
            <v-icon large>mdi-trophy</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row cols="12">
        <v-col align="center" md="4">
          <v-btn elevation="false" outlined fab>
            <v-icon large>mdi-trophy</v-icon>
          </v-btn>
        </v-col>
        <v-col align="center" md="4">
          <v-btn elevation="false" outlined fab>
            <v-icon large>mdi-trophy</v-icon>
          </v-btn>
        </v-col>
        <v-col align="center" md="4">
          <v-btn elevation="false" outlined fab>
            <v-icon large>mdi-trophy</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import SingleTrofae from "./SingleTrofae"

export default {
  name: "Trofaer",

  components: {
    SingleTrofae
  },

  data: () => ({
    overlaySingleTrofae: false,
    showSingleTrofae: true,
    locked: true,

  Methods: {
    fetchSingleTrofae () {
      this.showSingleTrofae = !this.showSingleTrofae;
    },
  }
    })
};
</script>