<template>
    <v-form
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
    >
        <v-text-field
            v-model="nameFirst"
            :counter="20"
            :rules="nameFirstRules"
            label="First Name"
            required
        ></v-text-field>

        <v-text-field
            v-model="nameLast"
            :counter="40"
            :rules="nameLastRules"
            label="Last Name"
            required
        ></v-text-field>

        <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>

      <v-text-field
        v-model="passwordConfirm"
        :rules="passwordConfirmRules"
        label="Confirm Password"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-6"
        @click="validate"
      >
        Sign Up
      </v-btn>

      <v-btn
        color="error"
        class="mr-6"
        @click="reset"
      >
        Reset Form
      </v-btn>
    </v-form>
</template>

<script>
 export default {
     name: "RegistrationForm",

    data: () => ({
      valid: true,
      nameFirst: '',
      nameFirstRules: [
        v => !!v || 'First name is required',
        v => (v && v.length <= 20) || 'First name must be less than 20 characters',
      ],
      nameLast: '',
      nameLastRules: [
        v => !!v || 'Last name is required',
        v => (v && v.length <= 40) || 'Last name must be less than 40 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password:'',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters',
        v => (v && v.length <= 64) || 'Password must be less than 64 characters',
      ],
      passwordConfirm:'',
      passwordConfirmRules: [
        v => !!v || 'Confirming your Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters',
        v => (v && v.length <= 64) || 'Password must be less than 64 characters',
      ],
      checkbox: false,
      lazy: false,
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
    },
  }
</script>