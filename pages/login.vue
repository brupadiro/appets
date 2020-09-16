<template>
  <v-container d-flex align-center class="container-disconected">
    <v-row no-gutters class="fill-height align-content-space-around d-flex">
      <v-col class="col-12 col-md-12">
        <v-btn icon color="white" to="/home">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-col class="col-12 text-center">
        <h1 class="green--text">Bienvenido!</h1>
      </v-col>
      <v-col class="col-12 text-center">
              <v-img src="/dog-background.png" class="ma-auto" width="200px"></v-img>
      </v-col>
      <v-col class="col-12">
        <v-text-field outlined required label="Email" color="white" type="email" v-model="profile.email"></v-text-field>
        <v-text-field outlined required label="Password" color="white" type="text" v-model="profile.password"></v-text-field>
      </v-col>
      <v-col class="col-12 d-flex">
        <v-btn x-large style="width:100%" rounded class="white--text font-weight-bold" color="success"
          @click="loginUser()">INICIAR SESION</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
  import axios from 'axios';
  export default {
    layout:'disconected',
    data() {
      return {
        profile: {}
      }
    },
    methods: {
      async loginUser() {
        this.loading = true
        try {
          await this.$auth.loginWith("local", {
            data: {
              identifier: this.profile.email,
              password: this.profile.password
            }
          });
          return this.$router.push('/')
        } catch (e) {}
      }
    }
  }

</script>

<style scoped>
</style>