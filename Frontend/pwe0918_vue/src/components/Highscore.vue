<template>
  <v-sheet
    width= 100%
  >
    <v-tabs
      grow
    >
      <v-tab>Uge</v-tab>
      <v-tab>Månede</v-tab>
      <v-tab>Altid</v-tab>

      <v-tab-item
        v-for="n in 2"
        :key="n"
      >
        <v-item-group>
          <v-item
              v-slot:default="{ active, toggle }"
              v-for="i in 3"
              :key="i">
            <v-skeleton-loader
              class="mx-auto" width="350px" type="image" boilerplate>
              <!--Overlayet scaler efter det indhold der er i den men indholdet i den scaler efter den boks der er fra default
                  så jeg har hard fixet det med at den skeletonloader har en størrelse på 350px i width
              -->
            </v-skeleton-loader>
          </v-item>
        </v-item-group>
      </v-tab-item>
    </v-tabs>
  </v-sheet>
</template>

<script>
export default {
  name: "Highscore",
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