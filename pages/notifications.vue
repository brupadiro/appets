<template>
    <v-container class="pa-0">
        <notification-info v-for="i in 3" :key="i" :visto="i % 3 != 0 ? true : false"></notification-info>
    </v-container>
</template>

<script>
    import NotificationInfo from "../components/NotificationInfo.vue"

    export default {
        name: 'notifications',
        layout: 'notifications',
        components: {
            NotificationInfo
        }
    }
</script>