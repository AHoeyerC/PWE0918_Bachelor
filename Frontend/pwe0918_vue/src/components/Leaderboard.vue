<template>
  <v-sheet width="95vw" height="90vh" light>
    <v-container fluid class="success py-1">
      <v-row>
        <v-col cols="12" justify="center" align="center">
          <v-sheet class="header-grey font-weight-bold success" v-if="!showDisplayUser">
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
          <v-sheet class="header-grey font-weight-bold success" v-else>
            Profil
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-sheet v-if="!showDisplayUser">
      <v-tabs grow v-model="currentTab" color="success">
        <v-tab v-for="tab in tabs" :key="tab" :href="'#tab-' + tab" >
          {{ tab }}
        </v-tab>
        <v-tabs-items v-model="currentTab">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-sheet v-show="currentTab === 'tab-uge'">
                  <v-list>
                    <v-list-item-group>
                      <v-list-item color="success" disabled> <!--Header-->
                        <v-container fluid class="py-0">
                          <v-row>
                            <v-col cols="1" class="py-0">
                              <v-list-item-content>
                                <v-list-item-title>Rank</v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                            <v-col cols="5" class="py-0">
                              <v-list-item-content>
                                <v-list-item-title>Brugernavn</v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                            <v-col cols="2" class="py-0" align="end">
                              <v-list-item-content>
                                <v-list-item-title>Område dækket</v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                            <v-col cols="2" class="py-0" align="end">
                              <v-list-item-content>
                                <v-list-item-title>Skridt</v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                            <v-col cols="2" class="py-0" align="end">
                              <v-list-item-content>
                                <v-list-item-title>Affald</v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-list-item>
                      <v-list-item v-for="(user, index) in sortedUsers" :key="user._id" @click="getSingleUser(user._id)" :class="index == 0? 'leaderboard-no-1' : index == 1 ? 'leaderboard-no-2' : index == 2 ? 'leaderboard-no-3' : ''">
                        <v-container fluid class="py-0">
                          <v-row>
                            <v-col cols="1" class="py-0">
                              <v-list-item-content>
                                <v-list-item-title>{{ index+1 }}</v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                            <v-col cols="5" class="py-0">
                              <v-list-item-content>
                                <v-list-item-title>{{ user.username }}</v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                            <v-col cols="2" class="py-0" align="end">
                              <v-list-item-content>
                                <v-list-item-title>{{ user.userData.totalSqMeters }} m<sup>2</sup></v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                            <v-col cols="2" class="py-0" align="end">
                              <v-list-item-content>
                                <v-list-item-title>{{ user.userData.totalSteps }}</v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                            <v-col cols="2" class="py-0" align="end">
                              <v-list-item-content>
                                <v-list-item-title>{{ user.userData.totalTrashInGram }} g</v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-sheet>
                <v-sheet v-show="currentTab === 'tab-måned'">
                  Implementeres i senere version
                </v-sheet>
                <v-sheet v-show="currentTab === 'tab-altid'">
                  Implementeres i senere version
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-tabs-items>
      </v-tabs>
    </v-sheet>
    <v-sheet v-if="showDisplayUser">
      <DisplayProfile :user="chosenUser"></DisplayProfile>
    </v-sheet>
  </v-sheet>
</template>

<script>
import axios from 'axios';
import { EventBus } from "../event-bus";
import DisplayProfile from "./DisplayProfile";

  export default {
    name: "Leaderboard",
    components: {
      DisplayProfile
    },
    data () {
      return {
        filters: ['Skridt', 'Affald', 'Område dækket'],
        activeFilter: 'Skridt',

        tabs: [ 'uge', 'måned', 'altid' ],
        currentTab: 'tab-uge',

        sortBySteps: true,
        sortByTrash: false,

        baseUrl: 'http://localhost:8626/',
        allUsers: [],
        chosenUser: null,
        showDisplayUser: false
      }
    },
    watch: {
      activeFilter: function() {
        this.changeSort();
      },
      showDisplayUser: function() {
        EventBus.$emit('show-display-user', this.showDisplayUser);
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
      getSingleUser(uId) {
        axios({
          method: 'get',
          url: this.baseUrl + 'user/' + uId,
          withCredentials: false,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          console.log(response);
          this.showDisplayUser = true;
          this.chosenUser = response.data.user;
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
      }
    },
    computed: {
      sortedUsers() {
        let result = this.allUsers;
        
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
      EventBus.$on('back-to-leaderboard', backToLeaderboard => {
        this.showDisplayUser = backToLeaderboard;
      });
    }
  }
</script>