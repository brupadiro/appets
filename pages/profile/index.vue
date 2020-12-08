<template>
  <v-container class="pa-0">
    <div
    class="relative d-flex flex-column align-center"
    >
      <v-img
      :src="$axios.defaults.baseURL + profile.profile_picture.url"
      height="45vh"
      width="100vw"
      >
      </v-img>

      <div 
      class="pa-5 first-info-profile white--text mb-n10">
        <h2>{{profile.username}}</h2>
        <span>Maldonado</span>
        <div class="pt-5">
          <v-row  class="orange rounded-lg elevation-1">
            <v-col class="text-center ">
              <span>{{allLikes}}</span>
              <br>
              <span>Me gusta</span>
            </v-col>
            <v-col class="text-center" @click="showListSeguidores">
              <span>{{seguidores}}</span>
              <br>
              <span>Seguidores</span>
            </v-col>
            <v-col class="text-center"  @click="showListSeguidos">
              <span>{{seguidos}}</span>
              <br>
              <span>Siguiendo</span>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
    <!-- <div class="blue-grey lighten-5">
      <v-row class="pt-5" no-gutters>
        <v-col class="col-4 d-flex flex-column justify-center align-center" @click="showListSeguidores">
          <p class="font-weight-black">{{seguidores}}</p>
          <span class="font-weight-black" color="grey lighten-5">Seguidores</span>
        </v-col>
        <v-col class="col-4 text-center">
          <v-avatar color="teal" size="100">
            <v-img v-if="profile.profile_picture.url" :src="$axios.defaults.baseURL + profile.profile_picture.url">
            </v-img>
            <v-icon v-else size="100">mdi-account-circle-outline</v-icon>
          </v-avatar>
        </v-col>

        <v-col class="col-4 d-flex flex-column justify-center align-center" @click="showListSeguidos">
          <p class="font-weight-black">{{seguidos}}</p>
          <span class="font-weight-black" color="grey lighten-5">Seguidos</span>
        </v-col>
        <v-col class="col-12 d-flex flex-column justify-center align-center">
          <v-btn rounded outlined class="mt-3" @click="modalEditProfile = true">Editar perfil</v-btn>
        </v-col>
      </v-row>
      <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab v-for="(item,key) in items" :key="key">
          {{ key }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <list-posts :user="$auth.user.id" ></list-posts>
        </v-tab-item>
      </v-tabs-items>

    </div> -->
    <list-posts class="mt-10" :user="$auth.user.id" ></list-posts>
    <v-dialog fullscreen v-model="modalEditProfile" class="mb-6">
      <v-card>
        <v-card-title class="text-center">
          <v-btn icon>
            <v-icon @click="modalEditProfile = false">mdi-arrow-left</v-icon>
          </v-btn>
          Tu perfil
        </v-card-title>
        <v-card-text>
          <v-row no-gutters>
            <v-col class="col-12">
              <drag-and-drop-photo-card @uploadedPicture="setProfilePicture($event)" :image="initialImage">
              </drag-and-drop-photo-card>
            </v-col>
            <v-col class="col-12">
              <v-text-field outlined required label="Nombre de usuario" type="text" v-model="profile.username">
              </v-text-field>
            </v-col>
            <v-col class="col-12">
              <v-text-field outlined required label="Email" type="email" v-model="profile.email"></v-text-field>
            </v-col>
            <v-col class="col-12">
              <v-text-field outlined required label="Telefono" type="number" v-model="profile.phone"></v-text-field>
            </v-col>
            <v-col class="col-12 d-flex">
              <v-btn x-large style="width:100%" rounded class="white--text font-weight-bold" color="success"
                @click="saveProfile()">Guardar</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="showSnackbar" timeout="1000">
      {{ snackbarMessage }}
    </v-snackbar>
    <!-- Info post -->
    <!-- Lista de seguidores -->
    <list-seguidores-seguidos 
      :showListSeguidoresSeguidos="showListSeguidoresSeguidos" 
      :seguidores="list_seguidores"
      :seguidos="list_seguidos" 
      :show_seguidores="show_seguidores"
      @unfollow="removeSeguido"
      @closeListSeguidoresSeguidos="showListSeguidoresSeguidos = false">
    </list-seguidores-seguidos>
  </v-container>
</template>

<script>
    import DragAndDropPhotoCard from '~/components/DragAndDropPhotoCard.vue'
    import PostDetailsDialog from '~/components/PostDetailsDialog.vue'
    import ListPosts from '~/components/ListPosts.vue'
    import ListSeguidoresSeguidos from '~/components/ListSeguidoresSeguidos.vue'

    export default {
        layout: 'profile',
        data() {
            return {
                tab: null,
                modalEditProfile: false,
                profile: {
                    profile_picture: {}
                },
                publications: [],
                profile_picture: {
                    file: {},
                    url: ""
                },
                allLikes: "-",
                items: {
                    info: {
                        extra: "Extra extraaa"
                    }
                },
                showSnackbar: false,
                snackbarMessage: "Perfil actualizado",
                seguidores: 0,
                seguidos: 0,
                showListSeguidoresSeguidos: false,
                list_seguidores: [],
                list_seguidos: [],
                show_seguidores: false,
                start_publicaciones: 0,
                limit_publicaciones: 12,

            }
        },
        created() {
            this.getUser()
            this.getSeguidos()
            this.getSeguidores()
            this.getPosts()
            this.getAllLikes()
        },
        methods: {
            async getAllLikes() {
                var url = `/likes?publicacion.user=${this.$auth.user.id}`
                var response = await this.$axios.get(url)
                this.allLikes = response.data.length
            },
            async removeSeguido(idSeguido) {
                await this.getSeguidos()
                this.$forceUpdate()
            },
            async getPosts() {
                this.publications = []
                var url =
                    `/publicaciones/?user=${this.$auth.user.id}&_start=${this.start_publicaciones}&_limit=${this.limit_publicaciones}`
                await this.$axios.get(url)
                    .then((data) => {
                        this.publications = data.data
                        this.loading = false
                    })
            },
            setProfilePicture(file) {
                //File
                this.profile_picture.file = file
                    //URL
                var reader = new FileReader()

                reader.onload = (e) => {
                    this.profile_picture.url = e.target.result
                };
                reader.readAsDataURL(file)
            },
            async getSeguidos() {
                //Obtener a las personas que sigo
                var response = await this.$axios.get(`/seguidor-seguidos/?seguidor=${this.$auth.user.id}`)
                this.list_seguidos = response.data
                this.seguidos = response.data.length
                this.show_seguidores = false
            },
            async getSeguidores() {
                //Las perosnas que me siguen
                var response = await this.$axios.get(`/seguidor-seguidos/?seguido=${this.$auth.user.id}`)
                this.list_seguidores = response.data
                this.seguidores = response.data.length
                this.show_seguidores = true
            },
            async getUser() {

                await this.$axios.get(`/users/${this.$auth.user.id}/`)
                    .then((data) => {
                        this.profile = data.data

                    })
            },
            async saveProfile() {
                //this.$delete(this.profile, "profile_picture")
                await this.$axios.put(`/users/${this.$auth.user.id}/`, this.profile).catch((error) => console.log(error))

                var hayArchivo = this.profile_picture.file instanceof File
                if (!hayArchivo) {
                    this.closeModalPerfil("")
                    await this.getUser()
                    return
                }

                let profilePicture = new FormData()
                profilePicture.append('field', 'profile_picture')
                profilePicture.append('files', this.profile_picture.file)
                profilePicture.append('source', 'users-permissions');
                profilePicture.append('ref', 'user')
                profilePicture.append('refId', this.$auth.user.id)
                await this.$axios.post('/upload', profilePicture, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).catch((error) => {
                    this.closeModalPerfil(error.message)
                })
                this.closeModalPerfil("")
                await this.getUser()
            },
            closeModalPerfil(messageError) {
                this.modalEditProfile = false
                this.showSnackbar = true
                if (messageError != "")
                    this.snackbarMessage = messageError
                this.getUser()
                this.$forceUpdate()
            },
            showListSeguidos() {
                this.show_seguidores = false;
                this.showListSeguidoresSeguidos = true;
            },
            showListSeguidores() {
                this.show_seguidores = true;
                this.showListSeguidoresSeguidos = true;
            }
        },
        computed: {
            initialImage() {
                return (this.profile_picture.url == '') ? this.$axios.defaults.baseURL + this.profile.profile_picture.url : this
                    .profile_picture.url
            }
        },
        components: {
            DragAndDropPhotoCard,
            PostDetailsDialog,
            ListPosts,
            ListSeguidoresSeguidos
        }
    }
</script>


<style scoped>
    .relative {
        position: relative !important;
    }
    
    .first-info-profile {
        position: absolute !important;
        bottom: 0px;
        z-index: 1;
    }
</style>