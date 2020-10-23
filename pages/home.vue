<template>
  <v-container d-flex align-center class="container-disconected pa-0 fill-height" >
    <v-img :src="login" >
      <v-img :src="logo" class="mb100"></v-img>
      <div class="d-flex flex-column pa-5">
         <v-btn
         rounded
         large
         depressed
         color="verde_suave"
         @click="$router.push('/login')"
         class="font-weight-bold ma-3"
       >
         Iniciar sesion                      
       </v-btn>  
       <v-btn
           rounded
           large
           depressed
           color="verde_fuerte"
           @click="$router.push('/registro')"
           class="white--text font-weight-bold ma-3"
         >
         Crear cuenta
         </v-btn>   
      </div>
 </v-img>
  </v-container>
</template>


<script>
    import axios from 'axios';
    export default {
        layout: 'disconected',
        data() {
            return {
                login: require('@/assets/login.png'),
                logo: require('@/assets/logo.png'),
            }
        }
    }
</script>

<style scoped>
    .fill-height {
        height: 100vh;
    }
    
    .column {
        height: 40vh;
    }
    
    .mb100 {
        margin-bottom: 100%;
    }
</style>