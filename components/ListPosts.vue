<template>
    <div>

        <div class="d-flex flex-column justify-center align-center text-center" v-if="publications.length == 0">
            <h2 class="blue-grey--text lighten-5 mt-10">No se encontraron publicaciones</h2>
        </div>
        <post-card v-for="(publication,index) in publications" :key="index" :publication="publication" @showpublication="getPublication($event)"></post-card>
        <v-btn color="success" @click="getMorePulications" v-show="theres_more_publications" >more posts</v-btn>
        <post-details-dialog :showPostDetailsDialog="showPostDetailsDialog" :publication="publication" @closePostDetailsDialog="closePostDetailsDialog" @changeLike="changeLike"></post-details-dialog>

    </div>
</template>

<script>
    import PostCard from "./PostCard.vue"

    export default {
        props: {
            user: {
                type: Number,
                default: 0,
            }
        },
        data() {
            return {
                publications: [],
                publication: {
                    user: {},
                    imagen_principal: {},
                    likes: [],
                },
                comentario: {},
                start_publicaciones: 0,
                limit_publicaciones: 1,
                theres_more_publications: true,
                showPostDetailsDialog: false,
            }
        },
        created() {
            this.getPosts()
        },
        mounted() {
            this.$root.$on('newPublication', (newPublication) => {
                if (this.publications.length > 0) {
                    this.publications.unshift(newPublication)
                } else {
                    this.publications.push(newPublication)
                }
            })
            this.$root.$on('resetPosts', this.getPosts)
        },
        methods: {
            async getPosts() {
                var url = (this.user != 0) ? `/publicaciones/?user=${this.user}&_start=${this.start_publicaciones}&_limit=${this.limit_publicaciones}` : `/publicaciones/?_start=${this.start_publicaciones}&_limit=${this.limit_publicaciones}`
                await this.$axios.get(url)
                    .then((data) => {
                        this.publications = data.data
                    })
            },
            getMorePulications() {

                //Chequear que si la "nuevaPublicacion" esta en el nuevo array, hacerle pop. De lo contrario se mostrara dos veces 
                this.start_publicaciones += this.limit_publicaciones
                var url = (this.user != 0) ? `/publicaciones/?user=${this.user}&_start=${this.start_publicaciones}&_limit=${this.limit_publicaciones}` : `/publicaciones/?_start=${this.start_publicaciones}&_limit=${this.limit_publicaciones}`
                this.$axios.get(url)
                    .then((data) => {

                        this.publications = this.publications.concat(data.data)
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