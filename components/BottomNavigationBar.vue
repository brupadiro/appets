<template>
  <div class="pa-3">
    <v-bottom-navigation fixed grow app class="bottom-navigation verde_suave" height="60px">
      <v-btn color="verde_fuerte"  to="/" icon small>
        Social
        <v-icon>mdi-text-account</v-icon>
      </v-btn>
      
      <v-btn value="productos" color="verde_fuerte" icon small  to="/productos">
        Servicios
        <v-icon>mdi-cart-variant</v-icon>
      </v-btn>
   
      <v-btn value="my-pets" color="verde_fuerte"  to="/myPets" icon small>
          <v-avatar color="verde_fuerte" size="65px" class="p-absolute elevation-5">
            <v-icon v-if="petImg == '' || petImg == null" color="white">mdi-map</v-icon>
            <v-img v-else
          :src="$axios.defaults.baseURL + petImg"
        ></v-img>
          </v-avatar>
      </v-btn>

      <v-btn value="profile" color="verde_fuerte" to="/profile" icon small>
        Perfil
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
    export default {
        name: 'BottomNavigationBar',
        data() {
            return {
                bottomNav: 'profile',
                petImg: ''
            }
        },
        mounted() {
            this.$root.$on('cambiarFotoMapaButton', (newImg) => {
                this.petImg = newImg
            })
        }
    }
</script>

<style>
    .bottom-navigation {
        /* margin: 12px;
        width: calc(100% - 24px)!important;
        border-radius: 3px; */
    }
    
    .p-absolute {
        position: absolute;
        top: -30px;
        border-style: dotted;
    }
</style>