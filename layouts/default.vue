<template>
    <v-app>
        <drawer title="Home"></drawer>
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
            }
        },
    }
</script>