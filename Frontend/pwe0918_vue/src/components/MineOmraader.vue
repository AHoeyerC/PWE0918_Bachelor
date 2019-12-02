<template>
  <v-sheet
     width="95vw" height="90vh"
  >
  <v-container>
    <v-row>
      <v-col cols="12" justify="center" align="center">
        Mine områder
      </v-col>
    </v-row>
  </v-container>
    <v-tabs
      grow
    >
      <v-tab>Aktive</v-tab>
      <v-tab>Gennemførte</v-tab>

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
              class="mx-auto" type="image" boilerplate>
              <!--Overlayet scaler efter det indhold der er i den men indholdet i den scaler efter den boks der er fra default
                  så jeg har hard fixet det med at den skeletonloader har en størrelse på 350px i width
              -->
            </v-skeleton-loader>
          </v-item>
        </v-item-group>
      </v-tab-item>
    </v-tabs>
  </v-sheet>
  <!-- <v-card
    max-width="400"
    class="mx-auto"
  >
    <v-container class="pa-1">
      <v-item-group
        v-model="selected"
        multiple
      >
        <v-row>
          <v-col
            v-for="(item, i) in items"
            :key="i"
            cols="12"
            md="6"
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-img
                :src="`https://cdn.vuetifyjs.com/images/${item.src}`"
                height="150"
                class="text-right pa-2"
                @click="toggle"
              >
                <v-btn
                  icon
                  dark
                >
                  <v-icon>
                    {{ active ? 'mdi-heart' : 'mdi-heart-outline' }}
                  </v-icon>
                </v-btn>
              </v-img>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
  </v-card> -->
</template>

<script>
export default {
  name: "MineOmraader",
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