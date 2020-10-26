<template>
    <v-container class="fill-height pa-0">
        <v-row>
                <v-col class="col-12 col-md-12 mb-3 verde_suave text-center pa-5">
                    <h3 class="verde_fuerte--text">HOLA!</h3>
                </v-col> 
                <v-col class="col-12 pr-5 pl-5 text-center">
                    <h2>¿Tiene un GPS Appets?</h2>
                    <p class="grey--text">Para poder rastrear a tu mascota, es necesario contar con un GPS APPETS</p>
                </v-col>
                <v-col class="col-12 col-md-12">
                    <v-img
                    src="/compraGPS.png"
                    class="ma-5"
                    >
                    <div class="absolute">
                        <v-btn 
                    x-large 
                    style="width:100%" 
                    rounded 
                    class="white--text font-weight-bold mb-5" 
                    color="verde_fuerte"
                    @click="$router.push('/gps/on')"
                    >COMPRAR UN GPS APPETS</v-btn>
                    <v-btn 
                    x-large 
                    style="width:100%" 
                    rounded 
                    class="verde_fuerte--text font-weight-bold " 
                    color="verde_suave"
                    @click="$router.push('/gps/on')"
                    >ACTIVAR UN GPS APPETS</v-btn>
                    </div>
                    </v-img>
                </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        layout: 'empty',

    }
</script>

<style scoped>
    .absolute {
        position: absolute;
        bottom: 10px;
        left: 0px;
    }
</style>