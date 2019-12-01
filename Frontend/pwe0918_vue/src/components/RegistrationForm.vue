<template>
    <v-form
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
    >
        <v-text-field
            v-model="username"
            :counter="20"
            :rules="usernameRules"
            label="Brugernavn"
            :append-icon="username !== '' && username.length <= 20 ? 'mdi-check' : ''"
            :success="username !== '' && username.length <= 20 ? true : false"
            required
        ></v-text-field>

        <v-text-field
            v-model="nameFirst"
            :counter="20"
            :rules="nameFirstRules"
            label="First Name"
            :append-icon="nameFirst !== '' ? 'mdi-check' : ''"
            :success="nameFirst !== '' && nameFirst.length <= 20? true : false"
            required
        ></v-text-field>

        <v-text-field
            v-model="nameLast"
            :counter="40"
            :rules="nameLastRules"
            label="Last Name"
            :append-icon="nameLast !== '' ? 'mdi-check' : ''"
            :success="nameLast !== '' && nameLast.length <= 40? true : false"
            required
        ></v-text-field>

        <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        :append-icon="email !== '' ? 'mdi-check' : ''"
        :success="email !== '' ? true : false"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        :type="passwordType ? 'password' : 'text'"
        :success="password !== '' && passwordConfirm !== '' && password == passwordConfirm ? true : false"
        required
      >
      <template slot="append">
        <v-icon @click="() => (passwordType = !passwordType)" :class="passwordType ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"></v-icon>
        <v-icon color="success" :class="password !== '' && passwordConfirm !== '' && password == passwordConfirm ? 'mdi mdi-check' : ''"></v-icon>
      </template>
      </v-text-field>

      <v-text-field
        v-model="passwordConfirm"
        :rules="passwordConfirmRules"
        label="Confirm Password"
        :type="passwordType ? 'password' : 'text'"
        :success="password !== '' && passwordConfirm !== '' && password == passwordConfirm ? true : false"
        :append-icon="password !== '' && passwordConfirm !== '' && password == passwordConfirm ? 'mdi-check' : ''"
        required
      ></v-text-field>

      <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'For at oprette en bruger skal du have læst og accepteret betingelserne.']"
            required
            color="success"
        >
            <template v-slot:label>
                <div>
                    Jeg har læst og accepteret
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <a href="#" @click.stop="showPrivacyPolicy = true" v-on="on">
                                betingelserne
                            </a>
                        </template>
                        Åbner i et nyt vindue
                    </v-tooltip>
                </div>
            </template>
        </v-checkbox>
        <v-overlay v-if="showPrivacyPolicy">
          <v-sheet width="500px" height="800px" color="white">
            <span style="color: #000;">Vi tager al din data og sælger det til Kina</span>
          </v-sheet>
          <v-btn @click="showPrivacyPolicy = false">Luk</v-btn>
        </v-overlay>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-6"
        @click="validate(); register();"
      >
      <v-progress-circular indeterminate v-if="isRegistering" color="white"></v-progress-circular>
      <span v-else>Opret bruger</span>
      </v-btn>

      <v-btn
        color="error"
        class="mr-6"
        @click="reset"
      >
        Reset Form
      </v-btn>
      <v-snackbar v-model="snackbar" :color="snackbarColor">{{ snackbarText }}</v-snackbar>
    </v-form>
</template>

<script>
import axios from 'axios';
 export default {
     name: "RegistrationForm",

    data: () => ({
      passwordType: String,
      valid: true,
      username: '',
      usernameRules: [
        v => !!v || 'Brugernavn er påkrævet'
      ],
      nameFirst: '',
      nameFirstRules: [
        v => !!v || 'Fornavn er påkrævet',
        v => (v && v.length <= 20) || 'First name must be less than 20 characters'
      ],
      nameLast: '',
      nameLastRules: [
        v => !!v || 'Efternavn er påkrævet',
        v => (v && v.length <= 40) || 'Last name must be less than 40 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail adresse er påkrævet',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      password:'',
      passwordRules: [
        v => !!v || 'Password er påkrævet',
        // v => (v && v.length >= 6) || 'Password must be more than 6 characters',
        v => (v && v.length <= 64) || 'Password must be less than 64 characters'
      ],
      passwordConfirm:'',
      passwordConfirmRules: [
        v => !!v || 'Genindtastning af password er påkrævet',
        // v => (v && v.length >= 6) || 'Password must be more than 6 characters',
        v => (v && v.length <= 64) || 'Password must be less than 64 characters'
      ],
      checkbox: false,
      lazy: false,

      showPrivacyPolicy: false,

      baseUrl: 'http://localhost:8626/',
      isRegistering: false,

      snackbar: false,
      snackbarText: '',
      snackbarColor: '', //#3FBF04
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          // this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      register() {
        let user = {
          username: this.username,
          firstName: this.nameFirst,
          lastName: this.nameLast,
          email: this.email,
          password: this.password,
          userConsent: this.checkbox
        };

        this.isRegistering = true;

        axios({
          method: 'post',
          url: this.baseUrl + 'user/signup',
          data: user,
          withCredentials: false,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          this.isRegistering = false;
          this.snackbar = true;
          this.snackbarText = 'Bruger oprettet! Vent venligst...';
          this.snackbarColor = 'success';

          console.log("Signup successful:", response);

          let self = this;
          setTimeout(() => self.$router.push('/login'), 3000);

        }).catch((error) => {
          this.isRegistering = false;
          this.snackbar = true;
          this.snackbarText = 'Der skete en fejl. Prøv venligst igen.';
          this.snackbarColor = 'error';
          console.log("Signup failed:", error);

        });
      }
    },
  }
</script>