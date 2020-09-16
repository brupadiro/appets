<template>
  <v-card class="mb-2" outlined>
    <v-card-title>
      <v-row no-gutters>
        <v-col class="col-2">
          <v-avatar size="30px">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" round height="200px"></v-img>
          </v-avatar>
        </v-col>
        <v-col class="col-10">
          <b class="body-2 font-weight-bold">{{publication.user.username}}</b>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="pb-0">
      <p class="mb-0 black--text">{{publication.contenido}}</p>
    </v-card-text>
    <v-card-text v-if="publication.imagen_principal!=null">
      <v-img :src="$axios.defaults.baseURL + publication.imagen_principal.url" aspect-ratio="2" round></v-img>
    </v-card-text>
    <v-card-actions>
      <v-btn icon>
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('showpublication',publication)">
        <v-icon>mdi-comment-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
export default {
    props:{
        publication:Object
    }
}
</script>