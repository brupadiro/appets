<template>
  <v-container d-flex align-center class="container-disconected pa-0">
    <v-row no-gutters class="fill-height align-content-space-around d-flex">
      <v-col class="col-12">
          <v-img class="ma-auto" src="/logo-completo.png" width="300px"></v-img>
      </v-col>
      <v-col class="col-12 pa-3">
        <v-btn x-large style="width:100%" depressed rounded class="white--text font-weight-bold mb-3" to="/registro" color="success">REGISTRATE</v-btn>
        <v-btn x-large style="width:100%" outlined rounded class="white--text font-weight-bold" to="/login" color="success">INICIA SESION</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
  import axios from 'axios';
  export default {
    layout: 'disconected',
  }

</script>

<style scoped>
  .fill-height {
    height: 100vh;
  }

  .column {
    height: 40vh;
  }

</style>
