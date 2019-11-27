<template>
  <v-sheet>
    <div id="map">
      <div style="position: relative; z-index: 401;">
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="6">
              <v-row justify="center" align="end">
                <template v-if="showStepper">
                  <v-stepper v-model="stepper" :vertical="stepperVertical" class="pb-0">
                    <v-stepper-step :complete="stepper > 1" step="1">Vælg et område</v-stepper-step>
                    <v-stepper-content step="1">
                      <v-btn color="primary" @click="drawArea(); showStepper = false">Start</v-btn>
                      <v-btn color="primary" @click="stepper = 2">Næste</v-btn>
                      <v-btn text @click="resetArea();">Cancel</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="stepper > 2" step="2">Navngiv dit område</v-stepper-step>
                    <v-stepper-content step="2">
                      <v-text-field label="Navn" v-model="selectedAreaName"></v-text-field>
                      <v-btn color="primary" @click="stepper = 3">Næste</v-btn>
                      <v-btn text @click="resetArea();">Cancel</v-btn>
                    </v-stepper-content>
                    
                    <v-stepper-step :complete="stepper > 3" step="3">Vælg dato og tid for gennemførelse</v-stepper-step>
                    <v-stepper-content step="3">
                      <v-card class="mb-12" color="grey lighten-1" height="50px"></v-card>
                      <v-btn color="primary" @click="finishAndCreateArea();">Opret område</v-btn>
                      <v-btn text @click="resetArea();">Cancel</v-btn>
                    </v-stepper-content>
                  </v-stepper>
                </template>
              </v-row>
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

    selectedAreaCoords: [],
    selectedAreaName: '',
    selectedAreaDate: '',
    selectedAreaTime: '',

    snackbar: false,
    snackbarText: 'Område oprettet! \n Tryk for at gå til mine område',
    snackbarColor: '#3FBF04',

    stepper: 1,
    stepperVertical: true,
    showStepper: true,
    justify: 'center',
    alignment: 'end'
  }),
  // watch: {
  //   vertical () {
  //     this.stepper = 2
  //     requestAnimationFrame(() => this.stepper = 1)
  //   }
  // },
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
      let drawnItems = new L.FeatureGroup();
      this.map.addLayer(drawnItems);

      //Leaflet.draw toolbar settings
      let drawControl = new L.Control.Draw({
        draw: {
          circle: false,
          rectangle: false,
          polyline: false,
          marker: false,
          circlemarker: false,
          polygon: false
        },
        edit: {
          featureGroup: drawnItems,
          edit: false
        }
      });

      //Layer color
      // drawControl.setDrawingOptions({
      //   polygon: {
      //     shapeOptions: {
      //         color: '#3FBF04'
      //       }
      //   }
      // });

      this.map.addControl(drawControl);

      this.map.on('draw:created', function(e) {
        let layer  = e.layer;
        drawnItems.addLayer(layer);
        // console.log(`Layer data: ${layer} As GeoJSON: ${layer.toGeoJSON()}`);
        console.log(layer.toGeoJSON());
      })
    },


    // locateUser() {
    //   //what happens when a user locates themselves
    //   let map = this.map;
    //   map.locate({setView: true, watch: true})
    //     .on('locationfound', function(e) {
    //       var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
    //       var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
    //           weight: 1,
    //           color: 'blue',
    //           fillColor: '#cacaca',
    //           fillOpacity: 0.2
    //       });
    //       map.addLayer(marker);
    //       map.addLayer(circle);
    //     })
    //     .on('locationerror', function(e) {
    //       console.log(e);
    //       alert('Location access denied.');
    //     });
    // },

    drawArea() {
      let self = this;
      var areaCoords = new L.Draw.Polygon(this.map).enable();
      
      this.map.on('draw:created', function(e) {
        areaCoords = e.layer;
        // console.log("drawArea() ", areaCoords.toGeoJSON());
        self.selectedAreaCoords = areaCoords.toGeoJSON().geometry.coordinates;
        console.log("selectedCoords ", self.selectedAreaCoords);
        self.showStepper = true;
      })
    },

    finishAndCreateArea() {
      this.stepper = 1;
      this.showStepper = false;
      this.snackbar = true;
    },

    resetArea() {
      this.stepper = 1;
      this.showStepper = false;
      this.selectedAreaCoords = [];
      this.selectedAreaName = '';
    },


    getMapCoordsOnClick() {
      this.map.on('click', function(e) {
        console.log(e.latlng.lat, e.latlng.lng);
      });
    },

    // postArea() {
    //   //get jwt from local
    //   //get userId from local
    //   axios({
    //     method: 'post',
    //     url: 
    //   })
    // },

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
  }
};
</script>

<style lang="scss" scoped>
#map {
  height: 500px;
  position: relative;
  // background-color: red;
}
html,
body {
  height: 800px;
  width: 480px;
  margin: 0px;
}
.v-snack__content {
  color: #000000;
}
</style>