<template>
  <v-sheet width="95vw" height="90vh" light>
    <v-container fluid class="header-grey py-1">
      <v-row>
        <v-col cols="12" justify="center" align="center">
          <v-sheet class="header-grey">
            Leaderboard - {{ activeFilter }}
            <v-menu left offset-y>
              <template v-slot:activator="{ on }">
                <v-btn color="black" icon dark v-on="on">
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(filter, index) in filters" :key="index" @click="activeFilter = filter; changeSort();">
                  <v-list-item-title>{{ filter }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-sheet>
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
              <v-sheet v-show="currentTab === 'tab-uge'">
                <v-btn @click="changeSort">change sort</v-btn> current sort: {{ defaultSort }}
                <v-list>
                  <v-list-item-group>
                    <v-list-item color="success" disabled> <!--Header-->
                      <v-container fluid class="py-0">
                        <v-row>
                          <v-col cols="2" class="py-0">
                            <v-list-item-content>
                              <v-list-item-title>Rank</v-list-item-title>
                            </v-list-item-content>
                          </v-col>
                          <v-col cols="3" class="py-0">
                            <v-list-item-content>
                              <v-list-item-title>Antal m2</v-list-item-title>
                            </v-list-item-content>
                          </v-col>
                          <v-col cols="4" class="py-0">
                            <v-list-item-content>
                              <v-list-item-title>Skridt</v-list-item-title>
                            </v-list-item-content>
                          </v-col>
                          <v-col cols="3" class="py-0" align="end">
                            <v-list-item-content>
                              <v-list-item-title>Affald</v-list-item-title>
                            </v-list-item-content>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-list-item>
                    <v-list-item v-for="(user, index) in todos" :key="user._id">
                      <v-container fluid class="py-0">
                        <v-row>
                          <v-col cols="2" class="py-0">
                            <v-list-item-content>
                              <v-list-item-title>{{ index+1 }}</v-list-item-title>
                            </v-list-item-content>
                          </v-col>
                          <v-col cols="3" class="py-0">
                            <v-list-item-content>
                              <v-list-item-title>{{ user.userData.totalSqMeters }}</v-list-item-title>
                            </v-list-item-content>
                          </v-col>
                          <v-col cols="4" class="py-0">
                            <v-list-item-content>
                              <v-list-item-title>{{ user.userData.totalSteps }}</v-list-item-title>
                            </v-list-item-content>
                          </v-col>
                          <v-col cols="3" class="py-0" align="end">
                            <v-list-item-content>
                              <v-list-item-title>{{ user.userData.totalTrashInGram }}</v-list-item-title>
                            </v-list-item-content>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-sheet>
              <v-sheet v-show="currentTab === 'tab-måned'">
                Hej 2
              </v-sheet>
              <v-sheet v-show="currentTab === 'tab-altid'">
                Hej 3
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-items>
    </v-tabs>
  </v-sheet>
</template>

<script>
import axios from 'axios';
  export default {
    name: "Leaderboard",
    data () {
      return {
        filters: ['Skridt', 'Affald', 'Antal områder'],
        activeFilter: 'Skridt',

        tabs: [ 'uge', 'måned', 'altid' ],
        currentTab: 'tab-uge',

        sortBySteps: true,
        sortByTrash: false,
        defaultSort: 'steps',
        steps: 0,
        trash: 0,
        sqMeters: 0,

        baseUrl: 'http://localhost:8626/',
        allUsers: [],
      }
    },
    watch: {
      activeFilter: function() {
        this.changeSort();
      }
    },
    methods: {
      async getAllUsers() {
        axios({
          method: 'get',
          url: this.baseUrl + 'user',
          withCredentials: false,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          this.allUsers = response.data.users;
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
      },
      changeSort() {
        if (this.activeFilter == 'Skridt') {
          this.sortBySteps = true;
          this.sortByTrash = false;
        } else if (this.activeFilter == 'Affald') {
          this.sortByTrash = true;
          this.sortBySteps = false;
        } else {
          this.sortBySteps = false;
          this.sortByTrash = false;
        }
        // this.sortBySteps = !this.sortBySteps;
        // if (this.sortBySteps) {
        //   this.sort = 'steps';
        // } else if (this.sortByTrash) {
        //   this.sort = 'trash';
        // } else {
        //   this.sort = 'sqMeters';
        // }
      }
    },
    computed: {
      todos() {
        let result = this.allUsers;
        // let result = [
        //   { id:1, text: "Learn JavaScript", show: true, price: 100, duration: 2 },
        //   { id:2, text: "Learn Vue", show: true, price: 200, duration: 1 },
        //   { id:3, text: "Play around in JSFiddle", show: true, price: 500, duration: 5 },
        //   { id:4, text: "Build something awesome", show: true, price: 550, duration: 4 }
        // ];
        // result = result.filter(todo => todo.price >= this.price);
        result = result.filter(user => user.userData.totalSteps >= this.steps);

        // if(this.sortByPrice) {
        //   return result.sort(function(a, b) {
        //     return b.price - a.price;
        //   });
        // } else {
        //   return result.sort(function(a, b) {
        //     return a.duration - b.duration;
        //   });
        // }

        if(this.sortBySteps) {
          return result.sort(function(a,b) {
            return b.userData.totalSteps - a.userData.totalSteps;
          });
        } else if(this.sortByTrash) {
          return result.sort(function(a,b) {
            return b.userData.totalTrashInGram - a.userData.totalTrashInGram;
          });
        } else {
          return result.sort(function(a,b) {
            return b.userData.totalSqMeters - a.userData.totalSqMeters;
          });
        }
      }
    },
    async mounted() {
      await this.getAllUsers();
    }
  }
</script>