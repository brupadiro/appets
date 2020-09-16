<template>
  <v-container fluid class="pa-0 p-relative">
    <v-card class="fill-height">
        <v-toolbar elevation="5" color="green">
            <v-btn icon color="white" to="/myPets">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title class="white--text font-weight-bold">
                Mi mascota
            </v-toolbar-title>
        </v-toolbar>
      <gmap-map ref="map" style="width: 100%; height:100%; left:0;"
        :center="{lat: parseFloat(geo.latitud), lng: parseFloat(geo.longitud)}" :zoom="18">
        <gmap-marker :key="51" :position="{lat: parseFloat(geo.latitud), lng: parseFloat(geo.longitud)}"
          :icon="{url: '/marker.png'}" ></gmap-marker>
      </gmap-map>
      <v-card class="elevation-5 rounded-pill card-pet">
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3" v-if="myPet.profile_picture!=null">
            <v-img class="elevation-6" :src="$axios.defaults.baseURL + myPet.profile_picture.url" aspect-ratio="2"
              round>
            </v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{myPet.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        myPet: {},
        geo: {
          latitud: -34.524700,
          longitud: -56.281274,
        },
      }
    },
    created() {
      this.getPet()
    },
    methods: {
      getPet() {
        const idPet = this.$route.params.id_pet
        this.$axios.get(`/mascotas/${idPet}/`)
          .then((data) => {
            this.myPet = data.data
          })
      }
    }
  }

</script>

<style scoped>
  .card-pet {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    width: 80%;
    margin: 0 auto;
  }

  .p-relative {
    position: relative;
  }

</style>
