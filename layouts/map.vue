<template>
    <v-app>
        <v-main>
          <nuxt />
        </v-main>
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