<template>
    <v-container class="pa-0">
      <div class="blue-grey lighten-5">
        <v-row class="pt-5" no-gutters>
          <v-col class="col-4 d-flex flex-column justify-center align-center">
            <p class="font-weight-black">{{seguidores}}</p>
            <span class="font-weight-black" color="grey lighten-5">Seguidores</span>
          </v-col>
          <v-col class="col-4 text-center">
            <v-avatar color="teal" size="100">
              <v-img v-if="profile.profile_picture.url" :src="$axios.defaults.baseURL + profile.profile_picture.url"></v-img>
              <v-icon v-else size="100">mdi-account-circle-outline</v-icon>
            </v-avatar>
          </v-col>
          <v-col class="col-4 d-flex flex-column justify-center align-center">
            <p class="font-weight-black">{{seguidos}}</p>
            <span class="font-weight-black" color="grey lighten-5">Seguidos</span>
          </v-col>
          <v-col class="col-12 d-flex flex-column justify-center align-center">
            <v-btn rounded outlined class="mt-3" @click="followUnfollow">{{seguirODejarSeguir}}</v-btn>
          </v-col>
        </v-row>
        <v-tabs v-model="tab" background-color="transparent" grow>
          <v-tab v-for="(item,key) in items" :key="item.tab">
            {{ key }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <post-card v-for="(publication,index) in publications" :key="index" :publication="publication" @showpublication="getPublication($event)"></post-card>
          </v-tab-item>
        </v-tabs-items>
      </div>
      
    <!-- Info post -->
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
    import PostCard from "~/components/PostCard.vue"
    import DragAndDropPhotoCard from '~/components/DragAndDropPhotoCard.vue'

    export default {
        layout: 'profile',
        data() {
            return {
                tab: null,
                user: this.$route.params.user,
                publications: [],
                modalComments: false,
                profile: {
                    profile_picture: {}
                },
                profile_picture: {
                    file: {},
                    url: ""
                },
                items: {
                    info: {
                        extra: "Extra extraaa"
                    }
                },
                publication: {
                    user: {},
                    imagen_principal: {}
                },
                comentario: {},
                seguidores: 0,
                seguidos: 0,
                seguirODejarSeguir: "-",
                idSeguidor: 0
            }
        },
        created() {
            this.getPosts()
            this.getUser()
            this.getSeguidos()
            this.getSeguidores()
        },
        computed: {
            initialImage() {
                return (this.profile_picture.url == '') ? this.$axios.defaults.baseURL + this.profile.profile_picture.url : this.profile_picture.url
            }
        },
        methods: {
            async followUnfollow() {
                if (this.seguirODejarSeguir == "Unfollow") {
                    await this.$axios.delete('/seguidor-seguidos/' + this.idSeguidor)
                    this.seguidores--
                        this.seguirODejarSeguir = "Follow"
                } else {
                    var body = {
                        seguidor: this.$auth.user.id,
                        seguido: this.user
                    }
                    await this.$axios.post('/seguidor-seguidos/', body)
                    this.seguidores++
                        this.seguirODejarSeguir = "Unfollow"

                }


            },
            async getSeguidos() {
                //Obtener a las personas que sigo
                var response = await this.$axios.get(`/seguidor-seguidos/?seguidor=${this.user}`)
                this.seguidos = response.data.length

            },
            async getSeguidores() {
                var response = await this.$axios.get(`/seguidor-seguidos/?seguido=${this.user}`)
                this.seguidores = response.data.length
                var found = response.data.find(
                    element => {
                        console.log(element)
                        if (element.seguidor.id == this.$auth.user.id) {

                            this.idSeguidor = element.id
                            return true
                        }
                    }
                )
                if (found) {
                    this.seguirODejarSeguir = "Unfollow"
                } else {
                    this.seguirODejarSeguir = "Follow"
                }

            },
            async getUser() {

                await this.$axios.get(`/users/${this.user}/`)
                    .then((data) => {
                        this.profile = data.data

                    })
            },
            async getPublication(publication) {
                this.modalComments = true
                this.publication = publication
                await this.$axios.get('/comentarios/?publicacion=' + publication.id, this.comentario)
                    .then((data) => {
                        this.publication.comentarios = data.data
                        this.$forceUpdate()
                    })
            },
            async getPosts() {
                await this.$axios.get(`/publicaciones/?user=${this.user}`)
                    .then((data) => {
                        this.publications = data.data
                    })
            },
            addComment() {
                this.comentario.publicacion = this.publication.id
                this.comentario.user = this.$auth.user.id
                this.$axios.post('/comentarios/', this.comentario)
                    .then((data) => {
                        this.publication.comentarios.push(data.data)
                        this.$forceUpdate()
                        this.comentario = {}
                    })
            },
        },
        components: {
            PostCard,
            DragAndDropPhotoCard
        }
    }
</script>