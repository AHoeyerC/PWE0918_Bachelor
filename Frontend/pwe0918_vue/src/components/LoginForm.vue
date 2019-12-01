<template>
    <v-form
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
    >
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            :append-icon="email !== '' ? 'mdi-check' : ''"
            :success="email !== '' ? true : false"
            required
            v-on:keyup.enter="validate(); login();"
        >
        </v-text-field>
        <v-text-field
            name="password"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            :type="passwordType ? 'password' : 'text'"
            required
            v-on:keyup.enter="validate(); login();"
        >
        <template slot="append">
            <v-icon @click="() => (passwordType = !passwordType)" :class="passwordType ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"></v-icon>
            <v-icon color="success" :class="password !== '' ? 'mdi mdi-check' : ''"></v-icon>
        </template>
        </v-text-field>

        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-6"
            @click="validate(); login();"
        >
        <v-progress-circular indeterminate v-if="isLoggingIn" color="white"></v-progress-circular>
        <span v-else>Login</span>

        </v-btn>
        <v-snackbar v-model="snackbar" :color="snackbarColor">{{ snackbarText }}</v-snackbar>
    </v-form>
</template>

<script>
import axios from 'axios';
    export default {
        name: "LoginForm",
        data: () => ({
            passwordType: String,
            valid: true,
            email: '',
            emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            // v => (v && v.length >= 6) || 'Password must be more than 6 characters',
            v => (v && v.length <= 64) || 'Password must be less than 64 characters',
        ],
        checkbox: false,
        lazy: false,

        baseUrl: 'http://localhost:8626/',
        isLoggingIn: false,

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

            login() {
                let user = {
                    email: this.email,
                    password: this.password
                };
                this.isLoggingIn = true;
                axios({
                    method: 'post',
                    url: this.baseUrl + 'user/login',
                    data: user,
                    withCredentials: false
                }).then((response) => {
                    this.isLoggingIn = false;
                    this.snackbar = true;
                    this.snackbarText = 'Succesfuldt login. Vent venligst...';
                    this.snackbarColor = 'success';

                    console.log("Login successful:", response);

                    localStorage.setItem("jwt", response.data.token);
                    localStorage.setItem("userId", response.data.userId);

                    let self = this;
                    setTimeout(() => self.$router.push('/'), 3000);

                }).catch((error) => {
                    this.isLoggingIn = false;
                    this.snackbar = true;
                    this.snackbarText = 'Der skete en fejl. Prøv venligst igen.';
                    this.snackbarColor = 'error';

                    console.log("Login error:", error);
                });
            }
        },
    }
</script>