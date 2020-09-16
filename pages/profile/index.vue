<template>
  <v-container class="pa-0">
    <div class="blue-grey lighten-5">
      <v-row class="pt-5" no-gutters>
        <v-col class="col-4 d-flex flex-column justify-center align-center">
          <p class="font-weight-black">0</p>
          <span class="font-weight-black" color="grey lighten-5">Seguidores</span>
        </v-col>
        <v-col class="col-4 text-center">
          <v-avatar color="teal" size="100">
            <v-img v-if="profile.profile_picture.url" :src="$axios.defaults.baseURL + profile.profile_picture.url"></v-img>
            <v-icon v-else size="100">mdi-account-circle-outline</v-icon>
          </v-avatar>
        </v-col>

        <v-col class="col-4 d-flex flex-column justify-center align-center">
          <p class="font-weight-black">0</p>
          <span class="font-weight-black" color="grey lighten-5">Seguidos</span>
        </v-col>
        <v-col class="col-12 d-flex flex-column justify-center align-center">
          <v-btn rounded outlined class="mt-3" @click="modalEditProfile = true">Editar perfil</v-btn>
        </v-col>
      </v-row>
      <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab v-for="(item,key) in items" :key="item.tab">
          {{ key }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <post-card v-for="(publication,index) in publications" :key="index" :publication="publication" @showpublication="getPublication($event)"></post-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
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
                <drag-and-drop-photo-card @uploadedPicture="setProfilePicture($event)" :image="$axios.defaults.baseURL + profile.profile_picture.url" ></drag-and-drop-photo-card>
            </v-col>
            <v-col class="col-12">
                <v-text-field outlined required label="Nombre de usuario" type="text" v-model="profile.username"></v-text-field>
            </v-col>
            <v-col class="col-12">
                <v-text-field outlined required label="Email" type="email" v-model="profile.email"></v-text-field>
            </v-col>
            <v-col class="col-12">
                <v-text-field outlined required label="Telefono" type="number"  v-model="profile.phone"></v-text-field>
            </v-col>
            <v-col class="col-12 d-flex">
              <v-btn x-large style="width:100%" rounded class="white--text font-weight-bold" color="success" @click="saveProfile()">Guardar</v-btn>
            </v-col>
        </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="showSnackbar"
      timeout="1000"
    >
      Tu perfil a sido acutalizado
    </v-snackbar>
  </v-container>
</template>

<script>
    import PostCard from "~/components/PostCard.vue"
    import DragAndDropPhotoCard from '~/components/DragAndDropPhotoCard.vue'

    export default {
        layout: 'profile',
        data() {
            return {
                tab: null,
                publications: [],
                modalEditProfile: false,
                profile: {
                    profile_picture: {}
                },
                items: {
                    info: {
                        extra: "Extra extraaa"
                    }
                },
                showSnackbar: false
            }
        },
        created() {
            this.getPosts()
            this.getUser()
        },
        methods: {
            setProfilePicture(e) {
                this.profile.profile_picture = e
            },
            getUser() {
                this.$axios.get(`/users/${this.$auth.user.id}/`)
                    .then((data) => {
                        this.profile = data.data
                    })
            },
            saveProfile() {
                let profileData = new FormData()
                profileData.append(`data`, JSON.stringify(this.profile))
                this.$axios.put(`/users/${this.$auth.user.id}/`, profileData)
                    .then((data) => {
                        let profilePicture = new FormData()
                        profilePicture.append('field', 'profile_picture')
                        profilePicture.append('files', this.profile.profile_picture)
                        profilePicture.append('source', 'users-permissions');
                        profilePicture.append('ref', 'user')
                        profilePicture.append('refId', this.$auth.user.id)
                        this.$axios.post('/upload', profilePicture, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        this.closeModalPerfil()
                    })
            },
            getPosts() {
                this.$axios.get(`/publicaciones/?user=${this.$auth.user.id}`)
                    .then((data) => {
                        this.publications = data.data
                    })
            },
            closeModalPerfil() {
                this.modalEditProfile = false
                this.showSnackbar = true
                this.getUser()
            }
        },
        components: {
            PostCard,
            DragAndDropPhotoCard
        }
    }
</script>