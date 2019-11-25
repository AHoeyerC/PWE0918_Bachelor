<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-skeleton-loader
         class="mx-auto" max-width="300" type="image" boilerplate>
        </v-skeleton-loader>
        <!-- Map goes here -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Map",
  data: () => ({})
};
</script>