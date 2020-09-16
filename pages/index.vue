<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-12 col-sm-12" v-for="pub in publicaciones" :key="pub.pk">
        <postCard :publication="pub" @showpublication="getPublication($event)" class="mb-2"></postCard>
      </v-col>
    </v-row>
    <v-dialog scrollable fullscreen persistent v-model="modalComments">
      <v-card outlined class="elevation-0 ">
        <v-card-title class="pa-0">
          <v-btn icon @click="modalComments = false">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pa-0 blue-grey lighten-5" style="height: 100%;overflow-y:auto">
          <div class="white pa-1">
            <v-list-item class="grow pa-0">
              <v-list-item-avatar v-if="publication.imagen_principal!=null">
                <v-img class="elevation-6" contain :src="$axios.defaults.baseURL + publication.imagen_principal.url"
                  aspect-ratio="2" round></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{publication.user.username}}</v-list-item-title>
                <v-list-item-title class="font-weight-light">11/08/2020</v-list-item-title>
              </v-list-item-content>

              <v-row align="center" justify="end">
                <v-icon right>mdi-dots-vertical</v-icon>
              </v-row>
            </v-list-item>

            <span> {{publication.contenido}}</span>
          </div>
          <v-img aspect-ratio="2" class="white" contain v-if="publication.imagen_principal!=null"
            :src="$axios.defaults.baseURL + publication.imagen_principal.url">
          </v-img>
          <v-divider color="#eceff1" height="1"></v-divider>
        <v-row class="d-flex justify-space-between pa-3">
            <v-btn text small class="font-weight-regular">
              <v-icon dark left>mdi-thumb-up-outline</v-icon>
            </v-btn>
            <v-btn text small class="font-weight-regular" @click="$emit('showpublication',publication)">
              <v-icon dark left>mdi-comment-outline</v-icon>
            </v-btn>
            <v-btn text small class="font-weight-regular">
              <v-icon dark left>mdi-share-outline</v-icon>
            </v-btn>
          </v-row>
          <v-list three-line color="blue-grey lighten-5 pt-0">
            <template v-for="(comentario, index) in publication.comentarios">

              <v-list-item :key="comentario.id" color="black">
                <v-list-item-avatar>
                  <v-img :src="$axios.defaults.baseURL + publication.imagen_principal.url"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="comentario.user.username"></v-list-item-title>
                  <v-list-item-subtitle v-html="comentario.contenido"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider :key="index"></v-divider>
            </template>
          </v-list>
        </v-card-text>
        <v-divider color="#cecece" height="1"></v-divider>
        <v-card-actions class="pl-6 pr-6 blue-grey lighten-5">
          <v-input hide-details class="d-flex justify-space-between">
            <v-text-field placeholder="Tu comentario..." outlined dense rounded hide-details v-model="comentario.contenido" background-color="white"></v-text-field>
            <v-btn icon class="font-weight-light overline" color="primary" @click="addComment()">
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </v-input>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import postCard from "../components/postCard.vue"
  export default {
    components: {
      postCard
    },
    data() {
      return {
        modalComments: false,
        publicaciones: [],
        publication: {
          user: {},
          imagen_principal: {}
        },
        comentario: {}

      }
    },
    created() {
      this.getPosts()
    },
    mounted() {
      this.$root.$on('newPublication', () => {
        this.getPosts()
      })
    },
    methods: {
      getPosts() {
        this.$axios.get('/publicaciones/')
          .then((data) => {
            this.publicaciones = data.data
          })
      },
      async getPublication(publication) {
        console.log(publication)
        this.modalComments = true
        this.publication = publication
        await this.$axios.get('/comentarios/?publicacion=' + publication.id, this.comentario)
          .then((data) => {
            this.publication.comentarios = data.data
            this.$forceUpdate()
          })
      },
      addComment() {
        this.comentario.publicacion = this.publication.id
        this.comentario.user = this.$auth.user.id
        this.$axios.post('/comentarios/', this.comentario)
          .then((data)=>{
            this.publication.comentarios.push(data.data)
            this.$forceUpdate()
          })
      },
    }
  }

</script>
