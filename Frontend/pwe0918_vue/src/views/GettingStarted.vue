<template>
  <v-sheet light>

    <v-container fluid class="success py-1">
      <v-row>
        <v-col cols="12" justify="center" align="center">
            <v-sheet class="header-grey font-weight-bold success">Getting Started</v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
        <v-row>
            <v-col>
              <v-stepper v-model="e1">
                <v-stepper-header>
                  <v-stepper-step :complete="e1 > 1" step="1" color="success">Opret Område</v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 2" step="2" color="success">Mine Områder</v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 3" step="3" color="success">Leaderboard</v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step step="4" color="success">Trofæer</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>

                  <v-stepper-content step="1">
                    <v-card class="mb-12" height="400px" flat>
                      <v-container class="py-0" align="center">
                        <v-row>
                          <v-col cols="o-2 4" align="center">
                            <v-img src="../../public/img/getting-started/start.png" width="300"></v-img>
                          </v-col>
                          <v-col cols="o-2 4" align="center">
                            <v-img src="../../public/img/getting-started/start-2.png" width="300"></v-img>
                          </v-col>
                          <v-row>
                            <v-col cols="12" align="center">
                            <div>Tryk på 'Start område' for at markere dit ønskede område.</div>
                            <div>Indtegn dernæst dit område, som vil blive gemt i 'Mine områder'.</div>
                            </v-col>
                          </v-row>
                        </v-row>
                      </v-container>
                    </v-card>
                    <v-container class="py-0">
                      <v-row>
                        <v-col cols="12" align="end">
                          <v-btn color="primary" @click="e1 = 2">Fortsæt</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <v-card class="mb-12" height="400px" flat>
                      <v-container>
                        <v-row>
                          <v-col cols="12" align="center" class="pb-0">
                            <v-img src="../../public/img/getting-started/mine.png" width="480"></v-img>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" align="center">
                            <div>Under 'Mine områder' kan dine igangværende samt gennemførte områder findes.</div>
                            <div>Områder kan igangsættes via 'Start'-knappen og kan afsluttes via 'Afslut område'-knappen.</div>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                    <v-container class="py-0">
                      <v-row>
                        <v-col cols="12" align="end">
                          <v-btn color="primary" @click="e1 = 3">Fortsæt</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-stepper-content>

                  <v-stepper-content step="3">
                    <v-card class="mb-12" height="400px" cover flat>
                      <v-container>
                        <v-row>
                          <v-col cols="12" align="center" class="pb-0">
                            <v-img src="../../public/img/getting-started/leader.png"></v-img>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" align="center">
                            <div>Leaderboardet viser dine egne fremskridt i appen såvel som andre brugere.</div>
                            <div>Ved at trykke på en bruger vises yderligere detaljer om denne bruger.</div>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                    <v-container class="py-0">
                      <v-row>
                        <v-col cols="12" align="end">
                          <v-btn color="primary" @click="e1 = 4">Fortsæt</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-stepper-content>

                  <v-stepper-content step="4">
                    <v-card class="mb-12" height="400px" cover flat>
                      <v-container>
                        <v-row>
                          <v-col cols="12" align="center">
                            <v-img src="../../public/img/getting-started/trofae.png" width="400"></v-img>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" align="center">
                            <div>Opnå trofæer ved at gennemføre områder.</div>
                            <div>Tryk ind på et specifikt trofæ for at få et hint til, hvordan det opnås.</div>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                    <v-container class="py-0">
                      <v-row>
                        <v-col cols="12" align="end">
                          <v-btn color="success" @click="pushToFrontpage();">Afslut</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
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
    methods: {
      pushToFrontpage() {
        this.$router.push('/');
      }
    }
  }
</script>