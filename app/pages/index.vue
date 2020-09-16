<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col class="col-12 col-sm-12">
        <v-card v-for="i in 10" class="mb-2" outlined>
          <v-card-title>
            <v-row no-gutters>
              <v-col class="col-2">
                <v-avatar size="30px">
                  <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" round height="200px"></v-img>
                </v-avatar>
              </v-col>
              <v-col class="col-10">
                <b class="body-2 font-weight-bold">Nombre de usuario</b>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="pb-0">
            <p class="mb-0 black--text">Lorem ipsumm dolor sit amet, consectetur adipiscing elit</p>
          </v-card-text>
          <v-card-text>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" round height="200px"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn icon>
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="modalComments = !modalComments">
              <v-icon>mdi-comment-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog fullscreen v-model="modalComments">
      <v-card>
        <v-card-title class="pa-0">
          <v-btn icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-title>
          <v-row no-gutters>
            <v-col class="col-2">
              <v-avatar size="30px">
                <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" round height="200px"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="col-10">
              <b class="body-2 font-weight-bold">Nombre de usuario</b>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="pb-0">
          <p class="mb-0 black--text">Lorem ipsumm dolor sit amet, consectetur adipiscing elit</p>
        </v-card-text>
        <v-card-text>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" round height="200px"></v-img>
        </v-card-text>
        <v-card-actions>
          <v-btn icon>
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="modalComments = !modalComments">
            <v-icon>mdi-comment-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        modalComments: false,
      }
    },
  }

</script>
