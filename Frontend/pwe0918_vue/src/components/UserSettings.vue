<template>
  <v-sheet width="95vw" height="90vh" light class="hide-scroll"> <!--style="overflow-y: scroll;"-->
    <v-container fluid class="success py-1">
      <v-row>
        <v-col cols="12" justify="center" align="center">
          <v-sheet class="header-grey font-weight-bold success header-font">Brugerindstillinger</v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row cols="12">
        <v-col align="center">
          <v-avatar size="160" width="200">
            <v-btn fab color="success" absolute top right class="mt-8 mr-3" height="40" width="40">
              <v-icon size="22">mdi-camera-plus</v-icon>
            </v-btn>
            <v-icon size="160">mdi-account-circle</v-icon>
          </v-avatar>
        </v-col>
      </v-row>
      <v-row v-if="user != null">
        <v-col cols="12">
          <v-list dense>
            <v-list-item-group>
              <v-list-item disabled color="black">
                <v-list-item-content>
                  <v-list-item-title
                    style="font-weight: bold; font-size: 16px; text-decoration: underline;"
                  >Brugerdata:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item disabled color="black">
                <v-list-item-content>
                  <v-list-item-title><b>Brugernavn:</b> {{ user.username }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item disabled color="black">
                <v-list-item-content>
                  <v-list-item-title><b>Fornavn:</b> {{ user.firstName }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item disabled color="black">
                <v-list-item-content>
                  <v-list-item-title><b>Efternavn:</b> {{ user.lastName }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item disabled color="black">
                <v-list-item-content>
                  <v-list-item-title><b>E-mail:</b> {{ user.email }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item disabled color="black">
                <v-list-item-content>
                  <v-list-item-title><b>Bruger oprættet:</b> {{ formatDate(user.creationDate) }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="user != null && user.userData" disabled color="black">
                <v-list-item-content>
                  <v-list-item-title><b>Trofæer opnået:</b> {{ user.userData.trophies.length }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <v-list dense>
            <v-list-item-group>
              <v-list-item disabled color="black">
                <v-list-item-content>
                  <v-list-item-title
                    style="font-weight: bold; font-size: 16px; text-decoration: underline;"
                  >Områdedata:</v-list-item-title> <!--text-decoration: underline; text-decoration-color: #8EC28E;-->
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="user != null && user.userData" disabled color="black">
                <v-list-item-content>
                  <v-list-item-title><b>Områder gennemført:</b> {{ user.userData.completedAreas.length }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="user != null && user.userData" disabled color="black">
                <v-list-item-content>
                  <v-list-item-title><b>Åbne områder:</b> {{ user.userData.incompleteAreas.length }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="user != null && user.userData" disabled color="black">
                <v-list-item-content>
                  <v-list-item-title><b>Indsamlet affald (total, i gram):</b> {{ user.userData ? user.userData.totalTrashInGram : 0 }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="user != null && user.userData" disabled color="black">
                <v-list-item-content>
                  <v-list-item-title><b>Antal skridt (total):</b> {{ user.userData ? user.userData.totalSteps : 0 }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="user != null && user.userData" disabled color="black">
                <v-list-item-content>
                  <v-list-item-title><b>Område dækket (total, i m2):</b> {{ user.userData ? user.userData.totalSqMeters : 0 }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" align="center">
          <v-btn>Rediger dataindstillinger</v-btn>
        </v-col>
      </v-row>

				<template v-if="user">
					<div class="text-center">
						<v-dialog v-model="isEditing" width="500">
							<template v-slot:activator="{ on }">
								<v-btn @click="changeUserData();" v-on="on">Rediger brugerindstillinger</v-btn>
							</template>

						<v-card>
							<v-card-title class="success justify-center" primary-title>Rediger brugerindstillinger</v-card-title>

							<v-container>
								<v-row>
									<v-col cols="12" class="pr-10 pl-10">
										<v-text-field label="Fornavn" v-model="user.firstName" style="display: block;"></v-text-field>
										<v-text-field label="Efternavn" v-model="user.lastName"></v-text-field>
										<v-text-field label="Email" v-model="user.email"></v-text-field>
										<v-text-field label="Nyt password" v-model="userNewPassword"></v-text-field>
										<v-text-field label="Genindtast password" v-model="confirmNewPassword"></v-text-field>
									</v-col>
								</v-row>
							</v-container>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn text @click="isEditing = false">Anuller</v-btn>
								<v-btn color="success" @click="patchUserData();">Gem</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</div>
			</template>
    </v-container>
  </v-sheet>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: "UserSettings",
  data: () => ({
    isEditing: false,
		baseUrl: 'http://localhost:8626/',
		userProfilePic: null,
		userNewPassword: '',
		confirmNewPassword: ''
  }),
  props: ["user"],
  methods: {
    formatDate(date) {
      let newDate = moment(date).format('DD-MM-YYYY');
      return newDate; 
    },
		changeUserData() {
			this.isEditing = true;
		},
    patchUserData() {
			let userId = localStorage.getItem('userId');

			if(this.user.firstName != '' && this.user.lastName != '' && this.user.email != '' && this.userNewPassword != '' && this.confirmNewPassword != '') {
				if(this.confirmNewPassword == this.userNewPassword) {
					let userSettings = [
						{propName: "firstName", value: this.user.firstName},
						{propName: "lastName", value: this.user.lastName},
						{propName: "email", value: this.user.email},
						{propName: "password", value: this.userNewPassword},
					]
					axios({
						method: 'patch',
						url: this.baseUrl + 'user/' + userId,
						data: userSettings,
						withCredentials: false,
						headers: {
							'Content-Type': 'application/json'
						}
					}).then((response) => {
						console.log(response);
						this.isEditing = false;
					}).catch((error) => {
						console.log(error);
						this.isEditing = false;
					});
				}
			}
		}
  }
};
</script>