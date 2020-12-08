<template>
    <v-container class="pa-0">
        <v-card flat>
          <div class=" mt-5 full-width text-center" v-if="sugeridos.length == 0">
            <v-progress-circular
            indeterminate
            color="orange"
          ></v-progress-circular>
          </div>
            <v-row v-else class="pa-4">
                    <v-col 
                    v-for="(user,index) in sugeridos"
                    class="col-6" 
                    :key="index"
                    @click="$router.push('/profile/'+user.id)">
                        <v-img
                            class="rounded-lg"
                            :src="$axios.defaults.baseURL + user.profile_picture.url"
                            lazy-src="/1.png"
                        >
                        </v-img>
                        <span class="pt-1">{{user.username}}</span>
                    </v-col>
              </v-row>
          </v-card>
      </v-container>
</template>

<script>
    export default {

      data(){
        return {
          sugeridos:[]
        }
      },
      async created(){
        var response  = await this.$axios.get('/seguidor-seguidos/sugeridos?seguidor='+this.$auth.user.id)
        this.sugeridos = response.data
      }
    }
</script>