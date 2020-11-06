<template>
    <v-container class="d-flex flex-column justify-space-between" style="height: 100%;">
        <div class="pa-5" >
            <h2 class="mb-5" >Cumpleaños</h2>
            <v-form
        ref="form"
        v-model="valid"
        >

        <v-text-field
        name="cumpleaños"
        placeholder="¿Cuando es el cumpleaños de tu mascota?"
        type="date"
        id="cumpleaños"
        v-model="cumpleaños"
        :rules="cumpleañosRules"
        required
        filled
        ></v-text-field>

        </v-form>
        </div>
        <div>
            <v-btn color="warning" @click="siguiente" block rounded>Siguiente</v-btn>
        </div>
        
    </v-container>
</template>

<script>
    export default {
        layout: 'newPet',
        data() {
            return {
                valid: false,
                cumpleaños: null,
                cumpleañosRules: [
                    v => !!v || 'Cumpleaños es requerido',
                ]
            }
        },
        methods: {
            siguiente() {
                this.$refs.form.validate()
                if (!this.valid) return;
                this.$store.dispatch('myPets/setCumpleaños', this.cumpleaños)
                let data = new FormData()
                data.append(`data`, JSON.stringify({...this.getPet(),
                    user: this.$auth.user.id
                }))
                data.append('files.profile_picture', this.getPet().profile_picture)
                this.$axios.post('/mascotas/', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(() => {
                        this.$router.push('/myPets/new/creado/')
                    })

            },
            getPet() {
                return this.$store.getters['myPets/pet'];
            }
        }
    }
</script>

<style>
    #cumpleaños::placeholder {
        font-size: 75% !important;
        text-align: center !important;
    }
</style>