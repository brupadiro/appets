<template>
  <v-container fluid class="pa-0">
    <v-card class="fill-height p-relative" >
        <v-card-title class="title-map elevation-2 " >
          <v-row>
            <v-col class="col-8 col-sm-8 pl-10">
              <h2 class="verde_fuerte--text">{{myPet.name}}</h2>
              <span class="verde_fuerte--text align-center"><v-icon color="verde_suave">mdi-checkbox-blank-circle</v-icon> Online</span>
            </v-col>
            <v-col class="col-4 col-sm-4 text-center align-center">
              <v-icon size="50" color="verde_fuerte" class="ma-auto">mdi-home</v-icon>
            </v-col>
          </v-row>
        </v-card-title>
      <gmap-map ref="map" style="width: 100%; height:100%; left:0;"
        :center="{lat: parseFloat(geo.lat), lng: parseFloat(geo.lng)}" :zoom="18">
        <!-- <gmap-marker :key="51" :position=""
          :icon="{url: '/marker.png'}" ></gmap-marker> -->
          <gmap-custom-marker :marker="geo"> 
              <v-avatar
                size="60px"
                color="verde_suave"
                class="elevation-1"
              >
              <v-avatar  size="50px">
                <v-img
                  :src="$axios.defaults.baseURL + myPet.profile_picture.url"
                ></v-img>
              </v-avatar>              
            </v-avatar>
            
          </gmap-custom-marker>

      </gmap-map>
      
    </v-card>
  </v-container>
</template>

<script>
    import GmapCustomMarker from 'vue2-gmap-custom-marker';

    export default {
        layout: 'map',
        data() {
            return {
                myPet: {
                    profile_picture: {
                        url: ''
                    }
                },
                geo: {
                    lat: -34.524700,
                    lng: -56.281274,
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
                        this.$root.$emit('cambiarFotoMapaButton', this.myPet.profile_picture.url)
                    })
            }
        },
        components: {
            GmapCustomMarker
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
    
    .title-map {
        background-color: #f3f3f3;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
    }
    
    .p-relative {
        position: relative;
    }
</style>