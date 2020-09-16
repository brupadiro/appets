<template>
  <v-container class="d-flex flex-column justify-space-between full-height">
    <div class="d-flex flex-column justify-space-between full-height">
      <div>
        <h2 class="mb-5">Mi mascota es...</h2>
        <v-row class="mt-100">
          <v-col class="col-6" @click="setType('Perro')">
            <div
              :class="(getPetType=='Perro')?'active text-center d-flex flex-column justify-center align-center':'inactive text-center d-flex flex-column justify-center align-center'">
              <v-avatar size="120" color="orange">
                <v-img src="/dog.png" contain rounded></v-img>
              </v-avatar>
              <span class="black--text font-weight-black " style="font-size: 2em">Perro</span>
            </div>
          </v-col>
          <v-col class="col-6 text-center d-flex flex-column justify-center align-center" @click="setType('Gato')">
            <div
              :class="(getPetType=='Gato')?'active text-center d-flex flex-column justify-center align-center':'inactive text-center d-flex flex-column justify-center align-center'">
              <v-avatar color="green" size="120" :class="(getPetType=='Gato')?'active':'inactive'">
                <v-img src="/cat.png" contain></v-img>
              </v-avatar>
              <span class="black--text  font-weight-black " style="font-size: 2em">Gato</span>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-btn x-large rounded class="white--text ma-5  font-weight-bold pa-5" :color="(getPetType)?'success':'blue-grey lighten-2'"
        to="/myPets/photo/">Siguiente</v-btn>
    </div>
  </v-container>
</template>

<script>
  export default {
    layout: 'newPet',
    methods: {
      setType(type) {
        console.log(type)
        this.$store.dispatch('myPets/setType', type)
      },
    },
    computed: {
      getPetType() {
        return this.$store.getters["myPets/pet"].type
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

  .active {
    opacity: 1;
  }

  .inactive {
    opacity: .5;
  }

</style>
