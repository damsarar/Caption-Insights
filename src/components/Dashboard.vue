<template>
  <v-app id="inspire">
    <v-app-bar app color="primary" dark flat>
      <v-container class="py-0 fill-height">
        <h3 class="mr-10">Sinhala Caption Tagger Insights</h3>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <!-- Stat cards -->
        <v-row class="mt-1">
          <v-col cols="6" md="2">
            <v-sheet rounded="lg">
              <v-card height="150" class="mx-auto">
                <v-card-text>
                  <p class="text-h5"> New captions </p>
                  <p class="text-h4 text--primary">{{ noOfNewCaptions }}</p>
                </v-card-text>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col cols="6" md="2">
            <v-sheet rounded="lg">
              <v-card height="150" class="mx-auto">
                <v-card-text>
                  <p class="text-h5"> Corrected captions </p>
                  <p class="text-h4 text--primary">{{ noOfCorrectedCaptions }}</p>
                </v-card-text>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>

        <!-- Data tables -->
        <v-row>
          <v-col>
            <v-sheet height="100%" width="100%" rounded="lg">
              <data-table title="New Captions" :dataObject="allNewCaptions"
                          :headers="newCaptionTableHeaders" :loading="newCaptionTableLoading"></data-table>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-sheet height="100%" width="100%" rounded="lg">
              <data-table title="Corrected Captions" :dataObject="allCorrectedCaptions"
                          :headers="correctedCaptionTableHeaders" :loading="correctedCaptionTableLoading"></data-table>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import DataTable from "./DataTable";
import db from '../api/firebaseInit';

export default {
  name: "Dashboard",
  components: {DataTable},
  data: () => ({
    allNewCaptions: [],
    allCorrectedCaptions: [],
    noOfNewCaptions: 0,
    noOfCorrectedCaptions: 0,
    newCaptionTableLoading: false,
    correctedCaptionTableLoading: false,
    newCaptionTableHeaders: [
      {text: 'Image Id', value: 'imageId'},
      {text: 'Image Name', value: 'imageFileName'},
      {text: 'Caption 1', value: 'caption1.caption'},
      {text: 'Caption 2', value: 'caption2.caption'},
      {text: 'Caption 3', value: 'caption3.caption'},
      {text: 'Caption 4', value: 'caption4.caption'},
      {text: 'Caption 5', value: 'caption5.caption'}
    ],
    correctedCaptionTableHeaders: [
      {text: 'Image Id', value: 'imageId'},
      {text: 'Image Name', value: 'imageFileName'},
      {text: 'Caption 1', value: 'caption1'},
      {text: 'Caption 2', value: 'caption2'},
      {text: 'Caption 3', value: 'caption3'},
      {text: 'Caption 4', value: 'caption4'},
      {text: 'Caption 5', value: 'caption5'}
    ]
  }),
  mounted() {
    this.getNewCaptionData();
    this.getCorrectedCaptionData();
  },
  methods: {
    // to get collected new caption data
    async getNewCaptionData() {
      this.newCaptionTableLoading = true;
      let tempObj;
      db.collection('Images').get()
          .then((snapshot) => {
            if (snapshot.empty) {
              this.emptyResult = true;
            }
            snapshot.forEach((doc) => {
              if (doc.data().captionTags[0]) {
                tempObj = {
                  imageId: doc.data().imageId,
                  imageFileName: doc.data().imageFileName,
                  caption1: doc.data().captionTags[0],
                  caption2: doc.data().captionTags[1],
                  caption3: doc.data().captionTags[2],
                  caption4: doc.data().captionTags[3],
                  caption5: doc.data().captionTags[4],
                };
                this.allNewCaptions.push(tempObj);
              }
            });
            this.noOfNewCaptions = this.allNewCaptions.length;
            this.newCaptionTableLoading = false;
          })
          .catch((err) => {
            console.log("Error getting documents", err);
            this.newCaptionTableLoading = false;
          });
    },

    // to get corrected caption data
    async getCorrectedCaptionData() {
      this.correctedCaptionTableLoading = true;
      let tempObj;
      db.collection('CorrectedCaptions').get()
          .then((snapshot) => {
            if (snapshot.empty) {
              this.emptyResult = true;
            }
            snapshot.forEach((doc) => {
              if (doc.data().correctedCaptionTags[0]) {
                tempObj = {
                  imageId: doc.data().imageId,
                  imageFileName: doc.data().imageFileName,
                  caption1: doc.data().correctedCaptionTags[0],
                  caption2: doc.data().correctedCaptionTags[1],
                  caption3: doc.data().correctedCaptionTags[2],
                  caption4: doc.data().correctedCaptionTags[3],
                  caption5: doc.data().correctedCaptionTags[4],
                };
                this.allCorrectedCaptions.push(tempObj);
              }
            });
            this.noOfCorrectedCaptions = this.allCorrectedCaptions.length;
            this.correctedCaptionTableLoading = false;
          })
          .catch((err) => {
            console.log("Error getting documents", err);
            this.correctedCaptionTableLoading = false;
          });
    }
  },
};
</script>

<style scoped>

</style>