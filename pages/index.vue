<template>
  <v-container fluid>

    <!-- Todos los posts -->

    <v-row>
      <v-col class="col-12 col-sm-12" v-for="(pub,index) in publicaciones" :key="pub.pk">
        <postCard :publication="pub" :key="index" @showpublication="getPublication($event, index)" class="mb-2"></postCard>
      </v-col>
      <v-btn color="success" @click="getMorePulications" v-show="theres_more_publications" >more posts</v-btn>
    </v-row>

    <!-- Post especifico -->
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
                <v-list-item-title class="font-weight-light">{{publication.created_at.split('T')[0]}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <span> {{publication.contenido}}</span>
          </div>
          <v-img aspect-ratio="2" class="white" contain v-if="publication.imagen_principal!=null"
            :src="$axios.defaults.baseURL + publication.imagen_principal.url">
          </v-img>
          <v-divider color="#eceff1" height="1"></v-divider>
        <v-row class="d-flex justify-space-between pa-3">
            <v-btn text small class="font-weight-regular" @click="likeOrDislike">
              {{publication.likes.length}}
              <v-icon class="pl-4" dark left v-if="!like">mdi-thumb-up-outline</v-icon>
              <v-icon class="pl-4" dark left v-else >mdi-thumb-up</v-icon>
              
            </v-btn>
            <v-btn text small class="font-weight-regular">
              <v-icon dark left>mdi-share-outline</v-icon>
            </v-btn>
          </v-row>
          <v-list three-line color="blue-grey lighten-5 pt-0">
            <template v-for="(comentario, index) in publication.comentarios">

              <v-list-item :key="index" color="black">
                <v-list-item-avatar>
                  <v-img :src="$axios.defaults.baseURL + comentario.user.profile_picture.url"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="comentario.user.username"></v-list-item-title>
                  <v-list-item-subtitle v-html="comentario.contenido"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </template>
<div class="text-center pa-5" v-show="theres_more_comments">
    <v-btn color="primary" fab outlined @click="getMoreComments">
        <v-icon>mdi-plus</v-icon>
    </v-btn>
</div>
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
    import moment from 'moment';

    export default {
        components: {
            postCard
        },
        data() {
            return {
                modalComments: false,
                publicaciones: [],
                limit_publicaciones: 2,
                start_publicaciones: 0,
                theres_more_publications: true,

                //Estos datos son para el dialog - modularizarlos mejor
                indexLike: null,
                publication: {
                    user: {},
                    imagen_principal: {},
                    likes: [],
                    created_at: ""
                },
                comentario: {},
                theres_more_comments: true,
                like: false,
                // Paginacion de comentarios
                limit_comentarios: 1,
                start_comentarios: 0
            }
        },
        created() {
            this.getPosts()
        },
        mounted() {
            this.$root.$on('newPublication', (newPublication) => {
                this.publicaciones.unshift(newPublication)
            })
        },
        computed: {
            likeId: {
                get() {
                    var details = this.publication.likes.find(element => element.user_id == this.$auth.user.id)
                    return (details == null) ? 0 : {
                        likeId: details.like_id,
                        index: this.publication.likes.findIndex(element => element.user_id == this.$auth.user.id)
                    }
                },
                set(newValue) {
                    this.$set(this.publication.likes, this.publication.likes.length, {
                        like_id: newValue,
                        user_id: this.$auth.user.id,
                        username: this.$auth.user.username
                    })
                }
            }
        },
        methods: {
            getPosts() {
                this.$axios.get(`/publicaciones/?_start=${this.start_publicaciones}&_limit=${this.limit_publicaciones}`)
                    .then((data) => {
                        this.publicaciones = data.data
                    })
            },
            getPublication(publication, index) {
                this.likeIndex = index
                this.modalComments = true
                this.publication = publication
                this.$axios.get(`/comentarios/?publicacion=${this.publication.id}&_start=${this.start_comentarios}&_limit=${this.limit_comentarios}`, this.comentario)
                    .then((data) => {
                        this.publication.comentarios = data.data
                        if (data.data.length < this.limit_comentarios) {
                            this.theres_more_comments = false
                        }
                        this.$forceUpdate()
                    })

                this.like = this.publication.likes.filter(element => element.user_id == this.$auth.user.id).length > 0
            },
            getMoreComments() {
                this.start_comentarios += this.limit_comentarios
                this.$axios.get(`/comentarios/?publicacion=${this.publication.id}&_start=${this.start_comentarios}&_limit=${this.limit_comentarios}`).then((data) => {
                    this.publication.comentarios = this.publication.comentarios.concat(data.data)
                    if (this.publication.comentarios.length == this.publication.comentarios_cant) {
                        this.theres_more_comments = false
                    }
                    this.$forceUpdate()
                })
            },
            getMorePulications() {
                this.start_publicaciones += this.limit_publicaciones
                this.$axios.get(`/publicaciones/?_start=${this.start_publicaciones}&_limit=${this.limit_publicaciones}`)
                    .then((data) => {

                        this.publicaciones = this.publicaciones.concat(data.data)
                        if (data.data.length == 0) {
                            this.theres_more_publications = false
                        }
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
            formatDate(date) {
                return moment(date).format('DD/MM/YYYY');
            },
            likeOrDislike(index) {
                if (this.like) {
                    this.$axios.delete('/likes/' + this.likeId.likeId).then(response => {
                        this.like = false
                        let index = this.likeId.index
                        this.$delete(this.publication.likes, index)
                        this.likes--
                            let likeIndex = this.publicaciones[this.likeIndex].likes.map((like, index) => {
                                if (like.user_id == this.$auth.user.id) {
                                    return index
                                }
                            })
                        this.$delete(this.publicaciones[this.likeIndex].likes, likeIndex)
                    })
                } else {
                    let body = {
                        user: this.$auth.user.id,
                        publicacion: this.publication.id
                    }
                    this.$axios.post('/likes/', body).then(response => {
                        this.likeId = response.data.id
                        this.like = true
                        this.likes++

                    })
                }
                this.$root.$emit("changeLike", {
                    like: this.like,
                    publication: this.publication.id
                })

            }

        }
    }
</script>