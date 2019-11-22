<template>
  <nav>
    <div>
      <v-btn>
        <v-icon>mdi mdi-plus-circle</v-icon>
      </v-btn>
      <div>
        <v-btn @click="overlay = !overlay">
          <v-icon>mdi mdi-calendar-plus</v-icon>
          <span>Start Område</span>
        </v-btn>
        <v-overlay
            :opacity="100"
            :absolute= false
            :value="overlay"
        >        
         <StartOmraade
          v-if="showStartOmraade"
          >
          </StartOmraade>
          <v-btn
            fab
            color="red"
           @click="overlay = false"
          >
            X
          </v-btn>
        </v-overlay>
        <v-btn @click="overlay = !overlay">
          <v-icon>mdi mdi-flag</v-icon>
          <span>Mine Områder</span>
        </v-btn>
        <v-overlay
            :opacity="100"
            :absolute= false
            :value="overlay"
        >        
        <MineOmraader
          v-if="showMineOmraader"
        >
        </MineOmraader>
            <v-btn
              fab
              color="red"
              @click="overlay = false"
            >
              X
            </v-btn>
          </v-overlay>
        <v-btn @click="overlay = !overlay">
          <v-icon>mdi mdi-format-list-bulleted</v-icon>
          <span>Leaderboard</span>
        </v-btn>
        <v-overlay
            :opacity="100"
            :absolute= false
            :value="overlay"
        >        
         <Leaderboard
          v-if="showLeaderboard"
          >
          </Leaderboard>
          <v-btn
            fab
            color="red"
           @click="overlay = false"
          >
            X
          </v-btn>
        </v-overlay>
        <v-btn @click="overlay = !overlay">
          <v-icon>mdi mdi-trophy</v-icon>
          <span>Trofæer</span>
        </v-btn>
        <v-overlay
            :opacity="100"
            :absolute= false
            :value="overlay"
        >        
         <Trofae
          v-if="showTrofae"
          >
          </Trofae>
          <v-btn
            fab
            color="red"
           @click="overlay = false"
          >
            X
          </v-btn>
        </v-overlay>
      </div>
    </div>
  </nav>
</template>

<script>
import StartOmraade from "./StartOmraade"
import MineOmraader from "./MineOmraader"
import Leaderboard from "./Leaderboard"
import Trofae from "./Trofae"

export default {
  name: "Navigation",

  components: {
    StartOmraade,
    MineOmraader,
    Leaderboard,
    Trofae
  },

  data: () => ({
      activeBtn: 4,
      overlay: false,
      showStartOmraade: true,
      showMineOmraader: true,
      showLeaderboard: true,
      showTrofae: true
  }),
  methods: {
    fetchStart () {
      this.showStartOmraade = !this.showStartOmraade
    },
    fetchOmraader () {
      this.showMineOmraader = !this.showMineOmraader;
    },
    fetchLeaderboard () {
      this.showLeaderboard = !this.showLeaderboard;
    },
    fetchTrofae () {
      this.showTrofae = !this.showTrofae;
    },

  }
};
</script>