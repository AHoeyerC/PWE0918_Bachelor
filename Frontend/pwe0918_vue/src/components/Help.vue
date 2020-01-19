<template>
  <v-sheet width="95vw" height="90vh" light>
    <v-container fluid class="success py-1">
      <v-row>
        <v-col cols="12" justify="center" align="center">
          <v-sheet class="header-grey font-weight-bold success header-font">Hjælp</v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Ofte stillede spørgsmål:</h1>
          <h2> - Hvad kan jeg med appen?</h2>
          <p class="pb-4">Du kan vælge et område på kortet og herefter gå ud og oprydde området du har valgt.</p>
          <h2> - Hvordan opnår jeg trofæer?</h2>
          <p class="pb-4">Du opnår de forskellige trofæer, ved at bruge appen og oprydde områder.</p>
          <h2> - Hvad betyder NatuRen?</h2>
          <p class="pb-4">NatuRen er et samlet ord af Natur og Ren, vi ville gerne have at folk ved hvad appen går ud på allerede i navnet.</p>
          <h2> - Hvad sker der med min data?</h2>
          <p class="pb-4">Din data bruges kun til at forbedre vores applikation. Den indsamlede data bliver hverken solgt eller brugt til markedsføring.</p>
          <h2> - Problemer med appen?</h2>
          <p class="pb-4">Du er mere end velkommen til at rapportere problemer til vores e-mail: NatuRen@gmail.com.</p>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  name: "Help",
  data: () => ({})
};
</script>