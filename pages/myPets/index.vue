<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col class="col-12 col-sm-12">
        <div v-if="pets.length === 0" class="d-flex flex-column justify-space-between">
          <p class="no-mascotas text-center">No tienes mascotas registradas</p>
          <div class="d-flex flex-column text-center">
            <v-img
              src="/cat.png"
              aspect-ratio="2.5"
            >
              <v-btn text icon color="primary" disabled>
                <v-icon size="100" :nuxt="true" to="myPets/new">mdi-plus</v-icon>
              </v-btn>
          </v-img>
          </div>

          
        </div>
        <v-card class="mb-2 elevation-5 rounded-lg" v-for="pet in pets" :key="pet.id" >
          <v-card-title primary-title >
            <v-avatar class="mr-2" v-if="pet.profile_picture">
              <img :src="$axios.defaults.baseURL + pet.profile_picture.url" alt="my_pet_figure">
            </v-avatar>
            <div class="d-flex flex-column">
              <span class="body-1 font-weight-bold capitalize">{{pet.name}}</span>
            </div>
          </v-card-title>
          <div class="pa-2" :nuxt="true" :to="`myPets/map/${pet.id}`">
            <v-img src="https://static-maps.yandex.ru/1.x/?lang=en-US&ll=-73.7638,42.6564&z=13&l=map&size=600,300"
              height="100"></v-img>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="info" :nuxt="true" :to="`/myPets/map/${pet.id}`">Ver en el mapa</v-btn>
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
                this.$axios.get(`/mascotas/?user=${this.$auth.user.id}`)
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