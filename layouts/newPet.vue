<template>
    <v-app>
      <v-app-bar fixed app class="elevation-0 teal lighten-5" dense>
        <v-btn icon color="transparent" to="/myPets">
          <v-icon color="black mr-5">mdi-arrow-left</v-icon>
        </v-btn>
        <v-progress-linear :indeterminate="false" buffer-value="100" value="50" color="teal lighten-4"></v-progress-linear>
      </v-app-bar>
      <v-main class="pa-0 teal lighten-5" >
        <v-content style="height:100%">
          <nuxt />
        </v-content>
      </v-main>
    </v-app>
  </template>

<script>
    export default {
        middleware: "auth",

        data() {
            return {
                drawer: false
            }
        },
    }
</script>