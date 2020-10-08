<template>
    <div>
        <v-row v-if="showOptionsHomeSeguidores">
            <v-col class="col-6 col-md-6">
              <v-btn rounded @click.native="followersPublications=false" depressed :color="(followersPublications)?'':'primary'">GENERAL</v-btn>
            </v-col>
            <v-col class="col-6 col-md-6 text-right">
                <v-btn rounded @click.native="followersPublications=true" depressed :color="(!followersPublications)?'':'primary'">SEGUIDOS</v-btn>
            </v-col>
        </v-row>
        <div class="d-flex flex-column justify-center align-center text-center">
            <v-progress-circular
            indeterminate
            color="primary"
            v-show="loading"
            class="mt-10 mb-10"
            >
            </v-progress-circular>
        </div>
        <div class="d-flex flex-column justify-center align-center text-center" v-if="publications.length == 0 && !loading">
            <h2 class="blue-grey--text lighten-5 mt-10">No se encontraron publicaciones</h2>
        </div>
        <post-card v-for="(publication,index) in publications" :key="index" :publication="publication" @showpublication="getPublication($event)"></post-card>
        <post-details-dialog :showPostDetailsDialog="showPostDetailsDialog" :publication="publication" @closePostDetailsDialog="closePostDetailsDialog" @changeLike="changeLike"></post-details-dialog>
        <!-- <v-btn @click="getMorePulications">more posts</v-btn> -->
    </div>
</template>

<script>
    import PostCard from "./PostCard.vue"

    export default {
        props: {
            user: {
                type: Number,
                default: 0,
            },
            showOptionsHomeSeguidores: {
                type: Boolean,
                default: false,
            }

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
                start_publicaciones: 0,
                limit_publicaciones: 12,
                theres_more_publications: true,
                showPostDetailsDialog: false,
                loading: true,
                followersPublications: false,
            }
        },
        created() {
            this.getPosts()
        },
        watch: {
            followersPublications(newVal, oldVal) {
                this.loading = true
                this.start_publicaciones = 0
                theres_more_publications = true
                this.getPosts().then((reponse) => this.loading = false)
            }
        },
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
            async getPosts() {
                if (this.followersPublications) {
                    var url = `/publicaciones/findPublicaciones/${this.$auth.user.id}/`
                } else {
                    var url = (this.user != 0) ? `/publicaciones/?user=${this.user}&_start=${this.start_publicaciones}&_limit=${this.limit_publicaciones}` : `/publicaciones/?_start=${this.start_publicaciones}&_limit=${this.limit_publicaciones}`
                }

                await this.$axios.get(url)
                    .then((data) => {
                        this.publications = data.data
                        this.loading = false
                    })
            },
            getMorePulications() {

                //Chequear que si la "nuevaPublicacion" esta en el nuevo array, hacerle pop. De lo contrario se mostrara dos veces 
                this.start_publicaciones += this.limit_publicaciones
                var url = (this.user != 0) ? `/publicaciones/?user=${this.user}&_start=${this.start_publicaciones}&_limit=${this.limit_publicaciones}` : `/publicaciones/?_start=${this.start_publicaciones}&_limit=${this.limit_publicaciones}`
                this.$axios.get(url)
                    .then((data) => {

                        var publicacionesSinLasPublicacionesNuevas = data.data.filter(publication => !this.newPublications.some(newPublication => newPublication.id == publication.id))
                        this.publications = this.publications.concat(publicacionesSinLasPublicacionesNuevas)
                        if (data.data.length == 0) {
                            this.theres_more_publications = false
                        }
                    })
            },
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
        }
    }
</script>