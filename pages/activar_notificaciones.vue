<template>
    <v-container class="pa-0">
        <v-row>
            <v-col class="col-12 pr-5 pl-5 text-center">
                <h2>Habilitar Notificaciones</h2>
                <p class="grey--text pa-5">Habilite las notificaciones push. </br> Para obtener mas ofertas y actualizaciones </p>
            </v-col>
            <v-col class="mb-auto">
                <v-img
                src="/notificaciones.png"
                class="ma-5"
                contain
                aspect-ratio="1.5"
                >
                </v-img>
            </v-col>
            <v-col class="col-12 col-md-12 pr-5 pl-5 text-center">
                <v-btn 
                x-large 
                rounded 
                class="white--text font-weight-bold absolute" 
                color="verde_fuerte"
                @click="$router.push('/')"
                >Permitir</v-btn>
                
            </v-col>
            <v-col class="col-12 col-md-12 pr-5 pl-5 text-center">
                <v-btn 
                x-large 
                text 
                class="white--text font-weight-bold absolute" 
                color="verde_fuerte"
                @click="$router.push('/')"
                >Denegar</v-btn>
            </v-col>
    </v-row>
    </v-container>
</template>

<script>
    export default {
        layout: 'empty'
    }
</script>