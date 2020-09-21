<template>
    <div class="productos pa-4">
        <producto-large 
        v-for="(producto,index) in productos" 
        :producto="producto" 
        :key="index" 
        class="mb-5"
    
        @productoDetails="productoDetails"
        >
    
    </producto-large>
        <v-dialog
            v-model="showProductoDialog"
            scrollable fullscreen 
            persistent
        >
        <v-card 
        outlined
        class="elevation-0"
        >
        <v-img
        :src="imgProducto"
        >
            <v-card-title class="pa-0">
                <v-btn icon @click="showProductoDialog = false">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
            </v-card-title>
        </v-img>
        <v-card-text>
            
        </v-card-text>
            
        </v-card>
            
        </v-dialog>
    </div>
</template>

<script>
    import productoLarge from "../components/productoLarge.vue"
    export default {
        data() {
            return {
                productos: [],
                showProductoDialog: false,
                producto: {}
            }
        },
        created() {
            this.$axios.get('/productos/').then(response => {
                this.productos = response.data
            })
        },
        computed: {
            imgProducto() {
                return (Object.keys(this.producto).length > 0) ? this.$axios.defaults.baseURL + this.producto.img_principal[0].url : ""
            }
        },
        methods: {
            productoDetails(producto) {
                this.producto = producto
                this.showProductoDialog = true
            }
        },
        components: {
            productoLarge,
        }
    }
</script>

<style>

</style>