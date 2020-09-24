<template>
    <v-app>
      <v-app-bar fixed app class="elevation-0" dense color="transparent">
        <v-btn icon small @click="$router.push('/productos')">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-app-bar>
      <v-content class="white lighten-5">
        <nuxt />
      </v-content>
    </v-app>
  </template>

<script>
    import BottomNavigationBar from "~/components/BottomNavigationBar.vue"
    import createPost from "~/components/createPost.vue"

    export default {
        middleware: "auth",
    }
</script>