<template>
  <nav>
    <div>
      <v-btn>
        <v-icon>mdi mdi-plus-circle</v-icon>
      </v-btn>
      <div>
        <v-btn>
          <v-icon>mdi mdi-calendar-plus</v-icon>
          <span>Start Område</span>
        </v-btn>
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
        <v-btn>
          <v-icon>mdi mdi-format-list-bulleted</v-icon>
          <span>Highscore</span>
        </v-btn>
        <v-btn>
          <v-icon>mdi mdi-trophy</v-icon>
          <span>Trofæer</span>
        </v-btn>
      </div>
    </div>
  </nav>
</template>

<script>
import MineOmraader from "./MineOmraader"

export default {
  name: "Navigation",

  components: {
    MineOmraader
  },

  data: () => ({
      activeBtn: 1,
      overlay: false,
      showMineOmraader: true,
  }),
  methods: {
    fetchOmråder () {
      this.showMineOmraader = !this.showMineOmraader;
    },
  }
};
</script>