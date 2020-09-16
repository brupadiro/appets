<template>
    <v-app>
      <v-app-bar fixed app class="elevation-0 green" dense>
        <v-row no-gutters>
          <v-col class="col-1  d-flex justify-center align-center">
              <v-btn icon small>
                  <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
          </v-col>
          <v-col class="col-11 text-center pa-2">
            <v-text-field
            hide-details
            single-line
            label="Search"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-app-bar>
      <v-main class="pa-0">
        <v-content>
          <nuxt />
        </v-content>
      </v-main>
      <bottom-navigation-bar></bottom-navigation-bar>
    </v-app>
  </template>

<script>
    import BottomNavigationBar from '../components/BottomNavigationBar'

    export default {
        middleware: "auth",

        data() {
            return {
                drawer: false
            }
        },
        components: {
            BottomNavigationBar
        }
    }
</script>