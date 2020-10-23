<template>
  <v-container class="pa-0">
    <v-row no-gutters class="align-content-space-around d-flex">
      <!-- Crear cuetna -->
      <v-col class="col-12 col-md-12 mb-3 verde_suave text-center pa-5">
          <h3 class="verde_fuerte--text">CREAR CUENTA NUEVA</h3>
      </v-col>
      <!-- ==== -->
      <v-col class="col-12 pr-5 pl-5">
        <drag-and-drop-photo-card @uploadedPicture="setProfilePicture($event)"></drag-and-drop-photo-card>
        <v-text-field required label="Nombre completo" color="white" type="text" v-model="profile.username">
        </v-text-field>
        <v-text-field required label="Email" type="email" color="white" v-model="profile.email"></v-text-field>
        <!-- <v-text-field required label="Telefono" type="number" color="white" v-model="profile.phone"></v-text-field> -->
        <v-text-field 
        required 
        label="Password" 
        placeholder="Password"
        color="white" 
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        v-model="profile.password">
      </v-text-field>
        <v-text-field 
          required 
          label="Confirm Password" 
          placeholder="Confirm Password"
          color="white" 
          :type="showConfirmPassword ? 'text' : 'password'"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showConfirmPassword = !showConfirmPassword"
          v-model="confirmPassword">
        </v-text-field>
      </v-col>
      <v-col class="col-12 pr-5 pl-5">
        <v-switch
          label="Quiero recibir novedades de appets por email"
          color="verde_fuerte"
          v-model="notificar"
        ></v-switch>
      </v-col>
      <v-col class="col-12 pr-10 pl-10 text-center text-caption">
        <div class="pa-5">
          Al crear una cuenta estas aceptando los terminos los <a>termino y condiciones</a> de Appets y sus <a>politica de privacidad</a>
        </div>
      </v-col>
      <!-- BTN Crear usuario -->
      <v-col class="col-12 d-flex pl-5 pr-5 mb-5">
        <v-btn x-large style="width:100%" rounded class="white--text font-weight-bold" color="verde_fuerte"
          @click="createProfile()">CREAR USUARIO</v-btn>
      </v-col>
      <v-col class="col-12 d-flex pl-5 pr-5 mb-5">
        <v-spacer></v-spacer>
        <g-signin-button
              :params="googleSignInParams"
              @success="onSignInSuccessGoogle"
              @error="onSignInError"
              >
              <v-icon color="white">mdi-google</v-icon>
              Continuar con Google
            </g-signin-button>
            <v-spacer></v-spacer>
      </v-col>
      <v-col class="col-12 d-flex pl-5 pr-5 mb-5">
        <v-spacer></v-spacer>
        <fb-signin-button
              :params="fbSignInParams"
              @success="onSignInSuccessFacebook"
              @error="onSignInError">
              <v-icon>mdi-facebook</v-icon>
              Sign in with Facebook
            </fb-signin-button>
            <v-spacer></v-spacer>
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
                profile: {
                    profile_picture: null
                },
                showSnackbar: false,
                confirmPassword: '',
                showPassword: false,
                showConfirmPassword: false,
                notificar: true
            }
        },
        methods: {
            createProfile() {
                if (this.profile.profile_picture == null || this.profile.password != this.confirmPassword) {
                    this.showSnackbar = true
                    return;
                }

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
            },
            onSignInSuccessGoogle(googleUser) {
                // `googleUser` is the GoogleUser object that represents the just-signed-in user.
                // See https://developers.google.com/identity/sign-in/web/reference#users
                const profile = googleUser.getBasicProfile() // etc etc
            },
            onSignInSuccessFacebook(response) {
                FB.api('/me', dude => {
                    console.log(`Good to see you, ${dude.name}.`)
                })
            },
            onSignInError(error) {
                // `error` contains any error occurred.
                console.log('OH NOES', error)
            }
        }
    }
</script>

<style scoped>
    .g-signin-button {
        /* This is where you control how the button looks. Be creative! */
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
        margin: 8px;
    }
    
    .fb-signin-button {
        /* This is where you control how the button looks. Be creative! */
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #4267b2;
        color: #fff;
        margin: 8px;
    }
</style>