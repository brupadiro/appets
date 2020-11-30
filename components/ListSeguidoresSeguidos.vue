<template>
    <div>
        <v-dialog
            v-model="showListSeguidoresSeguidos"
            scrollable fullscreen 
            persistent
        >
        <v-card outlined class="elevation-0">

            <!-- <v-card-title class="text-center">
                <v-btn icon @click="$emit('closeListSeguidoresSeguidos')">
                    <v-icon>mdi-arrow-left</v-icon>
                  </v-btn>
                <h2 v-if="show_seguidores" >Seguidores</h2>
                <h2 v-else >Seguidos</h2>
            </v-card-title> -->
            <!-- <drawer :title="(show_seguidores) ? 'Seguidores':'Siguiendo'" :app="false"></drawer> -->
            <div>
                <v-app-bar
                color="orange"
                >

                    <v-app-bar-nav-icon 
                    color="white" 
                    @click.stop="$emit('closeListSeguidoresSeguidos')">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-app-bar-nav-icon>
                    <v-spacer></v-spacer>
                    <v-toolbar-title class="white--text" >Detalle de publicacion</v-toolbar-title>
                    <v-spacer></v-spacer>

                </v-app-bar>
            </div>
            <v-card-text>
                <v-row>
                    <template v-for="(user, i) in users" >
                        <v-col class="col-6" :key="i">
                            <div class="white--text text-center rounded-lg blue accent-4">
                                <v-avatar class="mt-4 mb-4" @click="$router.push('/profile/' + user.id_user )">
                                    <img
                                        :src="$axios.defaults.baseURL + user.img"
                                    >
                                  </v-avatar>
                                  <p class="mb-2">{{user.username}}</p>
                                  <span>Maldonado</span>
                                  <v-btn v-show="!show_seguidores" class="mt-4 mb-4 ml-1 mr-1"  color="white" @click="followUnfollow(user.id_seguidor_seguido)" outlined rounded x-small>Dejar de seguir</v-btn>
                            </div>
                        </v-col>
                        
                    </template>
</v-row>
</v-card-text>
</v-card>

</v-dialog>
</div>
</template>

<script>
    import Drawer from './Drawer.vue'

    export default {
        props: {
            showListSeguidoresSeguidos: false,
            show_seguidores: {
                type: Boolean,
                default: false
            },
            seguidores: {
                type: Array,
                default: []
            },
            seguidos: {
                type: Array,
                default: []
            }
        },
        components: {
            Drawer
        },
        computed: {
            users() {
                var users = (this.show_seguidores) ? this.seguidores.map(user => {
                    return {
                        username: user.seguidor.username,
                        img: user.seguidor.profile_picture.url,
                        id_user: user.seguidor.id,
                        id_seguidor_seguido: user.id //es el id de la relacion

                    }
                }) : this.seguidos.map(user => {
                    return {
                        username: user.seguido.username,
                        img: user.seguido.profile_picture.url,
                        id_user: user.seguido.id,
                        id_seguidor_seguido: user.id //es el id de la relacion
                    }
                })
                return users
            }
        },
        methods: {
            async unfollow(idSeguidorSeguido) {
                await this.$axios.delete('/seguidor-seguidos/' + this.idSeguidorSeguido)
                this.$emit("unfollow", idSeguidorSeguido)

            },
        }

    }
</script>