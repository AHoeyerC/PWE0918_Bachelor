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
      <v-btn>
        <v-icon>mdi mdi-flag</v-icon>
        <span>Mine Områder</span>
      </v-btn>
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
  <!-- <v-bottom-navigation
  :value="activeBtn"
  >
    <v-btn>
      <v-icon>mdi-add_circle_outline</v-icon>
      <span>Start Område</span>
    </v-btn>
    <v-btn>
      <v-icon>mdi-emoji_flags</v-icon>
      <span>Mine Områder</span>
    </v-btn>
    <v-btn>
      <v-icon>mdi-format_list_bulleted</v-icon>
      <span>Highscore</span>
    </v-btn>
    <v-btn>
      <v-icon>mdi-emoji_events</v-icon>
      <span>Trofæer</span>
    </v-btn>
  </v-bottom-navigation> -->
</template>

<script>
export default {
  name: "Navigation",

  data: () => ({
        activeBtn: 1, 
  })
};
</script>