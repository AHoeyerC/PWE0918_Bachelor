<template>
  <v-sheet width="95vw" height="90vh" light class="hide-scroll">
		<v-container class="py-0">
			<v-row>
				<v-col cols="12" align="center" class="py-0">
					<v-avatar size="164">
						<v-icon size="164">mdi-account-circle</v-icon>
					</v-avatar>
				</v-col>
			</v-row>
		</v-container>

		<v-list class="py-0" dense>
			<v-list-item-group>
				<v-list-item align="center">
					<v-list-item-content>
						<v-list-item-title v-if="user" style="font-size: 24px;" class="py-2">{{ user.username }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-container v-if="user && user.userData">
					<v-row justify="center">
						<v-col cols="8">
							<v-card justify="center">
								<v-list-item>
									<v-list-item-content>Antal områder: {{ user.userData.completedAreas.length }}</v-list-item-content>
								</v-list-item>
								<v-list-item>
									<v-list-item-content>Antal m2 dækket: {{ user.userData.totalSqMeters }}</v-list-item-content>
								</v-list-item>
								<v-list-item>
									<v-list-item-content>Mængde skrald indsamlet: {{ user.userData.totalTrashInGram }}</v-list-item-content>
								</v-list-item>
								<v-container class="py-0">
									<v-row>
										<v-col cols="12" align="end">
											<v-btn fab color="#009688" style="color: #ffffff;" height="40" width="40">
												<v-icon size="22">mdi-chart-timeline-variant</v-icon>
											</v-btn>
										</v-col>
									</v-row>
								</v-container>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
			</v-list-item-group>
		</v-list>

		<v-container class="pa-0">
			<v-row>
				<v-col cols="12" sm="8" offset-sm="2">
					<v-card flat>
						<v-card-text class="text-center" style="text-decoration: underline; font-size: 22px; color: #000000;">Galleri</v-card-text>
					</v-card>
					<v-card>
						<v-container fluid>
							<v-row>
								<v-col v-for="n in 6" :key="n" class="d-flex child-flex" cols="4">
									<v-card flat tile class="d-flex">
										<v-img
											:src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
											:lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
											aspect-ratio="1"
											class="grey lighten-2"
										>
											<template v-slot:placeholder>
												<v-row class="fill-height ma-0" align="center" justify="center">
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
		</v-container>
  </v-sheet>
</template>

<script>
export default {
  name: "DisplayProfile",
	data: () => ({}),
	props: ['user']
};
</script>