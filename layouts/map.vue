<template>
    <v-app>
        <v-content>
          <nuxt />
        </v-content>
      <bottom-navigation-bar></bottom-navigation-bar>
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