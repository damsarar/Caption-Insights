<template>
  <v-app>
    <dashboard></dashboard>
  </v-app>
</template>

<script>
import Dashboard from "./components/Dashboard";

export default {
  name: 'App',

  components: {
    Dashboard,
  },

  data: () => ({
    //
  }),
};
</script>
