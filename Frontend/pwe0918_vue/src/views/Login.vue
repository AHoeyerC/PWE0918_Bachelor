<template>
  <v-container>
    <v-row>
      <v-col>
        <v-content margin="0">
          <LoginForm/>
        </v-content>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import LoginForm from "../components/LoginForm"

export default {
  name: "Login",

  components: {
    LoginForm
  },

  data: () => ({

  }),
};
</script>