<template>
    <v-container fluid >
        <v-card class=" transparent rounded-lg elevation-1">
          <v-list-item>
            <v-list-item-icon class="mr-0">
                <v-list-item-avatar size="30" color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      :src="$axios.defaults.baseURL + notificacion.de.profile_picture.url"
                    ></v-img>
                  </v-list-item-avatar>
              </v-list-item-icon>
            <v-list-item-content two-line>
              <v-list-item-title>{{notificacion.mensaje}} </v-list-item-title>
              <v-list-item-subtitle><v-btn color="orange" class="white--text" rounded x-small>Ver perfil</v-btn></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <span class="caption ml-1">{{formatDate(notificacion.created_at)}}</span>
    </v-container>
</template>

<script>
    import moment from 'moment';

    export default {
        name: 'NotificationInfo',
        props: {
            notificacion: {
                type: Object,
                default: () => ({
                    de: {
                        picture_profile: {
                            url: ""
                        }
                    },
                    mensaje: "",
                    tipo: "",
                })
            }
        },
        methods: {
            formatDate(date) {
                return moment(date).format('LT');
            }
        }
    }
</script>