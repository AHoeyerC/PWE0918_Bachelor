<template>
  <v-sheet>
    <div id="map">
      <div style="position: relative; z-index: 401;">
        <v-container fluid>
          <v-row justify="center" align="end" style="height: 700px;" v-if="showStepper">
            <v-col sm="10" md="5">
                <v-sheet>
                  <v-stepper v-model="stepper" :vertical="stepperVertical" class="pb-0 mb-6">
                    <v-stepper-step :complete="stepper > 1" step="1">Vælg et område</v-stepper-step>
                    <v-stepper-content step="1">
                      <v-btn text @click="resetArea();">Anuller</v-btn>
                      <v-btn v-if="!selectedAreaCoords.coordinates.length" color="success" class="mr-3" @click="drawArea(); showStepper = false">Start</v-btn> 
                      <v-btn v-else color="success" @click="stepper = 2">Næste</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="stepper > 2" step="2">Navngiv dit område</v-stepper-step>
                    <v-stepper-content step="2">
                      <v-text-field label="Navn" v-model="selectedAreaName"></v-text-field>
                      <v-btn text @click="resetArea();">Anuller</v-btn>
                      <v-btn color="success" @click="stepper = 3">Næste</v-btn>
                    </v-stepper-content>
                    
                    <v-stepper-step :complete="stepper > 3" step="3">Vælg dato og tid for gennemførelse</v-stepper-step>
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

    <v-btn @click="snackbar = true">End area</v-btn>
    <v-btn @click="showStepper = !showStepper">Toggle stepper</v-btn>

    <v-snackbar v-model="snackbar" :color="snackbarColor">
      {{ snackbarText }}
      <v-btn color="white" text @click="snackbar = false">Luk</v-btn>
    </v-snackbar>

  </v-sheet>
</template>

<script>
import * as L from "leaflet";
import 'leaflet.locatecontrol';
import axios from 'axios';
import 'leaflet-draw';

export default {
  name: "Map",
  data: () => ({
    map: null,
    startCoords: [51.505, -0.09],
    zoomLevel: 13,
    baseUrl: 'http://localhost:8626/',
    hardcodedUser: null,
    drawControl: null,
    drawnItems: null,

    selectedAreaCoords: {
      coordinates: []
    },
    selectedAreaName: '',
    datePicker: new Date().toISOString().substr(0, 10),
    timePicker: null,

    snackbar: false,
    snackbarText: 'Område oprettet! \n Tryk for at gå til mine område',
    snackbarColor: '#3FBF04',

    stepper: 1,
    stepperVertical: true,
    showStepper: true,
    justify: 'center',
    alignment: 'end',

    showDatePicker: false,
    showTimePicker: false
  }),
  methods: {
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
        iconLoading: "mdi mdi-map-marker"
      }).addTo(this.map);

      //hardcoded polygon
      var polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
      ]).addTo(this.map);
      // console.log(polygon);

      //hardcoded popupbind
      polygon.bindPopup(`This area was completed by ${this.hardcodedUser.firstName}!`);

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
          polygon: {
            shapeOptions: {
              color: '#3FBF04'
            }
          }
        },
        edit: {
          featureGroup: this.drawnItems,
          edit: false
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

        // let mappedAreaCoords = []; 
        // areaCoords.toGeoJSON().geometry.coordinates.map(x => mappedAreaCoords.push(x));
        // console.log('mapped:', mappedAreaCoords);

        console.log("selectedCoords ", self.selectedAreaCoords.coordinates);
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
      this.selectedAreaCoords = {};
      this.selectedAreaName = '';
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

    getArea() {
      axios({
        method: 'get',
        url: this.baseUrl + 'areas/5de3ac1e4984104b20738220',
        headers: {
            'Content-Type': 'application/json'
          },
        withCredentials: false
      }).then((response) => {
        console.log("Hardcoded area: ", response);

        // response.data.area.areaLocationData.coordinates.forEach(coord => {
        //   console.log(coord);
        // });

        // let coordsArray = response.data.area.areaLocationData.coordinates;
        // console.log(coordsArray);

        // var polygon = L.polygon([
        //   [-0.121536, 51.502652],
        //   [-0.092182, 51.479031],
        //   [-0.077763, 51.497095]
        // ]).addTo(this.map);
        // console.log(polygon);

        // var polyLayer = L.polygon(coordsArray);
        // console.log(L.polygon(coordsArray), polyLayer);

        // this.drawnItems.addLayer(polyLayer);
        // console.log(this.map);

      }).catch((error) => {
        console.log(error);
      });
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
        // headers: {
        //   'Content-Type': 'application/json'
        // }
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },

    async getUser() {
      try {
        const res = await axios({
          method: 'get',
          url: this.baseUrl + 'user/5dc93efa54cec115542329a7',
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: false
        });
        this.hardcodedUser = res.data.user;
        console.log("GET request user success: ", res.data)
      } catch (e) {
        console.log(e);
      }
    }
  },

  async mounted() {
    await this.getUser(); //await da mounted() ellers ville køre asynkront og dataen fra getUser() først ville komme ind efter den skulle bruges
    this.initMap();
    this.getMapCoordsOnClick();
    console.log("Hardcoded user: ", this.hardcodedUser);
    this.getArea();
  }
};
</script>

<style lang="scss" scoped>
#map {
  height: 700px;
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