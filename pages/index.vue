<template>
  <v-container fluid>
    <list-posts showOptionsHomeSeguidores ></list-posts>
</v-container>
</template>

<script>
    export default {
        layout: 'test',
        data() {
            return {
                publications: [],
                followersPublications: false,
                start_publicaciones: 0,
                limit_publicaciones: 12,
            }
        },
        created() {
            this.getPosts()
        },
        methods: {
            async getPosts() {
                var url = (this.followersPublications) ? `/publicaciones/findPublicaciones/${this.$auth.user.id}/` :
                    `/publicaciones/?_start=${this.start_publicaciones}&_limit=${this.limit_publicaciones}`
                await this.$axios.get(url)
                    .then((data) => {
                        this.publications = data.data
                        this.loading = false
                    })
            },
            getMorePublications() {

                //Chequear que si la "nuevaPublicacion" esta en el nuevo array, hacerle pop. De lo contrario se mostrara dos veces 
                this.start_publicaciones += this.limit_publicaciones
                var url = (this.user != 0) ?
                    `/publicaciones/?user=${this.user}&_start=${this.start_publicaciones}&_limit=${this.limit_publicaciones}` :
                    `/publicaciones/?_start=${this.start_publicaciones}&_limit=${this.limit_publicaciones}`
                this.$axios.get(url)
                    .then((data) => {

                        var publicacionesSinLasPublicacionesNuevas = data.data.filter(publication => !this.newPublications.some(
                            newPublication => newPublication.id == publication.id))
                        this.publications = this.publications.concat(publicacionesSinLasPublicacionesNuevas)
                        if (data.data.length == 0) {
                            this.theres_more_publications = false
                        }
                    })
            },
        },
        watch: {
            followersPublications(val) {
                console.log(val)
                this.getPosts()
            }
        },
    }
</script>