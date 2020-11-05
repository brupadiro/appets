<template>
    <v-container class="pa-5">
        <h2>Perfil creado!</h2>
        <v-img
        src="https://picsum.photos/id/11/500/300"
        >
        </v-img>
        <p>El perfil de tu mascota fue creado.</p>
        <div>
            <v-btn 
            color="warning"
            block rounded
            >Finalizar</v-btn>
        </div>
    </v-container>
</template>

<script>
    export default {
        layout: 'newPet',
    }
</script>