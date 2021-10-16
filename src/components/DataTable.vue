<template>
  <v-data-table
      :headers="this.headers"
      :items="this.dataObject"
      item-key="imageId"
      class="elevation-1 m-5"
      :items-per-page="10"
      :loading="loading"
      loading-text="Loading... Please wait"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "DataTable",
  props: ['title', 'dataObject', 'headers', 'loading'],
  data() {
    return {
      singleExpand: false,
    };
  },
};
</script>

<style scoped>

</style>