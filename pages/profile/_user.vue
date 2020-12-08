<template>
  <v-container class="pa-0">
    <div
    class="relative d-flex flex-column align-center"
    >
      <v-img
      :src="$axios.defaults.baseURL + profile.profile_picture.url"
      height="45vh"
      width="100vw"
      >
      </v-img>

      <div 
      class="pa-5 first-info-profile white--text mb-n10">
      <h2>{{profile.username}}</h2>
      <span>Maldonado</span>
        <div class="pt-5">
          <v-row  class="orange rounded-lg elevation-1">
            <v-col class="text-center ">
              <span>231</span>
              <br>
              <span>Me gusta</span>
            </v-col>
            <v-col class="text-center">
              <span>{{seguidores}}</span>
              <br>
              <span>Seguidores</span>
            </v-col>
            <v-col class="text-center">
              <span>{{seguidos}}</span>
              <br>
              <span>Seguidos</span>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
<!--     
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
          <list-posts :user="user"></list-posts>
        </v-tab-item>
      </v-tabs-items>
    </div>
     
     <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab v-for="(item,key) in items" :key="item.tab">
          {{ key }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
        </v-tab-item>
      </v-tabs-items>
    -->
    <list-posts class="mt-4" :user="user"></list-posts>

</v-container>
</template>

<script>
    import PostCard from "~/components/PostCard.vue"
    import DragAndDropPhotoCard from '~/components/DragAndDropPhotoCard.vue'
    import ListPosts from '~/components/ListPosts.vue'

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
            DragAndDropPhotoCard,
            ListPosts
        }
    }
</script>

<style scoped>
    .relative {
        position: relative !important;
    }
    
    .first-info-profile {
        position: absolute !important;
        bottom: 0px;
        z-index: 1;
    }
</style>