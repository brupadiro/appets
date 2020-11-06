<template>
    <v-app>
      <v-app-bar fixed app class="elevation-0 white" dense>
        <v-btn v-if="$route.fullPath != '/myPets/new/creado/'" icon color="transparent" @click="$router.go(-1)">
          <v-icon color="black mr-5">mdi-arrow-left</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main class="pa-0" >
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