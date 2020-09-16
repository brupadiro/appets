<template>
  <v-app>
    <v-app-bar fixed app class="elevation-3" dense color="primary">
      <img src="/logo.png" width="40px">
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="'Feed'" class="green--text overline" />
      <v-spacer></v-spacer>
      <v-btn icon small @click="addPublication = !addPublication">
        <v-icon>mdi-application</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content class="blue-grey lighten-5">
      <nuxt />
    </v-content>
    <bottom-navigation-bar></bottom-navigation-bar>
    <create-post v-model="addPublication"></create-post>
  </v-app>
</template>

<script>
  import BottomNavigationBar from "~/components/BottomNavigationBar.vue"
  import createPost from "~/components/createPost.vue"

  export default {
    components: {
      createPost,
      BottomNavigationBar
    },
    data() {
      return {
        addPublication: false,
      }
    },
    methods: {}
  }

</script>
