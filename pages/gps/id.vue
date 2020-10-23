<template>
    <v-container class="pa-0">
        <v-row>
            <v-col class="col-12 col-md-12 mb-3 verde_suave text-center pa-5">
                <h3 class="verde_fuerte--text">HOLA!</h3>
            </v-col> 
            <v-col class="col-12 col-md-12 pr-5 pl-5 text-center">
                <h2>Ingresa el ID</h2>
                <p class="grey--text">Quita la tapa azul e ingresa el ID que se encuentra debajo del codigo QR</p>
            </v-col>
            <v-col class="col-12 col-md-12">
                <v-img
                src="/GPSid.png"
                class="ma-5"
                contain
                height="200"
                >
                </v-img>
            </v-col>
            <v-col class="col-12 col-md-12 pr-10 pl-10">
                <v-text-field
                    label="ID"
                ></v-text-field>
            </v-col>
            <v-col class="col-12 col-md-12 pr-5 pl-5">
                <v-btn 
                x-large 
                style="width:100%" 
                rounded 
                class="white--text font-weight-bold absolute" 
                color="verde_fuerte"
                >LISTO</v-btn>
            </v-col>
    </v-row>
    </v-container>
</template>

<script>
    export default {
        layout: 'disconected',
        data() {
            return {
                id: ''
            }
        }
    }
</script>