<template>
  <v-dialog :value="value" fullscreen>
    <v-card>
      <v-card-title>
        <v-btn icon color="red" @click="$emit('input',false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green" text class="font-weight-light" @click="createPublication()">
          AGREGAR PUBLICACION
        </v-btn>
      </v-card-title>
      <v-card-text class="pt-3">
        <v-textarea v-model="publicacion.contenido" label="Que estas pensando..."></v-textarea>
        <v-sheet color="indigo lighten-4" width="50%" height="200" v-show="publicacion.imagen_principal != null"
          class="pa-2 rounded d-flex justify-center align-center dotted-border" @click="selectPhoto">
          <v-icon size="80" v-show="publicacion.imagen_principal == null">mdi-camera-plus-outline</v-icon>
          <img id="previewImg" v-show="publicacion.imagen_principal != null">
        </v-sheet>
          <input type="file" style="display:none;" id="uploadFile" @change="onFileChange" accept="image/*">
      </v-card-text>
      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>


<script>
    export default {
        props: {
            value: Boolean
        },
        data() {
            return {
                publicacion: {}
            }
        },
        methods: {
            selectPhoto() {
                uploadFile.click()
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files
                if (!files.length)
                    return
                this.publicacion.imagen_principal = files[0]
                console.log(URL.createObjectURL(files[0]))
                previewImg.src = URL.createObjectURL(files[0])
                previewImg.style = "max-height: 100%;max-width: 100%"
                this.$forceUpdate()

            },

            createPublication() {
                const data = new FormData()
                data.append('data', JSON.stringify({
                    "contenido": this.publicacion.contenido,
                    'user': $nuxt.$auth.user.id
                }))
                data.append('files.imagen_principal', this.publicacion.imagen_principal)
                this.$axios.post('/publicaciones/', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((data) => {
                        this.$root.$emit('newPublication', data.data)
                        this.$emit('input', false)
                    })
            }
        }
    }
</script>

<style scoped>
    .dotted-border {
        border: 1px dotted black;
    }
</style>