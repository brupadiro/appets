<template>
    <v-container>
        <v-list>
            <v-list-item>
                <v-list-item-avatar>
                    <v-icon>mdi-home-variant-outline</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>
                    Visibilidad
                </v-list-item-title>
                <v-spacer></v-spacer>
                <v-switch
                inset
                v-model="visibilidad"
                ></v-switch>
            </v-list-item>
            <v-list-item>
                <v-list-item-avatar>
                    <v-icon>mdi-bell-outline</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>
                    Notificaciones
                </v-list-item-title>
                <v-spacer></v-spacer>
                <v-switch
                inset
                v-model="notificaciones"
                ></v-switch>
            </v-list-item>
            <v-list-item>
                <v-list-item-avatar>
                    <v-icon>mdi-volume-high</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>
                    Alertas
                </v-list-item-title>
                <v-spacer></v-spacer>
                <v-switch
                inset
                v-model="alertas"
                ></v-switch>
            </v-list-item>
        </v-list>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                visibilidad: true,
                notificaciones: true,
                alertas: false,
                nube: false,
                estadisticas: false,
                privacidad: true,
                seguridad: true,
                contraseña: false
            }
        }
    }
</script>