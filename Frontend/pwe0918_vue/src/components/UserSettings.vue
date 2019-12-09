<template>
    <v-sheet
        width="95vw" height="90vh" light
    >
        <v-row>
            <v-col>
                <v-avatar
                size="164">
                    <v-icon>mdi-account-circle</v-icon> 
                </v-avatar>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" align="center">
                <v-list
                color="rgba(0, 0, 0, .4">
                    <v-list-item-content>
                        <v-list-item-title>Brugerdata:</v-list-item-title>
                        <v-list-item>Brugernavn:</v-list-item>
                        <v-list-item>Fornavn:</v-list-item>
                        <v-list-item>Efternavn:</v-list-item>
                        <v-list-item>E-mail:</v-list-item>
                        <v-list-item>Bruger oprettet:</v-list-item>
                        <v-list-item>Trofæer opnået:</v-list-item>
                    </v-list-item-content>
                </v-list>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" align="center">
                <v-list-item
                color="rgba(0, 0, 0, .4">
                <v-list-item-content>
                    <v-list-item-title>Områdedata:</v-list-item-title>
                    <v-list-item>Områder gennemført:</v-list-item>
                    <v-list-item>Åbne områder:</v-list-item>
                    <v-list-item>Indsamlet affald (total, i gram):</v-list-item>
                    <v-list-item>Antal skridt (total):</v-list-item>
                    <v-list-item>Område dækket (total, i m2):</v-list-item>
                </v-list-item-content>
                </v-list-item>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" align="center">
                <v-btn>Rediger brugerinstillinger</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" align="center">
                <v-btn>Rediger dataindstillinger</v-btn>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>
export default {
  name: "UserSettings",
  data: () => ({

  })
};
</script>