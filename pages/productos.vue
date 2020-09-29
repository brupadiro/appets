<template>
    <div class="productos">
        <div class="app-bar-productos primary pt-3 ">
            <h2 class="white--text text-center">Productos</h2>
            <v-text-field
            class="ma-2"
            color="white"
            rounded
            outlined
            light
            v-model="buscar"
            label="Buscar producto"
            prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </div>
        <div class="pa-4 lista_de_productos">
            <v-btn v-show="showRefresh" color="primary" fab class="btnRefresh" @click="refreshProducts" absolute><v-icon>mdi-refresh</v-icon></v-btn>
            <v-row v-if="productos.length != 0" >
                <v-col class="col-6" v-for="(producto,index) in productos" >
                    <producto-large 
                    :producto="producto" 
                    :key="index" 
                    class="mb-5"
                    ></producto-large>
                </v-col>
            </v-row>
            <div class="d-flex flex-column justify-center align-center text-center" v-else>
                <h2 class="blue-grey--text lighten-5 mt-10">No se encontraron productos</h2>
            </div>
        </div>
    </div>
</template>

<script>
    import productoLarge from "../components/productoLarge.vue"
    export default {
        layout: 'productos',
        data() {
            return {
                productos: [],
                initProductos: [],
                showProductoDialog: false,
                showRefresh: false,
                producto: {},
                buscar: ""
            }
        },
        created() {
            this.$axios.get('/productos/').then(response => {
                this.productos = response.data
                this.initProductos = response.data
            })
        },
        watch: {
            buscar(newVal, oldVal) {
                if (newVal == "") {
                    this.showRefresh = false
                    this.productos = this.initProductos
                    return
                }
                this.showRefresh = true

            }
        },
        methods: {
            refreshProducts() {
                this.$axios.get('/productos/?nombre_contains=' + this.buscar).then(response => {
                    this.productos = response.data
                    this.showRefresh = false
                })
            }
        },
        components: {
            productoLarge,
        }
    }
</script>

<style>
    .app-bar-productos {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 5;
    }
    
    .lista_de_productos {
        margin-top: 20vh;
        display: relative;
    }
    
    .btnRefresh {
        z-index: 5;
        top: 25%;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
    }
</style>