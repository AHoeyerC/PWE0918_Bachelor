<template>
    <v-form
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
    >
        <v-text-field
            v-model="username"
            :counter="20"
            :rules="usernameRules"
            label="Brugernavn"
            :append-icon="username !== '' && username.length <= 20 ? 'mdi-check' : ''"
            :success="username !== '' && username.length <= 20 ? true : false"
            required
        ></v-text-field>

        <v-text-field
            v-model="nameFirst"
            :counter="20"
            :rules="nameFirstRules"
            label="First Name"
            :append-icon="nameFirst !== '' ? 'mdi-check' : ''"
            :success="nameFirst !== '' && nameFirst.length <= 20? true : false"
            required
        ></v-text-field>

        <v-text-field
            v-model="nameLast"
            :counter="40"
            :rules="nameLastRules"
            label="Last Name"
            :append-icon="nameLast !== '' ? 'mdi-check' : ''"
            :success="nameLast !== '' && nameLast.length <= 40? true : false"
            required
        ></v-text-field>

        <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        :append-icon="email !== '' ? 'mdi-check' : ''"
        :success="email !== '' ? true : false"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        :type="passwordType ? 'password' : 'text'"
        :success="password !== '' && passwordConfirm !== '' && password == passwordConfirm ? true : false"
        required
      >
      <template slot="append">
        <v-icon @click="() => (passwordType = !passwordType)" :class="passwordType ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"></v-icon>
        <v-icon color="success" :class="password !== '' && passwordConfirm !== '' && password == passwordConfirm ? 'mdi mdi-check' : ''"></v-icon>
      </template>
      </v-text-field>

      <v-text-field
        v-model="passwordConfirm"
        :rules="passwordConfirmRules"
        label="Confirm Password"
        :type="passwordType ? 'password' : 'text'"
        :success="password !== '' && passwordConfirm !== '' && password == passwordConfirm ? true : false"
        :append-icon="password !== '' && passwordConfirm !== '' && password == passwordConfirm ? 'mdi-check' : ''"
        required
      ></v-text-field>

      <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'For at oprette en bruger skal du have læst og accepteret betingelserne.']"
            required
            color="success"
        >
            <template v-slot:label>
                <div>
                    Jeg har læst og accepteret
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <a href="#" @click.stop="showPrivacyPolicy = true" v-on="on">
                                betingelserne
                            </a>
                        </template>
                        Åbner i et nyt vindue
                    </v-tooltip>
                </div>
            </template>
        </v-checkbox>
        <v-overlay v-if="showPrivacyPolicy">
          <v-sheet width="500px" height="800px" color="white" class="pa-5 hide-scroll">
            <span style="color: #000;">
              <h1>Cookie- og privatlivspolitik</h1>
              <h4>Introduktion</h4>
              <p>Når du besøger vores website indsamles der oplysninger om dig, som bruges til at tilpasse og forbedre vores indhold og til at øge værdien af de annoncer, der vises på siden. Hvis du ikke ønsker, at der indsamles oplysninger, bør du slette dine cookies (<a href="http://minecookies.org/cookiehandtering">se vejledning</a>) og undlade videre brug af websitet. Nedenfor har vi uddybet, hvilke informationer der indsamles, deres formål og hvilke tredjeparter, der har adgang til dem.</p>
              <h4>Cookies</h4>
              <p>Websitet anvender ”cookies”, der er en tekstfil, som gemmes på din computer, mobil el. tilsvarende med det formål at genkende den, huske indstillinger, udføre statistik og målrette annoncer. Cookies kan ikke indeholde skadelig kode som f.eks. virus.</p>
              <p class="mb-0">Det er muligt at slette eller blokere for cookies. Se vejledning:</p>
              <p><a href="http://minecookies.org/cookiehandtering">http://minecookies.org/cookiehandtering</a></p>
              <p>Hvis du sletter eller blokerer cookies vil annoncer kunne blive mindre relevante for dig og optræde hyppigere. Du kan desuden risikere at websitet ikke fungerer optimalt samt at der er indhold, du ikke kan få adgang til.</p>
              <p>Websitet indeholder cookies fra tredjeparter, der i varierende omfang kan omfatte:</p>
              <ul>
                <li style="list-style: circle;">[  Indsæt liste over tredjeparter der sætter cookies på sitet. Se evt. <a href="http://minecookies.org/automatisk-opdatering-af-cookies-oversigt/">Automatisk opdatering af cookie-oversigt</a></li>
                <li style="list-style: circle;">eller henvis evt. til denne liste med: <a   href="http://danskemedier.dk/digital/frq3rdparties/">Hyppige tredjeparter ved digital annoncering</a>  ]</li>
              </ul>
              <h3 class="mt-5">Personoplysninger</h3>
              <h4>Generelt</h4>
              <p>Personoplysninger er alle slags informationer, der i et eller andet omfang kan henføres til dig. Når du benytter vores website indsamler og behandler vi en række sådanne informationer. Det sker f.eks. ved alm. tilgang af indhold, hvis du tilmelder dig vores nyhedsbrev, deltager i konkurrencer eller undersøgelser, registrerer dig som bruger eller abonnent, øvrig brug af services eller foretager køb via websitet.</p>
              <p>Vi indsamler og behandler typisk følgende typer af oplysninger: Et unikt ID og tekniske oplysninger om din computer, tablet eller mobiltelefon, dit IP-nummer, geografisk placering, samt hvilke sider du klikker på (interesser). I det omfang du selv giver eksplicit samtykke hertil og selv indtaster informationerne behandles desuden: Navn, telefonnummer, e-mail, adresse og betalingsoplysninger. Det vil typisk være i forbindelse med oprettelse af login eller ved køb.</p>
              <h4>Sikkerhed</h4>
              <p>Vi har truffet tekniske og organisatoriske foranstaltninger mod, at dine oplysninger hændeligt eller ulovligt bliver slettet, offentliggjort, fortabt, forringet eller kommer til uvedkommendes kendskab, misbruges eller i øvrigt behandles i strid med lovgivningen.</p>
              <h4>Formål</h4>
              <p>Oplysningerne bruges til at identificere dig som bruger og vise dig de annoncer, som vil have størst sandsynlighed for at være relevante for dig, at registrere dine køb og betalinger, samt at kunne levere de services, du har efterspurgt, som f.eks. at fremsende et nyhedsbrev. Herudover anvender vi oplysningerne til at optimere vores services og indhold.</p>
              <h4>Periode og opbevaring</h4>
              <p>Oplysningerne opbevares i det tidsrum, der er tilladt i henhold til lovgivningen, og vi sletter dem, når de ikke længere er nødvendige. Perioden afhænger af karakteren af oplysningen og baggrunden for opbevaring. Det er derfor ikke muligt at angive en generel tidsramme for, hvornår informationer slettes.</p>
              <h4>Videregivelse af oplysninger</h4>
              <p>Data om din brug af websitet, hvilke annoncer, du modtager og evt. klikker på, geografisk placering, køn og alderssegment m.v. videregives til tredjeparter i det omfang disse oplysninger er kendt. Du kan se hvilke tredjeparter, der er tale om, i afsnittet om ”Cookies” ovenfor. Oplysningerne anvendes til målretning af annoncering.</p>
              <p>Vi benytter herudover en række tredjeparter til opbevaring og behandling af data. Disse behandler udelukkende oplysninger på vores vegne og må ikke anvende dem til egne formål.</p>
              <p>Videregivelse af personoplysninger som navn og e-mail m.v. vil kun ske, hvis du giver samtykke til det. Vi anvender kun databehandlere i EU eller i lande, der kan give dine oplysninger en tilstrækkelig beskyttelse.</p>
              <h4>Indsigt og klager</h4>
              <p>Du har ret til at få oplyst, hvilke personoplysninger, vi behandler om dig. Du kan desuden til enhver tid gøre indsigelse mod, at oplysninger anvendes. Du kan også tilbagekalde dit samtykke til, at der bliver behandlet oplysninger om dig. Hvis de oplysninger, der behandles om dig, er forkerte har du ret til at de bliver rettet eller slettet. Henvendelse herom kan ske til: [  xxxxx@xxxxxx.dk  ]. Hvis du vil klage over vores behandling af dine personoplysninger, har du også mulighed for at tage kontakt til <a href="http://www.datatilsynet.dk/">Datatilsynet</a>.</p>
              <h4>Udgiver</h4>
              <p>Websitet ejes og publiceres af:</p>
              <p class="ma-0">[  FIRMA eller personnavn  ]</p>
              <p class="ma-0">[  ADRESSE  ]</p>
              <p class="ma-0">[  POSTNR og BY  ]</p>
              <p class="ma-0">Telefon: [  xx xx xx xx  ]</p>
              <p class="ma-0">Email: [  xxxxx@xxxxxx.dk  ]</p>
            </span>
          </v-sheet>
          <v-container>
            <v-row>
              <v-col cols="12" align="center">
                <v-btn fab color="red" @click="showPrivacyPolicy = false;" fixed bottom style="margin-left: -28px;">X</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-overlay>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-6"
        @click="validate(); register();"
      >
      <v-progress-circular indeterminate v-if="isRegistering" color="white"></v-progress-circular>
      <span v-else>Opret bruger</span>
      </v-btn>

      <!-- <v-btn
        color="error"
        class="mr-6"
        @click="reset"
      >
        Reset Form
      </v-btn> -->
      <v-snackbar v-model="snackbar" :color="snackbarColor">{{ snackbarText }}</v-snackbar>
    </v-form>
</template>

<script>
import axios from 'axios';
 export default {
     name: "RegistrationForm",

    data: () => ({
      passwordType: String,
      valid: true,
      username: '',
      usernameRules: [
        v => !!v || 'Brugernavn er påkrævet'
      ],
      nameFirst: '',
      nameFirstRules: [
        v => !!v || 'Fornavn er påkrævet',
        v => (v && v.length <= 20) || 'First name must be less than 20 characters'
      ],
      nameLast: '',
      nameLastRules: [
        v => !!v || 'Efternavn er påkrævet',
        v => (v && v.length <= 40) || 'Last name must be less than 40 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail adresse er påkrævet',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      password:'',
      passwordRules: [
        v => !!v || 'Password er påkrævet',
        // v => (v && v.length >= 6) || 'Password must be more than 6 characters',
        v => (v && v.length <= 64) || 'Password must be less than 64 characters'
      ],
      passwordConfirm:'',
      passwordConfirmRules: [
        v => !!v || 'Genindtastning af password er påkrævet',
        // v => (v && v.length >= 6) || 'Password must be more than 6 characters',
        v => (v && v.length <= 64) || 'Password must be less than 64 characters'
      ],
      checkbox: false,
      lazy: false,

      showPrivacyPolicy: false,

      baseUrl: 'http://localhost:8626/',
      isRegistering: false,

      snackbar: false,
      snackbarText: '',
      snackbarColor: '', //#3FBF04
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          // this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      register() {
        let user = {
          username: this.username,
          firstName: this.nameFirst,
          lastName: this.nameLast,
          email: this.email,
          password: this.password,
          userConsent: this.checkbox
        };

        this.isRegistering = true;

        axios({
          method: 'post',
          url: this.baseUrl + 'user/signup',
          data: user,
          withCredentials: false,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          this.isRegistering = false;
          this.snackbar = true;
          this.snackbarText = 'Bruger oprettet! Vent venligst...';
          this.snackbarColor = 'success';

          console.log("Signup successful:", response);

          let self = this;
          setTimeout(() => self.$router.push('/login'), 3000);

        }).catch((error) => {
          this.isRegistering = false;
          this.snackbar = true;
          this.snackbarText = 'Der skete en fejl. Prøv venligst igen.';
          this.snackbarColor = 'error';
          console.log("Signup failed:", error);

        });
      }
    },
  }
</script>