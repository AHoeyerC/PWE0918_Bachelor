<template>
<!-- <v-toolbar>
  <ul id="menu">
        <a class="menu-button icon-plus" href="#menu" title="Show navigation"><span class="mdi mdi-close"></span></a>
        <a class="menu-button icon-minus" href="#0" title="Hide navigation"><span class="mdi mdi-close"></span></a>
        
        <li class="menu-item">
        <a href="#menu" @click="overlayStartOmraade = !overlayStartOmraade">
        <span class="mdi mdi-calendar-plus">Start Område</span>
        </a>
        <v-overlay
            :opacity="100"
            :absolute= true
            :value="overlayStartOmraade"
            :z-index="404"
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
    </li>
    <li class="menu-item">
        <a href="#menu" @click="overlayMineOmraader = !overlayMineOmraader">
        <span class="mdi mdi-flag">Mine Områder</span>
        <v-overlay
            :opacity="100"
            :absolute= true
            :value="overlayMineOmraader"
            :z-index="404"
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
        </a>
        
    </li>
    <li class="menu-item">
        <a href="#menu" @click="overlayLeaderboard = !overlayLeaderboard">
        <span class="mdi mdi-format-list-bulleted">Leaderboard</span>
        </a>
        <v-overlay
            :opacity="100"
            :absolute= true
            :value="overlayLeaderboard"
            :z-index="404"
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
    </li>
    <li class="menu-item">
        <a href="#menu" @click="overlayTrofae = !overlayTrofae">
        <span class="mdi mdi-trophy">Trofæer</span>
        </a>
        <v-overlay
            :opacity="100"
            :absolute= true
            :value="overlayTrofae"
            :z-index="504"
        >        
         <Trofae
          v-if="showTrofae"
          >
          </Trofae>
          <v-btn
            fab
            color="red"
           @click="overlayTrofae = false"
          >
            X
          </v-btn>
        </v-overlay>
    </li>
    </ul>
</v-toolbar> -->
  <nav>
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
        </div>
        <div class="menu-item">
        <v-btn href="#menu" @click="overlayMineOmraader = !overlayMineOmraader" fab elevation="0">
          <v-icon>mdi mdi-flag</v-icon>
        </v-btn>
        <v-overlay
            :opacity="1"
            :absolute= false
            :value="overlayMineOmraader"
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
    </div>
          <div class="menu-item">
        <v-btn href="#menu" @click="overlayLeaderboard = !overlayLeaderboard" fab elevation="0">
          <v-icon>mdi mdi-format-list-numbered</v-icon>
        </v-btn>
        <v-overlay
            :opacity="1"
            :absolute= false
            :value="overlayLeaderboard"
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
    </div>
        <div class="menu-item">
        <v-btn href="#menu" @click="overlayTrofae = !overlayTrofae" fab elevation="0">
          <v-icon>mdi mdi-trophy</v-icon>
        </v-btn>
        <v-overlay
            :opacity="1"
            :absolute= false
            :value="overlayTrofae"
        >        
         <Trofae
          v-if="showTrofae"
          >
          </Trofae>
          <v-btn
            fab
            color="red"
           @click="overlayTrofae = false"
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
      overlayStartOmraade: false,
      overlayMineOmraader: false,
      overlayLeaderboard: false,
      overlayTrofae: false,
      showStartOmraade: true,
      showMineOmraader: true,
      showLeaderboard: true,
      showTrofae: true,
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
    fetchTrofae () {
      this.showTrofae = !this.showTrofae;
    },

  }
};
</script>