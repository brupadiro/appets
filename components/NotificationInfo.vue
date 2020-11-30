<template>
    <v-container fluid >
        <v-card class=" transparent rounded-lg elevation-1">
          <v-list-item>
            <v-list-item-icon class="mr-0">
                <v-list-item-avatar size="30" color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                  </v-list-item-avatar>
              </v-list-item-icon>
            <v-list-item-content two-line>
              <v-list-item-title>Richi te esta siguiendo ahora. </v-list-item-title>
              <v-list-item-subtitle><v-btn color="orange" class="white--text" rounded x-small>Ver perfil</v-btn></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <span class="caption ml-1">03:47 pm</span>
    </v-container>
</template>

<script>
    export default {
        name: 'NotificationInfo',
    }
</script>