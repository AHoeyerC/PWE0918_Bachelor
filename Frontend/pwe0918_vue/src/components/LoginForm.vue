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
            required
        >
        </v-text-field>
        <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
        >
        </v-text-field>
        <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
        >
        </v-checkbox>
        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-6"
            @click="validate"
        >
        Login
        </v-btn>
    </v-form>
</template>

<script>

    export default {
        name: "LoginForm",

        data: () => ({
            valid: true,
            email: '',
            emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6) || 'Password must be more than 6 characters',
            v => (v && v.length <= 64) || 'Password must be less than 64 characters',
        ],
        select: null,
        checkbox: false,
        lazy: false,
        }),

        methods: {
            validate () {
                if (this.$refs.form.validate()) {
                    this.snackbar = true
                }
            },
        },
    }
</script>