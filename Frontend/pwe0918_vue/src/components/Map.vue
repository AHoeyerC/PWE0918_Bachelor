<template>
  <v-sheet>
    <div id="map"></div>
    <v-btn>Trigger</v-btn>
  </v-sheet>
</template>

<script>
import * as L from "leaflet";
import 'leaflet.locatecontrol';

export default {
  name: "Map",
  data: () => ({}),
  methods: {
    initMap() {
      //creates a map, targets the DOM element with the ID 'map' and sets the view using coords + the zoom amount
      let map = L.map("map").setView([51.505, -0.09], 13);
      console.log(map);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        //sets the tilelayer, {s} is for subdomains, {z} is zoom level, {x} & {y} are tile coords,
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' //most map tiles require attribution
      }).addTo(map); //adds the tilelayer and attribution configuration to the map
      L.control.locate({
        strings: {
            title: "Klik for at finde din lokation"
        },
        icon: "mdi mdi-map-marker"
      }).addTo(map);
    }
  },
  mounted() {
    this.initMap(); //inits map
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
</style>