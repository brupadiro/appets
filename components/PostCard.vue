<template>
  <v-card class="mb-3">
    <v-card-title primary-title>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3" v-if="publication.user.profile_picture!=null">
            <v-img class="elevation-6" @click="goToProfile" :src="$axios.defaults.baseURL + publication.user.profile_picture.url" aspect-ratio="2"
            round ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{publication.user.username}}</v-list-item-title>
          <v-list-item-title class="font-weight-light">{{formatDate(publication.created_at)}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-title>
    <v-card-text>
      {{publication.contenido}}
    </v-card-text>
    <v-img aspect-ratio="2" contain v-if="publication.imagen_principal!=null"
      :src="$axios.defaults.baseURL + publication.imagen_principal.url">
    </v-img>
    <v-card-actions class="d-flex justify-space-between">
      <v-btn text small class="font-weight-regular" @click="likeOrDislike">
        {{likes}}
        <v-icon dark left v-if="!like">mdi-thumb-up-outline</v-icon>
        <v-icon dark left v-else >mdi-thumb-up</v-icon>
      </v-btn>
      <v-btn text small class="font-weight-regular" @click="$emit('showpublication',publication)">
          {{publication.comentarios_cant}}
        <v-icon dark left>mdi-comment-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    import moment from 'moment';
    export default {
        props: {
            publication: Object
        },
        data() {
            return {
                likes: this.publication.likes.length,
                like: this.publication.likes.filter(element => element.user_id == this.$auth.user.id).length > 0,
                // comentarios_cantidad: this.publicacion.comentarios.length
            }
        },
        mounted() {
            this.$root.$on("changeLike", (newLike) => {
                if (newLike.publication == this.publication.id) {
                    this.like = newLike.like
                    this.likeOrDislike()
                }
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
                    console.log(newValue)
                    this.$set(this.publication.likes, this.publication.likes.length, {
                        like_id: newValue,
                        user_id: this.$auth.user.id,
                        username: this.$auth.user.username
                    })
                }
            }
        },
        methods: {
            goToProfile() {
                if (this.publication.user.id == this.$auth.user.id) {
                    this.$router.push('/profile/')
                } else {
                    this.$router.push('/profile/' + this.publication.user.id)
                }
            },
            formatDate(date) {
                return moment(date).format('DD/MM/YYYY');
            },
            likeOrDislike() {
                if (this.like) {
                    this.$axios.delete('/likes/' + this.likeId.likeId).then(response => {
                        this.like = false
                        let index = this.likeId.index
                        this.$delete(this.publication.likes, index)
                        this.likes--
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
            }
        }
    }
</script>