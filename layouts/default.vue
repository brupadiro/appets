<template>
    <v-app>
        <drawer :title="title"></drawer>
      <v-content class="white">
        <nuxt />
      </v-content>
      <create-post v-model="addPublication"></create-post>
    </v-app>
  </template>

<script>
    import createPost from "~/components/createPost.vue"
    import Drawer from "~/components/Drawer.vue"

    export default {
        middleware: "auth",
        components: {
            createPost,
            Drawer,
        },
        data() {
            return {
                addPublication: false,
                title: "Home"
            }
        },
        created() {
            var route = this.$route.path
            switch (route) {
                case '/configuraciones':
                    this.title = "Configuraciones"
                    break
                case '/sugeridos':
                    this.title = "Amigos sugeridos"
                    break
                case '/notificaciones':
                    this.title = "Notificaciones"
                    break
                default:
                    this.title = "Home"
            }
        },
    }
</script>