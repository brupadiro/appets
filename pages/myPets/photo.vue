<template>
    <v-container class="d-flex flex-column justify-space-between full-height" >
        <div>
            <h2>Muestraselo al mundo!</h2>
            <span class="font-weight-light">Sube la mejor foto de tu mascota</span>
        </div>
        <div>
            <drag-and-drop-photo-card @uploadedPicture="setProfilePicture($event)"></drag-and-drop-photo-card>
        </div>
        <div>
            <h2>Y su nombre es...</h2>
            <v-text-field required label="Nombre..." @input="setPetName($event)"></v-text-field>
        </div>
      <v-btn x-large rounded class="white--text ma-5  font-weight-bold pa-5" color="success" @click="savePet()">Finalizar</v-btn>
    </v-container>
</template>

<script>
    import DragAndDropPhotoCard from '../../components/DragAndDropPhotoCard.vue'

    export default {
        layout: 'newPet',
        components: {
            DragAndDropPhotoCard
        },
        data() {
            return {
                name: ''
            }
        },
        methods: {
            setPetName(e){
                this.$store.dispatch('myPets/setName',e)
            },
            setProfilePicture(e){
                console.log(e)
                this.$store.dispatch('myPets/setProfilePicture',e)
            },
            savePet() {
                let data = new FormData() 
                data.append(`data`,JSON.stringify({...this.getPet,...this.$auth.user.id}))
                data.append('files.profile_picture',this.getPet.profile_picture)
                this.$axios.post('/mascotas/',data,{headers: {'Content-Type': 'multipart/form-data' }})
                    .then(()=>{
                        this.$router.push('/myPets')
                    })
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