<template>
  <nav>
    <v-overlay
      :opacity="1"
      :absolute= false
      :value="overlayStartOmraade"
      z-index="5000"
    >        
      <StartOmraade
        v-if="showStartOmraade"
      >
      </StartOmraade>
      <v-btn
        fab
        color="red"
        @click="overlayStartOmraade = false"
      >
        X
      </v-btn>
    </v-overlay>
    <v-overlay
      :opacity="1"
      :absolute= false
      :value="overlayMineOmraader"
      z-index="5000"
    >        
      <MineOmraader
        v-if="showMineOmraader"
      >
      </MineOmraader>
      <v-btn
        fab
        color="red"
        @click="overlayMineOmraader = false"
      >
        X
      </v-btn>
    </v-overlay>
    <v-overlay
      :opacity="1"
      :absolute= false
      :value="overlayLeaderboard"
      z-index="5000"
    >        
      <Leaderboard
        v-if="showLeaderboard"
      >
      </Leaderboard>
      <v-btn
        fab
        color="red"
        @click="overlayLeaderboard = false"
      >
        X
      </v-btn>
    </v-overlay>
    <v-overlay
      :opacity="1"
      :absolute= false
      :value="overlayTrofaer"
      z-index="5000"
    >        
      <Trofaer
        v-if="showTrofaer"
      >
      </Trofaer>
      <v-btn
        fab
        color="red"
        @click="overlayTrofaer = false"
      >
        X
      </v-btn>
    </v-overlay>
    <div id="menu">
      <v-btn class="menu-button" @click="() => (showMenu = !showMenu)" :href="!showMenu ? '#0':'#menu'" fab>
        <v-icon
        :class="!showMenu ? 'mdi mdi-plus-circle' : 'mdi mdi-close-circle'">
        </v-icon>
      </v-btn>
        <div class="menu-item">
        <v-btn href="#menu" @click="overlayStartOmraade = !overlayStartOmraade" fab elevation="0">
          <v-icon>mdi mdi-calendar-plus</v-icon>
        </v-btn>
        </div>
        <div class="menu-item">
        <v-btn href="#menu" @click="overlayMineOmraader = !overlayMineOmraader" fab elevation="0">
          <v-icon>mdi mdi-flag</v-icon>
        </v-btn>
    </div>
          <div class="menu-item">
        <v-btn href="#menu" @click="overlayLeaderboard = !overlayLeaderboard" fab elevation="0">
          <v-icon>mdi mdi-format-list-numbered</v-icon>
        </v-btn>
    </div>
        <div class="menu-item">
        <v-btn href="#menu" @click="overlayTrofaer = !overlayTrofaer" fab elevation="0">
          <v-icon>mdi mdi-trophy</v-icon>
        </v-btn>
    </div>
      </div>
  </nav>
</template>

<script>
import StartOmraade from "./StartOmraade"
import MineOmraader from "./MineOmraader"
import Leaderboard from "./Leaderboard"
import Trofaer from "./Trofaer"

export default {
  name: "Navigation",

  components: {
    StartOmraade,
    MineOmraader,
    Leaderboard,
    Trofaer
  },

  data: () => ({
      activeBtn: 4,
      overlayStartOmraade: false,
      overlayMineOmraader: false,
      overlayLeaderboard: false,
      overlayTrofaer: false,
      showStartOmraade: true,
      showMineOmraader: true,
      showLeaderboard: true,
      showTrofaer: true,
      showMenu: false
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
    fetchTrofaer () {
      this.showTrofaer = !this.showTrofaer;
    },
  }
};
</script>