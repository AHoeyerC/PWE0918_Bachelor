<template>
  <v-sheet light> <!--width="45vw" height="48vh"-->
    <v-container class="py-0">
      <v-row>
        <v-col class="pa-0">
          <v-card flat>
            <v-img src="https://picsum.photos/id/11/500/300"></v-img>
            <v-card-title class="pb-1">{{ trofae.title }}</v-card-title>
            <v-card-text>{{ trofaeTekst }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { EventBus } from "../event-bus";
// import axios from 'axios';

export default {
  name: "Trofae",
  data: () => ({
    singleTrophy: null,
    baseUrl: 'http://localhost:8626/'
  }),
  props: ['trofaeTitel', 'trofaeTekst', 'trofaeBillede', 'trofae'],
  methods: {
    // getTrophy(trophyId) {
    //   axios({
    //     method: 'get',
    //     url: this.baseUrl + 'trophies/' + trophyId,
    //     withCredentials: false,
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   }).then((response) => {
    //     console.log(response);
    //   }).catch((error) => {
    //     console.log(error);
    //   });
    // }
  },
  mounted() {
    EventBus.$on('single-trophy', trophy => {
      this.singleTrophy = trophy;
      console.log('got it', this.singleTrophy);
    });
  }
};
</script>