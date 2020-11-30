<template>
          <v-card class="full-width" flat>
            <amigos-sugeridos></amigos-sugeridos>
          </v-card>
    
</template>

<script>
    import AmigosSugeridos from '~/components/AmigosSugeridos.vue'

    export default {
        data() {
            return {
                tab: null,
                items: [
                    'Nuevos', 'Amigos', 'Seguidores',
                ],
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            }
        },
    }
</script>