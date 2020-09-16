<template>
  <v-container fill-height class="container-disconected">
    <v-row no-gutters class="fill-height align-content-space-around d-flex">
      <v-col class="col-12 col-md-12">
        <v-btn icon color="white"  to="/home">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-col class="col-12">
        <drag-and-drop-photo-card @uploadedPicture="setProfilePicture($event)"></drag-and-drop-photo-card>
        <v-text-field outlined required label="Nombre de usuario" color="white" type="text" v-model="profile.username">
        </v-text-field>
        <v-text-field outlined required label="Email" type="email" color="white" v-model="profile.email"></v-text-field>
        <v-text-field outlined required label="Telefono" type="number" color="white" v-model="profile.phone"></v-text-field>
        <v-text-field 
          outlined 
          required 
          label="Password" 
          color="white" 
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          v-model="profile.password">
        </v-text-field>
      </v-col>
      <v-col class="col-12 d-flex">
        <v-btn x-large style="width:100%" rounded class="white--text font-weight-bold" color="success"
          @click="createProfile()">CREAR USUARIO</v-btn>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="showSnackbar"
      timeout="1000"
      label="aver"
    >
    Error en el registro
    </v-snackbar>
  </v-container>
</template>


<script>
    import axios from 'axios';
    export default {
        layout: 'disconected',
        data() {
            return {
                profile: {},
                showSnackbar: false,
                show1: false
            }
        },
        methods: {
            createProfile() {
                axios.post(this.$axios.defaults.baseURL + '/auth/local/register', this.profile)
                    .then((data) => {
                        this.login()
                    }).catch((err) => {
                        this.showSnackbar = true
                    })
            },
            setProfilePicture(e) {
                this.profile.profile_picture = e
            },
            async login() {
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