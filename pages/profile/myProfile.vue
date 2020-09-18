<template>
    <v-container class="d-flex flex-column justify-space-between full-height" >
        <v-row no-gutters>
            <v-col class="col-12">
                <drag-and-drop-photo-card @uploadedPicture="setProfilePicture($event)"></drag-and-drop-photo-card>
            </v-col>
            <v-col class="col-12">
                <v-text-field outlined required label="Nombre" type="text" @input="setPetName($event)"></v-text-field>
            </v-col>
            <v-col class="col-12">
                <v-text-field outlined required label="Email" type="email" @input="setPetName($event)"></v-text-field>
            </v-col>
            <v-col class="col-12">
                <v-text-field outlined required label="Telefono" type="number" @input="setPetName($event)"></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import DragAndDropPhotoCard from '../../components/DragAndDropPhotoCard.vue'

    export default {
        layout: 'profile',
        components: {
            DragAndDropPhotoCard
        },
        data() {
            return {
                name: ''
            }
        },
        methods: {
            setPetName(e) {
                this.$store.dispatch('myPets/setName', e)
            },
            setProfilePicture(e) {
                console.log(e)
                this.$store.dispatch('myPets/setProfilePicture', e)
            },
            savePet() {
                let data = new FormData()
                data.append(`data`, JSON.stringify(this.getPet))
                data.append('files.profile_picture', this.getPet.profile_picture)
                this.$axios.post('/mascotas/', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(() => {
                        this.$router.push('/myPets')
                    }).catch((error) => {})
            }
        },
        computed: {
            getPet() {
                return this.$store.getters['myPets/pet'];
            }
        }
    }
</script>

<style scoped>
    .mt-100 {
        margin-top: 20%;
    }
    
    .full-height {
        height: 100%;
    }
</style>