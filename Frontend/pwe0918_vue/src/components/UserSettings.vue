<template>
    <v-sheet
        width="95vw" height="90vh" light
    >
        <v-container fluid class="header-grey py-1">
            <v-row>
            <v-col cols="12" justify="center" align="center">
                <v-sheet class="header-grey">Bruger Indstillinger</v-sheet>
            </v-col>
            </v-row>
        </v-container>
        <v-container >
            <v-row cols="12">
                <v-col align="center">
                    <v-avatar
                    size="64">
                        <v-icon x-large="">mdi-account-circle</v-icon> 
                    </v-avatar>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-list dense>
                        <v-list-item-group>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title style="text-decoration: underline; text-decoration-color: red">Brugerdata:</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Brugernavn:</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Fornavn:</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Efternavn:</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>E-mail:</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Bruger oprættet:</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Trofæer opnået:</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
                <v-col cols="12">
                    <v-list dense>
                        <v-list-item-group>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title style="text-decoration: underline; text-decoration-color: red">Områdedata:</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Områder gennemført:</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Åbne områder:</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Indsamlet affald (total, i gram):</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Antal skridt (total):</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Område dækket (total, i m2):</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" align="center">
                    <v-btn>Rediger brugerinstillinger</v-btn>
                    <v-btn>Rediger dataindstillinger</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script>
export default {
  name: "UserSettings",
  data: () => ({

  })
};
</script>