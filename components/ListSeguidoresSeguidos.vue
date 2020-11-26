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
            <drawer :title="(show_seguidores)?'Seguidores':'Seguidos'"></drawer>
            <v-card-text>
                    <v-list-item
                    v-for="(user, i) in users"
                    :key="i"
                    @click="$router.push('/profile/' + user.id_user )"
                    >
                    <v-list-item-avatar>
                            <v-img :src="$axios.defaults.baseURL + user.img"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{user.username}}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
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
        computed: {
            users() {
                var users = (this.show_seguidores) ? this.seguidores.map(user => {
                    return {
                        username: user.seguidor.username,
                        img: user.seguidor.profile_picture.url,
                        id_user: user.seguidor.id
                    }
                }) : this.seguidos.map(user => {
                    return {
                        username: user.seguido.username,
                        img: user.seguido.profile_picture.url,
                        id_user: user.seguido.id
                    }
                })
                return users
            }
        },
        components: {
            Drawer
        }
    }
</script>