<template>
  <v-sheet width="95vw" height="90vh" light>

    <v-overlay light :value="overlaySingleTrofae" z-index="5000">
      <v-container class="py-0">
        <v-row>
          <v-col class="pa-0">
            <v-card flat max-width="300" light>
              <v-img src="../../public/img/trophy-previews/2-trophy-preview.svg"></v-img> <!--https://picsum.photos/id/11/500/300-->
              <v-card-title class="pb-1" v-if="chosenTrophy">{{ chosenTrophy.title }}</v-card-title>
              <v-card-text v-if="chosenTrophy">{{ chosenTrophy.description }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="12" align="center">
            <v-btn fab color="red" @click="overlaySingleTrofae = false;" fixed style="margin-left: -28px; margin-top: -24px;">X</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>

    <v-container fluid class="success py-1">
        <v-row>
          <v-col cols="12" justify="center" align="center">
            <v-sheet class="header-grey font-weight-bold success">Trofæer</v-sheet>
          </v-col>
        </v-row>
    </v-container>

    <v-container>
      <v-row justify="center">
        <v-col cols="9" >
          <div class="text-center" v-if="user">{{ user.userData.trophies.length }}/{{ allTrophies.length }}</div>
          <v-progress-linear color="success"></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row cols="12">
        <template v-for="(trophy, index) in allTrophies">
          <v-col align="center" md="4" :key="index">
            <span>{{ trophy.title }}</span>
            <v-spacer></v-spacer>
            <v-btn @click="overlaySingleTrofae = !overlaySingleTrofae; chosenTrophy = trophy;" elevation="false" outlined fab> <!--emitSingleTrophy(trophy);-->
              <v-icon large>mdi-trophy</v-icon>
            </v-btn>
          </v-col>
        </template>
      </v-row>
    </v-container>

  </v-sheet>
</template>

<script>
import axios from 'axios';

export default {
  name: "Trofaer",
  data: () => ({
    overlaySingleTrofae: false,
    showSingleTrofae: true,
    
    baseUrl: 'http://localhost:8626/',
    allTrophies: [],
    chosenTrophy: null,
    user: null

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
    },
    getUser() {
      let userId = localStorage.getItem('userId');
      axios({
        method: 'get',
        url: this.baseUrl + 'user/' + userId,
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response);
        this.user = response.data.user;
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.getUser();
    this.getAllTrophies();
  }
};
</script>