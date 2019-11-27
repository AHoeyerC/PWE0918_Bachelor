<template>
  <v-container>
    <v-row>
      <v-col>
        <v-content margin="0">
          <RegistrationForm/>
        </v-content>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import RegistrationForm from "../components/RegistrationForm"

export default {
  name: "Registration",

  components: {
    RegistrationForm
  },

  data: () => ({

  }),
};
</script>