<template>
  <v-row>
    <v-col class="col-12 d-flex flex-column justify-center align-center text-center">
      <v-progress-circular indeterminate color="primary" v-show="loading" class="mt-10">
      </v-progress-circular>
    </v-col>
    <v-col class="col-12 col-md-12 text-center" v-if="publications.length == 0 && !loading">
      <h2 class="blue-grey--text text-center lighten-5 mt-10">No se encontraron publicaciones</h2>
    </v-col>
    <v-col class="col-12" v-for="(publication,index) in publications" :key="index">
      <post-card :publication="publication" @showpublication="getPublication($event)"></post-card>
    </v-col>
    <post-details-dialog :showPostDetailsDialog="showPostDetailsDialog" :publication="publication"
      @closePostDetailsDialog="closePostDetailsDialog" @changeLike="changeLike"></post-details-dialog>
  </v-row>
</template>

<script>
  import PostCard from "./PostCard.vue"

  export default {
    props: {
      value: Array
    },
    data() {
      return {
        publications: [],
        newPublications: [],
        publication: {
          user: {},
          imagen_principal: {},
          likes: [],
        },
        comentario: {},
        theres_more_publications: true,
        showPostDetailsDialog: false,
        loading: false,
      }
    },
    created() {},
    mounted() {
      this.$root.$on('newPublication', (newPublication) => {
        if (this.publications.length > 0) {
          this.publications.unshift(newPublication)
        } else {
          this.publications.push(newPublication)
        }

        this.newPublications.push(newPublication)
      })
    },
    methods: {
      async getPublication(publication) {
        this.publication = publication
        this.showPostDetailsDialog = true
      },
      closePostDetailsDialog() {
        this.showPostDetailsDialog = false
      },
      async changeLike(isNewLike) {
        if (isNewLike) {

          /**
           * Agregar nuevo like a la DB
           */

          let body = {
            user: this.$auth.user.id,
            publicacion: this.publication.id
          }

          var response = await this.$axios.post('/likes/', body).catch((error) => {
            console.error(error)
            return;
          })
          var likeData = response.data
          // Agregar este nuevo like a la lista de likes de la publicacion y de las pulicaciones
          this.$set(this.publication.likes, this.publication.likes.length, {
            like_id: likeData.id,
            user_id: this.$auth.user.id,
            username: this.$auth.user.username
          })

        } else {

          /**
           * Borrar el like de la DB
           * Se necesita el id del objeto like
           * */

          var likeObject = this.publication.likes.find(like => like.user_id == this.$auth.user.id)

          var response = await this.$axios.delete('/likes/' + likeObject.like_id).catch((error) => {
            console.error(error)
            return;
          })

          var likeIndex = this.publication.likes.findIndex(like => like.user_id == this.$auth.user.id)

          //Borar el like de la publicacion que se esta mostrando
          this.publication.likes.splice(likeIndex, 1)

        }

        //Notificar al post (PostCard) que la publicacion tuvo cambios
        this.$root.$emit('changeLikePost', this.publication.id)


      }
    },
    components: {
      PostCard
    },
    watch: {
      value(val) {
        this.publications = val
      }
    }
  }

</script>
