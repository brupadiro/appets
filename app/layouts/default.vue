<template>
  <v-app>
    <v-app-bar fixed app class="elevation-0" dense>
      <v-row no-gutters>
        <v-col class="col-4  d-flex justify-center align-center">
        </v-col>
        <v-col class="col-4 text-center">
          <v-toolbar-title v-text="'Feed'" class="overline white--text" />
        </v-col>
        <v-col class="col-4 d-flex justify-end align-center">
          <v-btn icon small>
            <v-icon>mdi-application</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-content>
        <nuxt />
      </v-content>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false
      }
    }
  }

</script>
