<template>
    <v-container class="d-inline-flex">
        <v-card class="pt-2 pb-2 text-center">
            <div>
                <v-avatar>
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    >
                  </v-avatar>
            </div>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title >{{name}}</v-list-item-title>
                  <v-list-item-subtitle v-if="itsAccount">Popular Account</v-list-item-subtitle>
                  <v-list-item-subtitle v-else>Popular Hashtag</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-row no-gutters>
                <v-col class="col-4 col-sm-4" v-for="i in 3">
                    <v-img
                  :src="`https://picsum.photos/500/300?image=${i * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${i * 5 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2 ma-1"
                ></v-img>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" text>Follow</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: 'ResumeAccountHashtag',
        props: ['name', 'itsAccount']
    }
</script>