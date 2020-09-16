<template>
    <v-app>
      <v-main>
        <v-content>
          <nuxt />
        </v-content>
      </v-main>
    </v-app>
  </template>

<script>
    export default {
        middleware: "auth",

    }
</script>