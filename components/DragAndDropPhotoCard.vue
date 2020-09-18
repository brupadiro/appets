<template>
    <v-container>
        <v-sheet                               
      title="TAP TO ADD"
      color="indigo lighten-4"
      width="50%"
      height="200"
      class="pa-2 ma-auto rounded d-flex justify-center align-center dotted-border"
      @click="selectPhoto"
    >
    <v-icon size="80" v-if="image == null">mdi-camera-plus-outline</v-icon>
    <v-img id="previewImg" v-else :src="image" max-height="100%" contain></v-img>
    <input type="file" style="display:none;" id="uploadFile" @change="onFileChange" accept="image/*">
    </v-sheet>
    </v-container>
</template>

<script>
    export default {
        name: 'DragAndDropPhotoCard',
        props: ['image'],
        // data() {
        //     return {
        //         image: null,
        //     }
        // },
        methods: {
            selectPhoto(event) {
                console.log("click")
                uploadFile.click()
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files
                if (!files.length)
                    return
                this.$emit('uploadedPicture', files[0])

            }
        }
    }
</script>

<style scoped>
    .dotted-border {
        border: 1px solid;
        border-style: dotted;
    }
</style>