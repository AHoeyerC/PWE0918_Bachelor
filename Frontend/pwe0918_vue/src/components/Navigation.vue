<template>
  <nav>
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

            <v-container>
              <v-row>
                <v-col cols="12" align="center">
                  <v-btn fab color="red" @click="isSingleAreaShowing ? redirectToMineOmraader() : overlayMineOmraader = false;" fixed bottom style="margin-left: -28px;">X</v-btn>
                </v-col>
              </v-row>
            </v-container>

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
          <v-container>
              <v-row>
                <v-col cols="12" align="center">
                  <v-btn fab color="red" @click="overlayLeaderboard = false;" fixed bottom style="margin-left: -28px;">X</v-btn>
                </v-col>
              </v-row>
            </v-container>
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
        <v-btn href="#menu" @click="fetchStart();" fab elevation="0"> <!--overlayStartOmraade = !overlayStartOmraade-->
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
// import StartOmraade from "./StartOmraade";
import MineOmraader from "./MineOmraader";
import Leaderboard from "./Leaderboard";
import Trofaer from "./Trofaer";
import { EventBus } from "../event-bus";

export default {
  name: "Navigation",

  components: {
    // StartOmraade,
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
      
      showMineOmraader: true,
      showLeaderboard: true,
      showTrofaer: true,
      showMenu: false,

      showStartOmraade: false,
      backToMineOmraader: false,
      isSingleAreaShowing: false
  }),
  methods: {
    fetchStart () {
      this.showStartOmraade = !this.showStartOmraade;
      EventBus.$emit('start-area', this.showStartOmraade);
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
    redirectToMineOmraader() {
      EventBus.$emit('back-to-mine-omraader', this.backToMineOmraader);
      console.log('from nav', this.backToMineOmraader);
    }
  },
  mounted() {
    EventBus.$on('show-single-area', showSingleArea => {
      this.isSingleAreaShowing = showSingleArea;
    });
  }
};
</script>