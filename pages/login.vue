<template>
  <v-container d-flex align-center class="">
    <v-row no-gutters class="fill-height align-content-space-around d-flex">
      <v-col class="col-12 text-center">
              <v-img 
              src="/logo.png" 
              class="ma-auto" 
              width="300px"
              @click="$router.push('/home')"
              ></v-img>
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
            <span @click="showNewPassword = true" >¿Olvidaste tu contraseña?</span>
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

    <!-- NewPassword -->
    <v-dialog
      v-model="showNewPassword"
      max-width="500px"
      transition="dialog-transition"
      class="text-center"
    >
    <v-card>
      <v-card-title primary-title>
        Nueva contraseña
      </v-card-title>
      <v-card-text>
        <p>Te enviaremos un email</p>
        <v-text-field
          name="email"
          label="Tu email"
          v-model="email"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="verde_fuerte" outlined @click="showResetPass = true">Ingresar codigo</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="verde_fuerte" class="white--text" @click="newPassword" >Enviar email</v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog>
    <!-- ResetPassword -->
    <v-dialog
    v-model="showResetPass"
      max-width="500px"
      transition="dialog-transition"
      class="text-center"
    >
    <v-card>
      <v-card-title primary-title>
        Nueva contraseña
      </v-card-title>
      <v-card-text>
        <p>Copia el codigo que te enviamos por email y pegalo aqui</p>
        <v-text-field
          name="codigo"
          label="Codigo"
          v-model="codigo"
        ></v-text-field>
        <v-text-field
          name="contraseña"
          label="Contraseña"
          v-model="resetPass"
        ></v-text-field>
        <v-text-field
          name="contraseña_confirm"
          label="Confirmacion de contraseña"
          v-model="resetPassConf"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="verde_fuerte" class="white--text" @click="resetPassword" >Cambiar contrase;a</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
      
    </v-dialog>
    <v-snackbar
      v-model="showSnackbar"
      timeout="1000"
      :color="snackBarColor"
    >
    {{snackBarMessage}}
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
                showSnackbar: false,
                showNewPassword: false,
                email: '',
                snackBarMessage: 'Credenciales incorrectas',
                showResetPass: false,
                codigo: '',
                resetPass: '',
                resetPassConf: ''
            }
        },
        computed: {
            snackBarColor() {
                return (this.snackBarMessage == 'Credenciales incorrectas' || this.snackBarMessage == 'Contraseñas no coinciden') ? 'red' : 'green'
            }
        },
        methods: {
            newPassword() {
                axios.post('/auth/forgot-password', {
                    email: this.email
                }).then(response => {
                    this.snackBarMessage = 'Se envio el email'
                    this.showNewPassword = false
                    this.showSnackbar = true
                }).catch(error => {
                    this.snackBarMessage = 'Credenciales incorrectas'
                    this.showNewPassword = false
                    this.showSnackbar = true
                })
            },
            resetPassword() {
                axios.post('/auth/reset-password', {
                    code: this.codigo,
                    password: this.resetPass,
                    passwordConfirmation: this.resetPassConf

                }).then((response) => {
                    this.snackBarMessage = 'Nueva contraseña lista'
                    this.showResetPass = false
                    this.showNewPassword = false
                    this.showSnackbar = true
                }).catch(error => {
                    this.snackBarMessage = 'Contraseñas no coinciden'
                    this.showNewPassword = false
                    this.showSnackbar = true
                })
            },
            async loginUser() {
                this.loading = true
                try {
                    await this.$auth.loginWith("local", {
                        data: {
                            identifier: this.profile.email,
                            password: this.profile.password
                        }
                    })
                    return this.$router.push('/activar_notificaciones')
                } catch (e) {
                    this.snackBarMessage = 'Credenciales incorrectas'
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