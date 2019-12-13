<template>
  <v-sheet
    light
  >
    <v-container fluid class="header-grey py-1">
      <v-row>
        <v-col cols="12" justify="center" align="center">
            <v-sheet class="header-grey font-weight-bold">Getting Started</v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
        <v-row>
            <v-col>
              <v-stepper v-model="e1">
                <v-stepper-header>
                  <v-stepper-step :complete="e1 > 1" step="1">Opret Område</v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 2" step="2">Mine Områder</v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 3" step="3">Leaderboard</v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step step="4">Trofæer</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card
                      class="mb-12"
                      height="500px"
                    >
                      <v-img src="https://picsum.photos/id/11/500/300"></v-img>
                      <div>Hej jeg skal forklare dig hvad du kan på trofæer siden.</div>
                    </v-card>

                    <v-btn
                      color="primary"
                      @click="e1 = 2"
                    >
                      Fortsæt
                    </v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <v-card
                      class="mb-12"
                      height="500px"
                    >
                      <v-img src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"></v-img>
                      <div>Hej jeg skal forklare dig hvad du kan på trofæer siden.</div>
                    </v-card>

                    <v-btn
                      color="primary"
                      @click="e1 = 3"
                    >
                      Fortsæt
                    </v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="3">
                    <v-card
                      class="mb-12"
                      height="500px"
                      cover
                    >
                      <v-img src="https://cdn.vuetifyjs.com/images/carousel/planet.jpg"></v-img>
                      <div>Hej jeg skal forklare dig hvad du kan på trofæer siden.</div>
                    </v-card>

                    <v-btn
                      color="primary"
                      @click="e1 = 4"
                    >
                      Fortsæt
                    </v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="4">
                    <v-card
                      class="mb-12"
                      height="500px"
                      cover
                    >
                      <v-img src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"></v-img>
                      <div>Hej jeg skal forklare dig hvad du kan på trofæer siden.</div>
                    </v-card>

                    <v-btn
                      color="primary"
                      @click="e1 = 1"
                    >
                      Afslut
                    </v-btn>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-col>
        </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
  export default {
    data () {
      return {
        e1: 0,
      }
    },
  }
</script>