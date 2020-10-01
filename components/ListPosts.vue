<template>
    <div>
        <post-card v-for="(publication,index) in publications" :key="index" :publication="publication" @showpublication="getPublication($event)"></post-card>
        <v-btn color="success" @click="getMorePulications" v-show="theres_more_publications" >more posts</v-btn>
        <post-details-dialog :showPostDetailsDialog="showPostDetailsDialog" :publication="publication" @closePostDetailsDialog="closePostDetailsDialog"></post-details-dialog>

    </div>
</template>

<script>
    import PostCard from "./PostCard.vue"

    export default {
        props: ['user'],
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
                showPostDetailsDialog: false
            }
        },
        created() {
            this.getPosts()
        },
        methods: {
            async getPosts() {
                await this.$axios.get(`/publicaciones/?user=${this.user}&_start=${this.start_publicaciones}&_limit=${this.limit_publicaciones}`)
                    .then((data) => {
                        console.log(data.data)
                        this.publications = data.data
                    })
            },
            getMorePulications() {
                this.start_publicaciones += this.limit_publicaciones
                this.$axios.get(`/publicaciones/?user=${this.$auth.user.id}&_start=${this.start_publicaciones}&_limit=${this.limit_publicaciones}`)
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
            likeOrDislike() {

            }
        },
        components: {
            PostCard
        }
    }
</script>