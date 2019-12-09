<template>
    <v-sheet
        width="95vw" height="90vh" light
    >
    <v-container fluid class="header-grey py-1">
        <v-row>
          <v-col cols="12" justify="center" align="center">
            <v-sheet class="header-grey">Trofæer</v-sheet>
          </v-col>
        </v-row>
    </v-container>
        <v-avatar
        size="164">
            <v-img>mdi mdi-account-circle</v-img> 
        </v-avatar>
        <v-list-item
        color="rgba(0, 0, 0, .4">
        <v-list-item-content>
            <v-list-item-title>Retrojesus</v-list-item-title>
            <v-list-item>Antal områder:</v-list-item>
            <v-list-item>Antal m2 dækket:</v-list-item>
            <v-list-item>Mængde skrald indsamlet:</v-list-item>
        </v-list-item-content>
        </v-list-item>
        <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
            <v-card>
                <v-container fluid>
                <v-row>
                    <v-col
                    v-for="n in 9"
                    :key="n"
                    class="d-flex child-flex"
                    cols="4"
                    >
                    <v-card flat tile class="d-flex">
                        <v-img
                        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                        aspect-ratio="1"
                        class="grey lighten-2"
                        >
                        <template v-slot:placeholder>
                            <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                            >
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                        </template>
                        </v-img>
                    </v-card>
                    </v-col>
                </v-row>
                </v-container>
            </v-card>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>
export default {
    name: "DisplayProfile",
    data: () => ({

    })
}
</script>