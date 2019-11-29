<template>
  <v-sheet
    width="95vw" height="90vh"
  >
    <v-tabs
      grow
    >
      <v-tab>
        <v-icon>mdi mdi-lock-open-variant</v-icon>
        Opnåede
      </v-tab>
      <v-tab>
        <v-icon>mdi mdi-lock</v-icon>
        Låste
      </v-tab>

      <v-tab-item
        v-for="n in 2"
        :key="n"
      >
        <v-item-group>
          <v-item
              v-slot:default="{ active, toggle }"
              v-for="i in 3"
              :key="i">
          <v-card
            flat
            tile
          >
          <v-icon>mdi mdi-check-circle</v-icon>
          </v-card>
          </v-item>
        </v-item-group>
      </v-tab-item>
    </v-tabs>
  </v-sheet>
</template>

<script>
export default {
  name: "Trofae",
  data: () => ({

    items: [
        {
          src: 'backgrounds/bg.jpg',
        },
        {
          src: 'backgrounds/md.jpg',
        },
        {
          src: 'backgrounds/bg-2.jpg',
        },
        {
          src: 'backgrounds/md2.jpg',
        },
      ],
      selected: [],})
};
</script>