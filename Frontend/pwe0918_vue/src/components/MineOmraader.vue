<template>
  <v-sheet width="95vw" height="90vh" light>
    <!-- <v-container id="dropdown-example-1">
      <v-overflow-btn
        class="my-2"
        :items="posetyper"
        label="Overflow Btn"
        target="#dropdown-example-1"
      ></v-overflow-btn>
    </v-container>   -->
    <v-sheet v-if="!showSingleArea">
      <v-container fluid class="header-grey py-1">
        <v-row>
          <v-col cols="12" justify="center" align="center">
            <v-sheet class="header-grey">Mine områder</v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <v-tabs grow v-model="currentTab">
        <v-tab v-for="tab in tabs" :key="tab" :href="'#tab-' + tab">
          {{ tab }}
        </v-tab>
        <v-tabs-items v-model="currentTab">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-sheet v-show="currentTab === 'tab-aktive'">
                  <v-card min-height="93px" class="mb-6" :img="hardcodedImg" v-for="(n, index) in userIncAreas" :key="index" @click="getSingleArea(n.area._id); backToMineOmraader();"> <!--skal have en 'to' prop for routing til området-->
                    <v-card-title class="py-2 area-title">{{ n.area.title }}</v-card-title>
                  </v-card>
                </v-sheet>
                <v-sheet v-show="currentTab === 'tab-gennemførte'">
                  <v-card min-height="93px" :img="hardcodedImg" v-for="(n, index) in userCompAreas" :key="index">
                    <v-card-title class="py-2">{{ n.area.title }}</v-card-title>
                  </v-card>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-tabs-items>
      </v-tabs>
    </v-sheet>
    <v-sheet v-if="showSingleArea">

      <v-overlay v-if="showCompleteAreaDialog">
        <v-card width="300px" height="130px" light>
          <v-card-title class="py-2">Afslut område?</v-card-title>
          <v-divider></v-divider>
          <v-container>
            <v-row>
              <v-col cols="12" align="end">
                <v-btn text @click="showCompleteAreaDialog = false">Anuller</v-btn>
                <v-btn color="success" @click="showCompleteAreaDialog = false; showCompletedAreaStepper = true">Afslut</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-overlay>

      <v-overlay v-if="showCompletedAreaStepper">
        <v-card light width="400"> <!--width="300px" height="320px"-->

          <v-stepper v-model="stepper" :vertical="stepperVertical" class="pb-0 mb-6">
            <v-stepper-step :complete="stepper > 1" step="1">Hvor meget affald samlede du?</v-stepper-step>
            <v-stepper-content step="1" :class="stepper == 1 ? 'allow-overflow' : ''">
              <v-container class="py-0">

                <v-row class="py-0" v-for="(amount, index) in amountOfTrashBags" :key="index">
                  <v-col cols="6" class="pl-0 py-0">
                    <dropdown :options="bagtypes" :placeholder="'Vælg en pose'" :selected="selectedBag" v-on:updateOption="dropdownOnSelect"></dropdown>
                  </v-col>
                  <v-col cols="6" class="pr-0 py-0">
                    <v-text-field class="pt-0" label="Hvor fyldt? %"> <!--append-icon="mdi mdi-percent"-->
                      <template slot="append-outer">
                        <v-btn fab height="28" width="28" elevation="0" color="grey lighten-2" @click="removeTrashBag();">
                          <v-icon>mdi-minus</v-icon>
                        </v-btn>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>

                <v-btn fab height="32" width="32" @click="addTrashBag();" elevation="0" color="grey lighten-2">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-container>
            </v-stepper-content>

            <v-stepper-step :complete="stepper > 2" step="2">Ekstra kommentarer</v-stepper-step>
            <v-stepper-content step="2" class="py-0">
              <v-textarea
                class="mt-2"
                placeholder="Eks. '30% af området var utilgængeligt pga. private ejendomme...'"
                outlined
                label="Valgfrit"
              ></v-textarea>
            </v-stepper-content>
            
            <v-stepper-step :complete="stepper > 3" step="3">Opret</v-stepper-step>
            <v-stepper-content step="3">
            </v-stepper-content>
          </v-stepper>

          <v-container>
            <v-row>
              <v-col cols="12" align="end">
                <v-btn text @click="prevStep();">Tilbage</v-btn>
                <v-btn color="success" @click="nextStep();">Næste</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-overlay>

      <v-container fluid class="header-grey py-1">
        <v-row>
          <v-col cols="12" justify="center" align="center">
            <v-sheet class="header-grey">{{ chosenSingleArea.title }}</v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <v-img :src="hardcodedImg" height="300px" max-height="300px" max-width="100%" class="single-area_img">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="success"></v-progress-circular>
          </v-row>
        </template>
        <v-container>
          <v-row>
            <v-col cols="12" align="center">
              <div class="single-area_btns">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn fab color="success" absolute bottom left v-on="on" @click="areaStarted = !areaStarted; areaStarted ? startSnackbar() : pauseSnackbar();">
                      <v-icon v-if="!areaStarted">mdi-play</v-icon>
                      <v-icon v-else>mdi-pause</v-icon>
                    </v-btn>
                  </template>
                  <span>Start område</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn fab color="success" absolute bottom right v-on="on" @click="showCompleteAreaDialog = true">
                      <v-icon>mdi-flag-variant</v-icon>
                    </v-btn>
                  </template>
                  <span>Afslut område</span>
                </v-tooltip>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
      <v-container class="mt-6">
        <v-row justify="center">
          <v-col cols="10" class="pb-0">
            <v-card flat>
              <v-card-title class="pb-0">Generel data</v-card-title>
              <v-divider></v-divider>
              <v-list dense class="pb-0">
                <v-list-item-group>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-calendar</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        <span>Område oprettet: {{ convertTime(chosenSingleArea.areaCreationDate) }}</span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-calendar-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        <span>Angivet startdato: {{ chosenSingleArea.areaStartDate }}</span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-clock-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        <span>Angivet starttidspunkt: {{ chosenSingleArea.areaStartTime }}</span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="mt-0">
        <v-row justify="center">
          <v-col cols="10" class="pt-0">
            <v-card flat>
              <v-card-title class="py-0">Område data</v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item-group>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-trash-can</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        <span>Skrald (gram): </span>
                        <span v-if="chosenSingleArea.areaDetails">{{ chosenSingleArea.areaDetails.trash }}</span>
                        <span v-else>0</span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-shoe-print</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        <span>Skridt: </span>
                        <span v-if="chosenSingleArea.areaDetails">{{ chosenSingleArea.areaDetails.steps }}</span>
                        <span v-else>0</span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-map-marker-radius</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        <span>Område dækket (m<sup>2</sup>): </span>
                        <span v-if="chosenSingleArea.areaDetails">{{ chosenSingleArea.areaDetails.squareMeters }}</span>
                        <span v-else>0</span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-snackbar multi-line v-model="snackbar" :color="snackbarColor">
      <v-card flat class="py-0" :color="snackbarColor">
        <v-card-title class="py-0 snackbar-text text-center" justify="center">{{ snackbarTitle }}</v-card-title>
        <v-card-text class="py-0 snackbar-text" justify="center"><pre>{{ snackbarText }}</pre></v-card-text>
      </v-card>
      <v-btn color="black" text @click="snackbar = false">Luk</v-btn>
    </v-snackbar>
  </v-sheet>
</template>

<script>
import axios from 'axios';
import { EventBus } from "../event-bus";
import dropdown from 'vue-dropdowns';

export default {
  name: "MineOmraader",
  data: () => ({
    currentTab: 'tab-aktive',
    tabs: [ 'aktive', 'gennemførte' ],
    hardcodedImg: 'https://www.google.com/maps/about/images/mymaps/mymaps-desktop-16x9.png',
    baseUrl: 'http://localhost:8626/',

    userIncAreas: [],
    userCompAreas: [],
    showSingleArea: false,
    chosenSingleArea: null,
    areaStarted: false,
    showCompleteAreaDialog: false,
    showCompletedAreaStepper: false,

    stepper: 1,
    stepperVertical: true,
    backBtnText: 'Anuller',
    nextBtnText: 'Næste',
    trashDialog: false,

    amountOfTrashBags: 1,
    areaDetails: {
      trash: null,
    },
    selectedBag: {name: 'Vælg en posetype'},
    bagtypes: [
      {name: 'Lille pose'},
      {name: 'Mellemstor pose'},
      {name: 'Stor pose'}
    ],

    snackbar: false,
    snackbarTitle: '',
    snackbarText: '',
    snackbarColor: '',
    timeout: 0,

    redirectToMineOmraader: false,

    items: [
        {
          src: 'backgrounds/bg.jpg',
        },
        {
          src: 'backgrounds/md.jpg',
        },
        {
          src: 'backgrounds/bg-2.jpg',
        },
        {
          src: 'backgrounds/md2.jpg',
        },
      ],
      selected: [],
      isDropdownActive: false,
      selectedBagArray: []
  }),
  components: {
    'dropdown': dropdown
  },
  methods: {
    getUser() {
      let userId = localStorage.getItem('userId');

      axios({
        method: 'get',
        url: this.baseUrl + 'user/' + userId,
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response);
        this.userIncAreas = response.data.user.userData.incompleteAreas;
        this.userCompAreas = response.data.user.userData.completedAreas;
      }).catch((error) => {
        console.log(error);
      });
    },
    getSingleArea(aId) {
      axios({
        method: 'get',
        url: this.baseUrl + 'areas/' + aId,
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response);
        this.showSingleArea = true;
        this.chosenSingleArea = response.data.area;
      }).catch((error) => {
        console.log(error);
      });
    },
    nextStep() {
      if (this.stepper === 1) {
        this.stepper++;
      } else if (this.stepper === 2) {
        this.stepper++;
      } else if (this.stepper === 3) {
        this.showCompletedAreaStepper = false;
        this.stepper = 1;
        this.completeSnackbar();
      }
    },
    test() {
      console.log(this.posetyper);
    },
    prevStep() {
      if (this.stepper === 3) {
        this.stepper--;
      } else if (this.stepper === 2) {
        this.stepper--;
      } else if (this.stepper === 1) {
        this.showCompletedAreaStepper = false;
        this.stepper = 1;
      }
    },
    convertTime(time) {
      var d = new Date(time);
      var offset = (new Date().getTimezoneOffset() / 60) * -1;
      var n = new Date(d.getTime() + offset);
      return n.toLocaleString();
    },
    backToMineOmraader() {
      this.redirectToMineOmraader = !this.redirectToMineOmraader;
      EventBus.$emit('back-to-mine-omraader', this.redirectToMineOmraader);
    },
    startSnackbar() {
      this.snackbarTitle = 'Område startet!';
      this.snackbarText = 'Dine fremskridt vil nu blive lagret i applikationen. \nTryk på pause-knappen for at stoppe trackingen.';
      this.snackbarColor = '#3FBF04';
      this.snackbar = true;
    },
    pauseSnackbar() {
      this.snackbarTitle = 'Område midlertidigt stoppet!';
      this.snackbarText = 'Dine fremskridt er gemt. \nTryk på start for at begynde tracking igen.';
      this.snackbarColor = '#ECD665';
      this.snackbar = true;      
    },
    completeSnackbar() {
      this.snackbarTitle = 'Område gennemført!';
      this.snackbarText = 'Tak for at gøre en forskel mod en grønnere natur! \nTryk for at se dit gennemførte område på kortet.';
      this.snackbarColor = '#3FBF04';
      this.snackbar = true;
    },
    dropdownOnSelect(bag) {
      this.selectedBag = bag;
    },
    addTrashBag() {
      // this.amountOfTrashBags++;
    },
    removeTrashBag() {
      // if (this.amountOfTrashBags != 1) {
      //   this.amountOfTrashBags--;
      // }
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>