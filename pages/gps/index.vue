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
                <v-col>
                    <v-img
                    src="/compraGPS.png"
                    class="ma-5"
                    >
                    <v-btn 
                    x-large 
                    style="width:100%" 
                    rounded 
                    class="white--text font-weight-bold absolute" 
                    color="verde_fuerte"
                    >COMPRAR UN GPS APPETS</v-btn>
                    </v-img>
                </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        layout: 'disconected',

    }
</script>

<style>
    .absolute {
        position: absolute;
        bottom: 10px;
        left: 0px;
    }
</style>