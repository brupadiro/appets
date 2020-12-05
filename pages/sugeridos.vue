<template>
          <v-card class="full-width" flat>
            <amigos-sugeridos></amigos-sugeridos>
          </v-card>
    
</template>

<script>
    import AmigosSugeridos from '~/components/AmigosSugeridos.vue'

    export default {
        components: {
            AmigosSugeridos
        }
    }
</script>