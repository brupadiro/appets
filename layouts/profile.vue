<template>
  <v-app>
    <drawer title="Perfil"></drawer>

    <v-content class="">
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
    import createPost from "~/components/createPost.vue"
    import Drawer from "~/components/drawer.vue"

    export default {
        middleware: "auth",
        components: {
            createPost,
            Drawer
        },
        data() {
            return {
                addPublication: false,
                drawer: false,
                group: null
            }
        },
        watch: {
            group(val) {
                this.drawer = false
            },
        },
        methods: {}
    }
</script>