<template>
    <v-container class="pa-0" fluid>
        <p class="font-weight-bold mt-2 ml-2">Popular Peoples to Follow</p>
        <v-slide-group >
            <v-slide-item v-for="i in 3" :key="i">
                <resume-account-hashtag  :name="'Jhon'" :itsAccount="true"></resume-account-hashtag>
            </v-slide-item>
        </v-slide-group>
        <v-divider class="pt-2 pb-2 grey lighten-5"></v-divider>
        <p class="font-weight-bold mt-2 ml-2">Popular Hashtags to Follow</p>
        <v-slide-group >
            <v-slide-item v-for="i in 3" :key="i">
                <resume-account-hashtag  :name="'#fish'" :itsAccount="false"></resume-account-hashtag>
            </v-slide-item>
        </v-slide-group>
        <v-divider class="pt-2 pb-2 grey lighten-5"></v-divider>
        <template v-for="i in 2">
            <post-card></post-card>
            <v-divider class="pt-2 pb-2 grey lighten-5"></v-divider>

        </template>
</v-container>
</template>

<script>
    import ResumeAccountHashtag from "../components/ResumeAccountHashtag.vue"
    import PostCard from "../components/PostCard.vue"

    export default {
        layout: 'discover',
        components: {
            ResumeAccountHashtag,
            PostCard
        }
    }
</script>