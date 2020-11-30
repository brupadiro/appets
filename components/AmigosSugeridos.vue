<template>
    <v-container class="pa-0">
        <v-card flat>
            <v-row class="pa-4">
                    <v-col v-for="i in 3" class="col-6" @click="$router.push('/profile')">
                        <v-img
                            class="rounded-lg"
                            src="https://picsum.photos/300/510?random"
                            lazy-src="/1.png"
                        >
                        <template v-slot:placeholder>
                            <v-row
                              class="fill-height ma-0"
                              align="center"
                              justify="center"
                            >
                              <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                              ></v-progress-circular>
                            </v-row>
                          </template>
</v-img>
<span class="pt-1">Federico</span>
</v-col>
</v-row>
</v-card>
</v-container>
</template>

<script>
    export default {

    }
</script>