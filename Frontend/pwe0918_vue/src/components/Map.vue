<template>
  <v-sheet>

    <v-overlay :opacity="1" :value="overlayHelp" z-index="5000">
      <help v-if="showHelp"></help>
      <v-container>
        <v-row>
          <v-col cols="12" align="center">
            <v-btn fab color="red" @click="overlayHelp = false;" fixed bottom style="margin-left: -28px;">X</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>

    <v-overlay :opacity="1" :value="overlayUserSettings" z-index="5000">        
      <userSettings v-if="showUserSettings" :user="user"></userSettings>
      <v-container>
        <v-row>
          <v-col cols="12" align="center">
            <v-btn fab color="red" @click="overlayUserSettings = false;" fixed bottom style="margin-left: -28px;">X</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>

    <v-app-bar app color="success">
      <div class="d-flex align-center">
        <!-- <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/> -->
      </div>
      <v-spacer></v-spacer>

      <v-tooltip bottom z-index="800">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" @click="overlayHelp = !overlayHelp" fab elevation="0" style="background-color: transparent;">
            <v-icon x-large color="white">mdi mdi-help-circle</v-icon>
          </v-btn>
        </template>
        <span>Hjælp</span>
      </v-tooltip>

      <v-tooltip bottom z-index="800">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" @click="getUserById(); overlayUserSettings = !overlayUserSettings; " fab elevation="0" style="background-color: transparent;">
            <v-icon x-large color="white">mdi mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <span>Brugerindstillinger</span>
      </v-tooltip>

      <!-- <v-btn @click="overlayHelp = !overlayHelp" fab elevation="0" style="background-color: transparent;">
        <v-icon x-large color="white">mdi mdi-help-circle</v-icon>
      </v-btn> -->
      <!-- <v-btn @click="getUserById(); overlayUserSettings = !overlayUserSettings; " fab elevation="0" style="background-color: transparent;">
        <v-icon x-large color="white">mdi mdi-account-circle</v-icon>
      </v-btn> -->
    </v-app-bar>

    <div id="map" style="margin-top: 64px;">
      <div style="position: relative; z-index: 401;">
        <v-container fluid>
          <v-row justify="center" align="end" style="height: calc(100vh - 64px);" v-if="showStepper">
            <v-col sm="10" md="5">
                <v-sheet>
                  <v-stepper v-model="stepper" :vertical="stepperVertical" class="pb-0 mb-6">
                    <v-stepper-step :complete="stepper > 1" step="1" color="success">Vælg et område</v-stepper-step>
                    <v-stepper-content step="1">
                      <v-btn text @click="resetArea();">Anuller</v-btn>
                      <v-btn v-if="!selectedAreaCoords.coordinates.length" color="success" class="mr-3" @click="drawArea(); showStepper = false">Start</v-btn> 
                      <v-btn v-else color="success" @click="stepper = 2">Næste</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="stepper > 2" step="2" color="success">Navngiv dit område</v-stepper-step>
                    <v-stepper-content step="2">
                      <v-text-field label="Navn" v-model="selectedAreaName"></v-text-field>
                      <v-btn text @click="resetArea();">Anuller</v-btn>
                      <v-btn color="success" @click="stepper = 3">Næste</v-btn>
                    </v-stepper-content>
                    
                    <v-stepper-step :complete="stepper > 3" step="3" color="success">Vælg dato og tid for gennemførelse</v-stepper-step>
                    <v-stepper-content step="3">
                      <v-dialog v-model="showDatePicker" width="290px">
                        <template v-slot:activator="{ on }" v-on="on">
                          <v-container class="pa-0">
                            <v-row>
                              <v-col cols="5">
                                <v-btn @click="showDatePicker = !showDatePicker">
                                  <v-icon class="mdi mdi-calendar-blank"></v-icon>
                                </v-btn>
                              </v-col>
                              <v-col cols="5">
                                <v-text-field v-model="datePicker" readonly reverse class="pt-0 mt-0"></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </template>
                        <v-card>
                          <v-card-text class="pa-0">
                            <v-date-picker v-model="datePicker"></v-date-picker>
                          </v-card-text>
                          <v-divider></v-divider>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="showDatePicker = false; resetDatePicker();">
                              Anuller
                            </v-btn>
                            <v-btn color="success" @click="showDatePicker = false;">
                              Gem
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                      <v-dialog v-model="showTimePicker" width="290px">
                        <template v-slot:activator="{ on }" v-on="on">
                          <v-container class="pa-0">
                            <v-row>
                              <v-col cols="5">
                                <v-btn @click="showTimePicker = !showTimePicker">
                                  <v-icon class="mdi mdi-clock-outline"></v-icon>
                                </v-btn>
                              </v-col>
                              <v-col cols="5">
                                <v-text-field v-model="timePicker" readonly reverse class="pt-0 mt-0"></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </template>
                        <v-card>
                          <v-card-text class="pa-0">
                            <v-time-picker v-model="timePicker" format="24hr"></v-time-picker>
                          </v-card-text>
                          <v-divider></v-divider>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="showTimePicker = false; resetTimePicker();">
                              Anuller
                            </v-btn>
                            <v-btn color="success" @click="showTimePicker = false;">
                              Gem
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                      <v-card>
                        <v-spacer></v-spacer>
                        <v-btn text @click="resetArea();" class="my-6">Anuller</v-btn>
                        <v-btn color="success" @click="finishAndCreateArea();" class="my-6">Opret område</v-btn>
                      </v-card>
                    </v-stepper-content>
                  </v-stepper>
                </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </div> <!--height: 50px; width: 50px; background-color: red; position: absolute; bottom: 0; -->
    </div>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      {{ snackbarText }}
      <v-btn color="white" text @click="snackbar = false">Luk</v-btn>
    </v-snackbar>

  </v-sheet>
</template>

<script>
import UserSettings from "./UserSettings"
import Help from "./Help"
import * as L from "leaflet";
import 'leaflet.locatecontrol';
import axios from 'axios';
import 'leaflet-draw';
import { EventBus } from '../event-bus';

export default {
  name: "Map",
  components: {
    UserSettings,
    Help,
  },
  data: () => ({
    overlayUserSettings: false,
    showUserSettings: true,

    overlayHelp: false,
    showHelp: true,

    map: null,
    startCoords: [57.04257426721396, 9.916877746582031], //[51.505, -0.09]
    zoomLevel: 13,
    baseUrl: 'http://localhost:8626/',
    hardcodedUser: null,
    hardcodedArea: null,
    drawControl: null,
    drawnItems: null,
    user: null,

    selectedAreaCoords: {
      coordinates: []
    },
    selectedAreaName: '',
    datePicker: new Date().toISOString().substr(0, 10),
    timePicker: null,

    snackbar: false,
    snackbarText: 'Område oprettet! \n Gå til "Mine Områder" for at se dit ny-oprettede område.',
    snackbarColor: '#3FBF04',

    stepper: 1,
    stepperVertical: true,
    showStepper: false,
    justify: 'center',
    alignment: 'end',

    showDatePicker: false,
    showTimePicker: false,

    polygonColorNew: '#3FBF04'
  }),
  methods: {
    fetchSettings () {
      this.showUserSettings = !this.showUserSettings
    },

    fetchHelp () {
      this.showHelp = !this.showHelp
    },

    initMap() {
      //creates a map, targets the DOM element with the ID 'map'
      this.map = L.map("map", {
        center: this.startCoords,
        zoom: this.zoomLevel,
        draggable: true
      });

      //sets the tilelayer, {s} is for subdomains, {z} is zoom level, {x} & {y} are tile coords,
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' //most map tiles require attribution
      }).addTo(this.map);

      //'find me' using locatecontrol
      L.control.locate({
        strings: {
            title: "Klik for at finde din lokation"
        },
        icon: "mdi mdi-map-marker",
        iconLoading: "mdi mdi-timer-sand"
      }).addTo(this.map);

      //Reverses the order since GeoJSON saves as LngLat, but Leaflet uses LatLng
      let mappedArray = [];
      if (this.hardcodedArea != null) {
        this.hardcodedArea.areaLocationData.coordinates.forEach(element => {
          element.forEach(coord => {
            mappedArray.push(coord.reverse());
          });
        });
        console.log("mapped", mappedArray);
        L.polygon(mappedArray).addTo(this.map); //may need to be put somewhere else, i dun goofed
      }


      //Leaflet.draw
      this.drawnItems = new L.FeatureGroup();
      this.map.addLayer(this.drawnItems);

      //Leaflet.draw toolbar settings
      this.drawControl = new L.Control.Draw({
        draw: {
          circle: false,
          rectangle: false,
          polyline: false,
          marker: false,
          circlemarker: false,
          polygon: false,
        },
        edit: {
          featureGroup: this.drawnItems,
          edit: false,
          remove: false
        }
      });

      this.map.addControl(this.drawControl);

      let self = this; 
      this.map.on('draw:created', function(e) {
        let layer  = e.layer;
        self.drawnItems.addLayer(layer);
        console.log(layer.toGeoJSON());
      })
    },

    drawArea() {
      let self = this;
      var areaCoords = new L.Draw.Polygon(this.map).enable();
      
      this.map.on('draw:created', function(e) {
        areaCoords = e.layer;
        self.selectedAreaCoords.coordinates = areaCoords.toGeoJSON().geometry.coordinates;
        self.selectedAreaCoords.coordinates[0].pop(); //removes the last 'closing' coordinate that is the same as coord 1
        console.log("selectedCoords ", self.selectedAreaCoords.coordinates);

        // let mappedAreaCoords = []; 
        // areaCoords.toGeoJSON().geometry.coordinates.map(x => mappedAreaCoords.push(x));
        // console.log('mapped:', mappedAreaCoords);

        self.showStepper = true;
      })
    },

    finishAndCreateArea() {
      this.stepper = 1;
      this.showStepper = false;
      this.snackbar = true;
      console.log('Area:', this.selectedAreaCoords.coordinates,'\n', 'Name:', this.selectedAreaName,'\n', 'Date:', this.datePicker,'\n', 'Time:', this.timePicker);
      this.postArea();
    },
    resetArea() {
      this.stepper = 1;
      this.showStepper = false;
      this.selectedAreaCoords = {
        coordinates: []
      };
      this.selectedAreaName = '';
      this.map.removeLayer(this.drawnItems);
      this.drawnItems = new L.FeatureGroup();
      this.map.addLayer(this.drawnItems);
      console.log(this.map);
    },
    resetDatePicker() {
      this.datePicker = new Date().toISOString().substr(0, 10);
    },
    resetTimePicker() {
      this.timePicker = null;
    },
    getMapCoordsOnClick() {
      this.map.on('click', function(e) {
        console.log(e.latlng.lat, e.latlng.lng);
      });
    },

    getAllAreas() {
      axios({
        method: 'get',
        url: this.baseUrl + 'areas',
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: false
      }).then((response) => {
        console.log("GET ALL: ", response); 

        response.data.areas.forEach(area => {
          let mappedData = [];
          area.areaLocationData.coordinates.forEach(el => {
            el.forEach(coord => {
              mappedData.push(coord.reverse());
            });
          });
          let poly = L.polygon(mappedData).addTo(this.map);
          if (area.areaCompleted) {
            poly.bindPopup(`Dette område er opryddet af ${area.user.username}!`);
            poly.setStyle({fillColor: this.polygonColorNew, color: this.polygonColorNew});
          } else {
            poly.bindPopup(`Dette område er blevet registreret af ${area.user.username}!`);
          }
        });
      }).catch((error) => {
        console.log(error); 
      });
    },

    async getArea() {
      try {
        const res = await axios({
          method: 'get',
          url: this.baseUrl + 'areas/5de4eaf25a0af05be0e7aa7',
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: false
        });
        this.hardcodedArea = res.data.area;
        console.log("GET request area success: ", res.data)
      } catch (e) {
        console.log(e);
      }
    },

    postArea() {
      // let jwt = localStorage.getItem("jwt");
      let userId = localStorage.getItem("userId");

      let area = {
        title: this.selectedAreaName,
        userId: userId,
        areaStartDate: this.datePicker,
        areaStartTime: this.timePicker,
        areaLocationData: {
          coordinates: this.selectedAreaCoords.coordinates
        }
      };

      axios({
        method: 'post',
        url: this.baseUrl + 'areas',
        data: area,
        withCredentials: false
      }).then((response) => {
        console.log(response);
        this.addAreaToUser(userId, response.data.createdArea._id); //forwards the userId from localstorage and the newly created areaId to the 'addAreaToUser' method
      }).catch((error) => {
        console.log(error);
      });
    },

    addAreaToUser(userId, aId) {
      let area = {
        areaId: aId
      };
      axios({
        method: 'post',
        url: this.baseUrl + 'user/addArea/' + userId,
        data: area,
        withCredentials: false
      }).then((response) => {
        console.log("addAreaToUser:", response);
      }).catch((error) => {
        console.log(error);
      })
    },
    getUserById() {
      let userId = localStorage.getItem("userId");
      axios({
        method: 'get',
        url: this.baseUrl + 'user/' + userId,
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response);
        this.user = response.data.user;
      }).catch((error) => {
        console.log(error);
      });
    },

    // async getUser() {
    //   try {
    //     const res = await axios({
    //       method: 'get',
    //       url: this.baseUrl + 'user/5dc93efa54cec115542329a7',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       withCredentials: false
    //     });
    //     this.hardcodedUser = res.data.user;
    //     console.log("GET request user success: ", res.data)
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
  },

  async mounted() {
    //await da mounted() ellers ville køre asynkront og dataen fra getUser() først ville komme ind efter den skulle bruges
    // await this.getUser(); 
    // console.log("Hardcoded user: ", this.hardcodedUser);

    // await this.getArea();
    this.initMap();
    this.getMapCoordsOnClick();
    this.getAllAreas();

    //start an area
    EventBus.$on('start-area', showStartOmraade => {
      this.showStepper = showStartOmraade;
    });
  }
};
</script>

<style lang="scss" scoped>
#map {
  // height: 700px;
  height: calc(100vh - 64px);
  position: relative;
}
html,
body {
  height: 800px;
  width: 480px;
  margin: 0px;
}
.v-dialog__content {
  z-index: 2500 !important;
}
</style>