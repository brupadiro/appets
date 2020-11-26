<template>
    <v-dialog scrollable fullscreen persistent v-model="showPostDetailsDialog">
        <v-card outlined class="elevation-0 fill-width">

          <!-- <v-card-title class="pa-0">
            <v-btn icon @click="$emit('closePostDetailsDialog')">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-card-title> -->
          <drawer title="Detalle del video"></drawer>
          <v-card-text class="pa-0 " style="height: 100%;overflow-y:auto">
            <div class="elevation-2">
              <v-img aspect-ratio="2" class="white" contain v-if="publication.imagen_principal!=null"
              :src="$axios.defaults.baseURL + publication.imagen_principal.url">
              </v-img>
              <div class="d-flex justify-space-between align-center white pa-4  ">
                <v-list-item class="pa-0">
                  <v-list-item-avatar v-if="publication.imagen_principal!=null">
                    <v-img class="elevation-6" contain :src="$axios.defaults.baseURL + imgUserPublicacion"
                      aspect-ratio="2" round>
                    </v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{publication.user.username}}</v-list-item-title>
                    <v-list-item-title class="font-weight-light">76k visitas</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
    
                <!-- <span> {{publication.contenido}} </span> -->
                <v-btn color="red" outlined rounded>Suscribete</v-btn>
              </div>
            </div>
            
            <!-- <v-row no-gutters class="d-flex justify-space-between pa-3">
              <v-btn text small class="font-weight-regular" @click="changeLike">
                {{publication.likes.length}}
                <v-icon class="pl-4" dark left v-if="!like">mdi-thumb-up-outline</v-icon>
                <v-icon class="pl-4" dark left v-else >mdi-thumb-up</v-icon>
              </v-btn>
            
              <v-btn text small class="font-weight-regular">
                <v-icon dark left>mdi-share-outline</v-icon>
              </v-btn>
            </v-row> -->

            <div class="pa-4">
              <h1 class="font-weight-thin">Comentarios</h1>
            </div>
            <v-list three-line>

                <div class="text-center mt-2 " v-show="loadingComments">
                    <v-progress-circular
                    :width="3"
                    color="green"
                    indeterminate
                  ></v-progress-circular>
                </div>
                <template v-for="(comentario, index) in comentarios">
  
                <v-list-item :key="index" color="black">
                  <v-list-item-avatar>
                    <v-img :src="$axios.defaults.baseURL + comentario.user.profile_picture.url"></v-img>
                  </v-list-item-avatar>
  
                  <v-list-item-content three-line>
                    <v-list-item-title v-html="comentario.user.username"></v-list-item-title>
                    <v-list-item-subtitle v-html="comentario.contenido"></v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <span class="mr-2">324 Me gusta</span>
                      <span>432 Compartido</span>
                    </v-list-item-subtitle>

                  </v-list-item-content>
                </v-list-item>
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
</template>

<script>
    import moment from 'moment'
    import Drawer from './Drawer.vue'
    export default {
        props: {
            showPostDetailsDialog: false,
            publication: {
                user: {},
                imagen_principal: {},
                comentarios: [],
                likes: [],
            },
        },
        data() {
            return {
                comentario: {},
                start_comentarios: 0,
                limit_comentarios: 2,
                comentarios: [],
                loadingComments: true,
                theres_more_comments: true,
                like: false,

            }
        },
        watch: {
            showPostDetailsDialog(newVal, oldVal) {
                this.loadingComments = true
                this.theres_more_comments = true
                this.comentarios = []
                this.start_comentarios = 0
                this.like = this.publication.likes.filter(element => element.user_id == this.$auth.user.id).length > 0
                this.$axios.get(`/comentarios/?publicacion=${this.publication.id}&_start=${this.start_comentarios}&_limit=${this.limit_comentarios}`, this.comentario)
                    .then((data) => {
                        this.comentarios = data.data
                        this.loadingComments = false
                        if (data.data.length < this.limit_comentarios) {
                            this.theres_more_comments = false
                        }
                    })
            }
        },
        computed: {
            imgUserPublicacion() {
                return (this.publication.user.profile_picture == undefined) ? '' : this.publication.user.profile_picture.url
            }
        },
        methods: {
            getMoreComments() {
                this.start_comentarios += this.limit_comentarios
                this.$axios.get(`/comentarios/?publicacion=${this.publication.id}&_start=${this.start_comentarios}&_limit=${this.limit_comentarios}`).then((data) => {
                    this.comentarios = this.comentarios.concat(data.data)
                    if (this.comentarios.length == this.publication.comentarios_cant) {
                        this.theres_more_comments = false
                    }
                    this.$forceUpdate()
                })
            },
            addComment() {
                this.comentario.publicacion = this.publication.id
                this.comentario.user = this.$auth.user.id
                this.$axios.post('/comentarios/', this.comentario)
                    .then((data) => {
                        this.comentarios.push(data.data)
                        this.$forceUpdate()
                        this.comentario = {}
                    })
            },
            formatDate(date) {
                return moment(date).format('DD/MM/YYYY');
            },
            changeLike() {
                var cambiarDeLikeADislike = this.like //Si like era verdadero, entonces ahora sera falso

                if (cambiarDeLikeADislike) {
                    //Retirar el like del arreglo de likes de la publicacion brinada por ListPost
                    this.like = false
                    this.$emit('changeLike', false)
                } else {
                    //Agregar el like del arreglo de likes de la publicacion brinada por ListPost
                    this.like = true
                    this.$emit('changeLike', true)
                }

            }

        },
        components: {
            Drawer
        }

    }
</script>