<template>
  <v-container d-flex align-center class="">
    <v-row no-gutters class="fill-height align-content-space-around d-flex">
      <v-col class="col-12 text-center">
              <v-img src="/logo.png" class="ma-auto" width="300px"></v-img>
      </v-col>
      <v-col class="col-12 pa-4">
        <v-text-field prepend-inner-icon="mdi-email" outlined required label="Email" color="white" type="email" v-model="profile.email"></v-text-field>
        <v-text-field 
        outlined 
        required 
        prepend-inner-icon="mdi-key-variant"
        label="Password" 
        color="white" 
        :type="show1 ? 'text' : 'password'"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show1 = !show1"
        v-model="profile.password">
      </v-text-field>
      <v-btn x-large style="width:100%" rounded class="white--text font-weight-bold" color="verde_fuerte"
          @click="loginUser()">INICIAR SESION</v-btn>
          <div class="d-flex">
            <v-spacer></v-spacer>
            <span>Olvidaste tu contrase;a?</span>
          </div>
          <div class="d-flex flex-column justify-center align-center mt-4">
            <g-signin-button
              :params="googleSignInParams"
              @success="onSignInSuccessGoogle"
              @error="onSignInError"
              >
              <v-icon color="white">mdi-google</v-icon>
              Continuar con Google
            </g-signin-button>
            <fb-signin-button
              :params="fbSignInParams"
              @success="onSignInSuccessFacebook"
              @error="onSignInError">
              <v-icon>mdi-facebook</v-icon>
              Sign in with Facebook
            </fb-signin-button>
          </div>
      </v-col>
      
    </v-row>
    <v-snackbar
      v-model="showSnackbar"
      timeout="1000"
      color="red"
    >
    Credenciales incorrectas
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
                show1: false,
                showSnackbar: false
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
                    })
                    return this.$router.push('/')
                } catch (e) {
                    this.showSnackbar = true
                }
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