<template>
    <v-container class="fill-height">
        <v-row style="height: 100%">
            <v-col class="col-12 pa-5" >
                <h3 class="mb-5">Sexo</h3>
                <v-row>
                    <v-col class="text-center">
                        <v-avatar
                            size="100"
                            color="teal lighten-4"
                            class="mb-1"
                            @click="sexPet = 'macho'"
                        >
                            <v-icon size="50" color="white">mdi-gender-male</v-icon>
                        </v-avatar>
                        <p :class="(sexPet == 'macho')? 'red--text accent-2--text': ''" >Macho</p>
                    </v-col>
                        <v-col class="text-center">
                            <v-avatar
                                size="100"
                                color="light-blue lighten-1"
                                class="mb-1"
                                @click="sexPet = 'hembra'"

                            >
                            <v-icon size="50" color="white">mdi-gender-female</v-icon>
                            </v-avatar>
                            <p :class="(sexPet == 'hembra')? 'red--text accent-2--text': ''" >Hembra</p>

                        </v-col>
                </v-row>
            </v-col>
            <v-col class="col-12 color-grey text-center" style="height: 55%">
                <h3>¿Castrado/a?</h3>
                <v-row class="pa-5">
                    <v-col class="col-6 text-center" >
                        <v-btn color="blue" rounded block :disabled="(sexPet == '')"  @click="siguiente(true)">Si</v-btn>
                    </v-col>
                    <v-col class="col-6 text-center" >
                        <v-btn color="warning" rounded block :disabled="(sexPet == '')" @click="siguiente(false)">No</v-btn>
                    </v-col>
                </v-row>
                <div class="d-flex justify-space-around">
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        layout: 'newPet',
        methods: {
            siguiente(val) {
                this.$store.dispatch("myPets/setCastrado", val)
                this.$router.push("/myPets/new/cumpleYPeso")
            }
        },
        computed: {
            sexPet: {
                set(val) {
                    this.$store.dispatch("myPets/setSex", val)
                },
                get() {
                    return this.$store.getters["myPets/pet"].sex
                }
            }
        }
    }
</script>

<style scoped>
    .color-grey {
        background: rgb(245, 245, 245);
    }
</style>