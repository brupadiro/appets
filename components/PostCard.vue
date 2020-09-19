<template>
  <v-card class="mb-3">
    <v-card-title primary-title>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3" v-if="publication.user.profile_picture!=null">
            <v-img class="elevation-6" @click="goToProfile" :src="$axios.defaults.baseURL + publication.user.profile_picture.url" aspect-ratio="2"
            round ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{publication.user.username}}</v-list-item-title>
          <v-list-item-title class="font-weight-light">{{formatDate(publication.created_at)}}</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <v-icon right>mdi-dots-vertical</v-icon>
        </v-row>
      </v-list-item>
    </v-card-title>
    <v-card-text>
      {{publication.contenido}}
    </v-card-text>
    <v-img aspect-ratio="2" contain v-if="publication.imagen_principal!=null"
      :src="$axios.defaults.baseURL + publication.imagen_principal.url">
    </v-img>
    <v-card-actions class="d-flex justify-space-between">
      <v-btn text small class="font-weight-regular">
        <v-icon dark left>mdi-thumb-up-outline</v-icon>
      </v-btn>
      <v-btn text small class="font-weight-regular" @click="$emit('showpublication',publication)">
        <v-icon dark left>mdi-comment-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    import moment from 'moment';
    export default {
        props: {
            publication: Object,
        },
        methods: {
            goToProfile() {
                if (this.publication.user.id == this.$auth.user.id) {
                    this.$router.push('/profile/')
                } else {
                    this.$router.push('/profile/' + this.publication.user.id)
                }
            },
            formatDate(date) {
                return moment(date).format('DD/MM/YYYY');
            }
        }
    }
</script>