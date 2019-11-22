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
          <span>Highscore</span>
        </v-btn>
        <v-overlay
            :opacity="100"
            :absolute= false
            :value="overlay"
        >        
         <Highscore
          v-if="showHighscore"
          >
          </Highscore>
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
import Highscore from "./Highscore"
import Trofae from "./Trofae"

export default {
  name: "Navigation",

  components: {
    StartOmraade,
    MineOmraader,
    Highscore,
    Trofae
  },

  data: () => ({
      activeBtn: 4,
      overlay: false,
      showStartOmraade: true,
      showMineOmraader: true,
      showHighscore: true,
      showTrofae: true
  }),
  methods: {
    fetchStart () {
      this.showStartOmraade = !this.showStartOmraade
    },
    fetchOmraader () {
      this.showMineOmraader = !this.showMineOmraader;
    },
    fetchHighscore () {
      this.showHighscore = !this.showHighscore;
    },
    fetchTrofae () {
      this.showTrofae = !this.showTrofae;
    },

  }
};
</script>