<template>
    <v-container class="text-center">
        <v-avatar
            size="45vw"
        >
            <v-sheet                               
            title="TAP TO ADD"
            color="blue"
            width="100%"
            height="100%"
            class="pa-2 ma-auto rounded d-flex justify-center align-center dotted-border"
            @click="selectPhoto"
        >
            <v-icon size="50" v-if="image == null" color="white">mdi-camera-plus-outline</v-icon>
            <v-img id="previewImg" v-else :src="image" max-height="100%" contain></v-img>
            <input type="file" style="display:none;" id="uploadFile" @change="onFileChange" accept="image/*">
            </v-sheet>
        </v-avatar>
    </v-container>
</template>

<script>
    export default {
        name: 'DragAndDropPhotoCard',
        props: ['image'],
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