<template>
  <v-container fluid>
    <list-posts></list-posts>
</v-container>
</template>

<script>
    import ListPosts from '../components/ListPosts.vue'
    export default {
        components: {
            ListPosts
        }
    }
</script>