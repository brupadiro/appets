<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col class="col-12 col-sm-12">
        <div v-if="pets.length == 0" class="d-flex flex-column justify-space-between">
          <p class="no-mascotas text-center">No tienes mascotas registradas</p>
          <div class="d-flex flex-column text-center">
            <v-img
              src="/cat.png"
              aspect-ratio="2.5"
            >
              <v-btn flat icon color="primary" disabled>
                <v-icon size="100" :nuxt="true" to="myPets/new">mdi-plus</v-icon>
              </v-btn>
          </v-img>
          </div>

          
        </div>
        <v-card class="mb-2 elevation-5 rounded-lg" v-for="pet in pets" :key="pet.id" :to="`myPets/map/${pet.id}`">
          <v-card-title primary-title>
            <v-avatar class="mr-2">
              <img :src="$axios.defaults.baseURL + pet.profile_picture.url" alt="my_pet_figure">
            </v-avatar>
            <div class="d-flex flex-column">
              <span class="body-1 font-weight-bold capitalize">{{pet.name}}</span>
            </div>
          </v-card-title>
          <div class="pa-2">
            <v-img src="https://static-maps.yandex.ru/1.x/?lang=en-US&ll=-73.7638,42.6564&z=13&l=map&size=600,300"
              height="100"></v-img>
          </div>
          <v-card-actions>
            <v-btn text color="red">Reportar perdido</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="info" @click="showMap = true;myPet = pet">Ver en el mapa</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog fullscreen v-model="showMap">
      <v-card>

      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                pets: [],
                myPet: {},
                showMap: false,
            }
        },
        created() {
            this.getPets()
        },
        methods: {
            getPets() {
                this.$axios.get('/mascotas')
                    .then((data) => {
                        this.pets = data.data
                    })
            }
        },
        layout: 'myPets'
    }
</script>

<style scoped>
    .no-mascotas {
        font-size: 30px;
        font-weight: bold;
    }
</style>