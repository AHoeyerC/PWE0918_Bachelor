<template>
  <v-sheet width="95vw" height="90vh" light>
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
                  <v-card min-height="93px" class="mb-6" :img="hardcodedImg" v-for="(n, index) in userIncAreas" :key="index" @click="getSingleArea(n.area._id)"> <!--skal have en 'to' prop for routing til området-->
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
        <!-- <v-tab>Aktive</v-tab>
        <v-tab>Gennemførte</v-tab> -->

        <!-- <v-tab-item v-for="n in 2" :key="n">
          <v-item-group>
            <v-item
                v-slot:default="{ active, toggle }"
                v-for="i in 3"
                :key="i">
              <v-skeleton-loader
                class="mx-auto" type="image" boilerplate>
              </v-skeleton-loader>
            </v-item>
          </v-item-group>
        </v-tab-item> -->
                <!--Overlayet scaler efter det indhold der er i den men indholdet i den scaler efter den boks der er fra default
                så jeg har hard fixet det med at den skeletonloader har en størrelse på 350px i width-->
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
        <v-card width="300px" height="320px" light>
          <v-container>
            <v-row>
              <v-col cols="12" align="end">
                <v-btn text @click="showCompleteAreaDialog = false">Tilbage</v-btn>
                <v-btn color="success" @click="showCompleteAreaDialog = false; showCompletedAreaStepper = true">Næste</v-btn>
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
                    <v-btn fab color="success" absolute bottom left v-on="on" @click="areaStarted = !areaStarted">
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
                      <v-list-item-title>Område oprettet:</v-list-item-title>
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
  </v-sheet>
</template>

<script>
import axios from 'axios';

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
  }),
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
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>