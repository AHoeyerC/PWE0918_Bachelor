<template>
  <v-sheet width="95vw" height="90vh" light>

    <v-overlay light :value="overlaySingleTrofae" z-index="5000"> <!--:absolute= false-->  
      <SingleTrofae v-if="showSingleTrofae"></SingleTrofae>
      <v-btn fab color="red" @click="overlaySingleTrofae = false">x</v-btn>
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
          <v-progress-linear color="success"></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row cols="12">
        <v-col align="center" md="4">
          <v-btn @click="overlaySingleTrofae = !overlaySingleTrofae" elevation="false" outlined fab>
            <v-icon large>mdi-trophy</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-sheet>
</template>

<script>
import SingleTrofae from "./SingleTrofae";
import axios from 'axios';

export default {
  name: "Trofaer",

  components: {
    SingleTrofae
  },

  data: () => ({
    overlaySingleTrofae: false,
    showSingleTrofae: true,
    
    baseUrl: 'http://localhost:8626/',
    allTrophies: []

  }),
  methods: {
    fetchSingleTrofae () {
      this.showSingleTrofae = !this.showSingleTrofae;
    },
    getAllTrophies() {
      axios({
        method: 'get',
        url: this.baseUrl + 'trophies',
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response);
        this.allTrophies = response.data.trophies;
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.getAllTrophies();
  }
};
</script>