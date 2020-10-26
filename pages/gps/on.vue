<template>
    <v-container class="pa-0">
        <v-row>
            <v-col class="col-12 col-md-12 mb-3 verde_suave text-center pa-5">
                <h3 class="verde_fuerte--text">HOLA!</h3>
            </v-col> 
            <v-col class="col-12 pr-5 pl-5 text-center">
                <h2>Encender el GPS</h2>
                <p class="grey--text">Por favor asegurate de cargar tu GPS y acercalo a tu celular</p>
            </v-col>
            <v-col>
                <v-img
                src="/GPSon.png"
                class="ma-5"
                >
                </v-img>
            </v-col>
            <v-col class="col-12 col-md-12  text-center">
                <v-btn 
                x-large 
                style="width:90%" 
                rounded 
                class="white--text font-weight-bold" 
                color="verde_fuerte"
                @click="$router.push('/gps/id')"

                >LISTO</v-btn>
            </v-col>
    </v-row>
    </v-container>
</template>

<script>
    export default {
        layout: 'empty',
    }
</script>