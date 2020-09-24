<template>
    <v-app>
      <v-content class="blue-grey lighten-5">
        <nuxt />
      </v-content>
      <bottom-navigation-bar></bottom-navigation-bar>
      <create-post v-model="addPublication"></create-post>
    </v-app>
  </template>

<script>
    import BottomNavigationBar from "~/components/BottomNavigationBar.vue"
    import createPost from "~/components/createPost.vue"

    export default {
        middleware: "auth",
        components: {
            createPost,
            BottomNavigationBar
        },
        data() {
            return {
                addPublication: false,
                search: ''
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .app-bar-productos {
        position: relative;
    }
</style>