<template>
    <v-container class="d-flex text-center flex-column justify-space-between full-height" >
        <div>
            <h3>Imagen de perfil</h3>
        </div>
        <div>
            <drag-and-drop-photo-card @uploadedPicture="setProfilePicture($event)" :image="initialImage"></drag-and-drop-photo-card>
        </div>
        <div class="pl-5 pr-5">
            <v-form
            ref="formNewPetIndex"
            v-model="valid"
            >
                <v-text-field
                 filled
                 name="nombre-de-tu-mascota"
                 label="Nombre de tu mascota" 
                 id="nombre-de-tu-mascota"
                 :rules="nameRules"
                 @input="setPetName($event)"
                 required
                 ></v-text-field>
            </v-form>
        </div>
      <v-btn x-large rounded class="white--text ma-5 pa-5" color="warning" @click="savePet()">Siguiente</v-btn>
    </v-container>
</template>

<script>
    import DragAndDropPhotoCard from '../../../components/DragAndDropPhotoCard.vue'

    export default {
        layout: 'newPet',
        components: {
            DragAndDropPhotoCard
        },
        data() {
            return {
                valid: false,
                name: '',
                nameRules: [
                    v => (v && v.length > 0) || 'Name must be less than 10 characters',
                ],
                initialImage: null
            }
        },
        methods: {
            setPetName(e) {
                this.name = e
                this.$store.dispatch('myPets/setName', e)
            },
            setProfilePicture(image) {
                console.log(image)
                var reader = new FileReader()

                reader.onload = (e) => {
                    this.initialImage = e.target.result
                }
                reader.readAsDataURL(image)
                this.$store.dispatch('myPets/setProfilePicture', image)
            },
            savePet() {

                this.$refs.formNewPetIndex.validate()
                console.log(this.valid)
                if (!this.valid) return;

                this.$router.push('/myPets/new/tipo/')
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