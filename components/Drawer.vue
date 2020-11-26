<template>
    <div>
        <v-app-bar
        color="orange"
        class="white--text elevation-0"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            color="orange"
            app
            temporary
            >
      <v-list
        nav
        dense
        class="pl-3 pt-3"
      >
      
        <v-list-item-group
          v-model="group"
        >
            <v-list-item-avatar size="70">
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
            </v-list-item-avatar>
            <v-list-item class="mb-5" two-line>
    
              <v-list-item-content>
                <v-list-item-title class="white--text"><h2>Pascual</h2></v-list-item-title>
                <v-list-item-subtitle class="white--text">Maldonado</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
    
    
          <v-list-item to="/profile">
            <v-list-item-icon><v-icon color="white">mdi-account</v-icon></v-list-item-icon>
            <v-list-item-title class="white--text" >Mi perfil</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon><v-icon color="white">mdi-ticket</v-icon></v-list-item-icon>
            <v-list-item-title class="white--text" >Actividad</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon><v-icon color="white">mdi-bell</v-icon></v-list-item-icon>
            <v-list-item-title class="white--text" >Notificaciones</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon><v-icon color="white">mdi-account-multiple</v-icon></v-list-item-icon>
            <v-list-item-title class="white--text" >Amigos</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon><v-icon color="white">mdi-message-text</v-icon></v-list-item-icon>
            <v-list-item-title class="white--text" >Mensajes</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon><v-icon color="white">mdi-image-multiple</v-icon></v-list-item-icon>
            <v-list-item-title class="white--text" >Galeria</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon><v-icon color="white">mdi-cog</v-icon></v-list-item-icon>
            <v-list-item-title class="white--text" >Configuracion</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                drawer: false,
                group: null
            }
        },
        watch: {
            group(val) {
                this.drawer = false
            },
        },
    }
</script>