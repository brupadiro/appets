<template>
    <v-container fluid :class="[visto ? 'lime lighten-5' : 'transparent']">
        <v-list-item>
            <v-list-item-icon class="mr-0">
                <v-list-item-avatar color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                  </v-list-item-avatar>
              </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="headline"><b>Jenny</b> liked your <b>post</b>. </v-list-item-title>
              <v-list-item-subtitle>20 hours ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
    </v-container>
</template>

<script>
    export default {
        name: 'NotificationInfo',
        props: ['visto']
    }
</script>