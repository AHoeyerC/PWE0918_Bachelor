<template>
    <v-sheet
        width="95vw" height="90vh"
    >
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
    </v-sheet>
</template>

<script>
export default {
    name: "UserProfile",
    data: () => ({

    })
}
</script>