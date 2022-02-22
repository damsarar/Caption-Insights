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
                  <p class="text-h5"> Caption 1 </p>
                  <p class="text-h4 text--primary">{{ noOfCaptions.caption1 }}</p>
                </v-card-text>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col cols="6" md="2">
            <v-sheet rounded="lg">
              <v-card height="150" class="mx-auto">
                <v-card-text>
                  <p class="text-h5"> Caption 2 </p>
                  <p class="text-h4 text--primary">{{ noOfCaptions.caption2 }}</p>
                </v-card-text>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col cols="6" md="2">
            <v-sheet rounded="lg">
              <v-card height="150" class="mx-auto">
                <v-card-text>
                  <p class="text-h5"> Caption 3 </p>
                  <p class="text-h4 text--primary">{{ noOfCaptions.caption3 }}</p>
                </v-card-text>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col cols="6" md="2">
            <v-sheet rounded="lg">
              <v-card height="150" class="mx-auto">
                <v-card-text>
                  <p class="text-h5"> Caption 4 </p>
                  <p class="text-h4 text--primary">{{ noOfCaptions.caption4 }}</p>
                </v-card-text>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col cols="6" md="2">
            <v-sheet rounded="lg">
              <v-card height="150" class="mx-auto">
                <v-card-text>
                  <p class="text-h5"> Caption 5 </p>
                  <p class="text-h4 text--primary">{{ noOfCaptions.caption5 }}</p>
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
<!--              <v-btn @click="downloadExcel()">Download</v-btn>-->
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

const XLSX = require("xlsx");

export default {
  name: "Dashboard",
  components: {DataTable},
  data: () => ({
    allNewCaptions: [],
    allCorrectedCaptions: [],
    noOfNewCaptions: 0,
    noOfCaptions: {
      caption1: 0,
      caption2: 0,
      caption3: 0,
      caption4: 0,
      caption5: 0,
    },
    noOfCorrectedCaptions: 0,
    newCaptionTableLoading: false,
    correctedCaptionTableLoading: false,
    newCaptionTableHeaders: [
      {text: 'Image Id', value: 'imageId'},
      {text: 'Image Name', value: 'imageFileName'},
      {text: 'Caption 1', value: 'caption1'},
      {text: 'Caption 2', value: 'caption2'},
      {text: 'Caption 3', value: 'caption3'},
      {text: 'Caption 4', value: 'caption4'},
      {text: 'Caption 5', value: 'caption5'}
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
                  caption1: doc.data().captionTags[0] ? doc.data().captionTags[0].caption : null,
                  caption2: doc.data().captionTags[1] ? doc.data().captionTags[1].caption : null,
                  caption3: doc.data().captionTags[2] ? doc.data().captionTags[2].caption : null,
                  caption4: doc.data().captionTags[3] ? doc.data().captionTags[3].caption : null,
                  caption5: doc.data().captionTags[4] ? doc.data().captionTags[4].caption : null,
                };
                this.allNewCaptions.push(tempObj);

                if (doc.data().captionTags[0])
                  this.noOfCaptions.caption1++;

                if (doc.data().captionTags[1])
                  this.noOfCaptions.caption2++;

                if (doc.data().captionTags[2])
                  this.noOfCaptions.caption3++;

                if (doc.data().captionTags[3])
                  this.noOfCaptions.caption4++;

                if (doc.data().captionTags[4])
                  this.noOfCaptions.caption5++;
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
    },

    createArrayOfArrays({headers = [], data = []}) {

      let arrayOfArrays = [];
      arrayOfArrays.push(headers);

      data.map((rowObj) => {
        arrayOfArrays.push(Object.values(rowObj));
        return null;
      });
      return arrayOfArrays;
    },
    downloadExcel() {
      let ws_name = "SheetJS";

      let wb = XLSX.utils.book_new();
      let d = new Date();

      let filename =
          "report_" +
          d
              .toISOString()
              .slice(0, 10)
              .replace(/-/g, "") +
          ".xlsx";

      let data = this.createArrayOfArrays({
        headers: ["imageId", "imageFileName", "caption1", "caption2", "caption3", "caption4", "caption5"],
        data: this.allNewCaptions
      });

      let ws = XLSX.utils.aoa_to_sheet(data);

      //   Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, ws_name);

      XLSX.writeFile(wb, filename);
    }
  },
};
</script>

<style scoped>

</style>