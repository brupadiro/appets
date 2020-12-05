<template>
    <v-container class="pa-0">
        <notification-info v-for="i in notificaciones" :notificacion="i" :key="i.id" ></notification-info>
    </v-container>
</template>

<script>
    import NotificationInfo from "../components/NotificationInfo.vue"

    export default {
        name: 'notificaciones',
        components: {
            NotificationInfo
        },
        data() {
            return {
                notificaciones: []
            }
        },
        async created() {
            var response = await this.$axios("/notificaciones?para=" + this.$auth.user.id)
            this.notificaciones = response.data
        }
    }
</script>