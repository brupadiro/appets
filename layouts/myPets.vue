<template>
    <v-app>
      <v-app-bar fixed app class="elevation-0 green" dense>
        <v-row no-gutters>
          <v-col class="col-4  d-flex justify-center align-center">
          </v-col>
          <v-col class="col-4 text-center">
            <v-toolbar-title v-text="'Mis mascotas'" class="overline white--text" />
          </v-col>
          <v-col class="col-4 d-flex justify-end align-center">
            <v-btn icon small :nuxt="true" to="myPets/new">
              <v-icon>mdi-paw</v-icon>
            </v-btn>
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