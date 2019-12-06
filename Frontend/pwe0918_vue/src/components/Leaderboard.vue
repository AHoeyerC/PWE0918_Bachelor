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
                <v-list-item v-for="(filter, index) in filters" :key="index" @click="activeFilter = filter;">
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
                          <v-col cols="8" class="py-0">
                            <v-list-item-content>
                              <v-list-item-title>Navn</v-list-item-title>
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
                    <v-list-item v-for="(user, index) in allUsers" :key="index"> <!--All users-->
                      <v-container fluid class="py-0">
                        <v-row>
                          <v-col cols="1" class="py-0">
                            <v-list-item-content>
                              <v-list-item-title></v-list-item-title>
                            </v-list-item-content>
                          </v-col>
                          <v-col cols="8" class="py-0">
                            <v-list-item-content>
                              <v-list-item-title>{{ user.username }}</v-list-item-title>
                            </v-list-item-content>
                          </v-col>
                          <v-col cols="3" class="py-0" align="end">
                            <v-list-item-content>
                              <v-list-item-title></v-list-item-title>
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

        baseUrl: 'http://localhost:8626/',
        allUsers: []
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
      // sortBySteps() {

      // }
    },
    async mounted() {
      await this.getAllUsers();
    }
  }
</script>