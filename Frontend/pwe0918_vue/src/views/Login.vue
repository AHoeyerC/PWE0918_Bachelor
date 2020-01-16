<template>
<div>
  <v-container fluid class="success py-1">
      <v-row>
        <v-col cols="12" justify="center" align="center">
          <v-sheet color="success" class="header-grey font-weight-bold success header-font">Login</v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
    <v-row>
      <v-col>
        <v-content margin="0">
          <LoginForm/>
        </v-content>
      </v-col>
    </v-row>
  </v-container>
</div>
  
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