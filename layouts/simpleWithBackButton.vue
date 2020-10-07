<template>
  <v-app>
    <v-app-bar fixed app class="elevation-0" dense color="primary">
      <v-btn icon small @click="$router.push('/productos')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content class="white lighten-5">
      <nuxt style="margin-top:-15px;" />
    </v-content>
    <BottomNavigationBar></BottomNavigationBar>
  </v-app>
</template>

<script>
  import BottomNavigationBar from "~/components/BottomNavigationBar.vue"

  export default {
    middleware: "auth",
    components: {
      BottomNavigationBar
    }
  }

</script>
