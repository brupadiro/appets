<template>
    <div class="productos">
        <div class="app-bar-productos verde_fuerte pt-3 ">
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
            <v-btn v-show="showRefresh" color="verde_fuerte" fab class="btnRefresh" @click="refreshProducts"><v-icon color="white">mdi-refresh</v-icon></v-btn>
            <v-row v-if="productos.length != 0" >
                <v-col class="col-6" v-for="(producto,index) in productos"  :key="index">
                    <producto 
                    :producto="producto" 
                    class="mb-5"
                    ></producto>
                </v-col>
            </v-row>
            <div class="d-flex flex-column justify-center align-center text-center" v-else>
                <h2 class="blue-grey--text lighten-5 mt-10">No se encontraron productos</h2>
            </div>
            <v-pagination
            v-show="cantidadDeProductos != 0"
                :length="Math.ceil(cantidadDeProductos / limit)"
                v-model="currentPage"
              ></v-pagination>
        </div>
    </div>
</template>

<script>
    import producto from "~/components/ProductoCard.vue"
    export default {
        layout: 'productos',
        data() {
            return {
                productos: [],
                initProductos: [],
                showProductoDialog: false,
                showRefresh: false,
                producto: {},
                buscar: "",
                start: 0,
                cantidadDeProductos: 0,
                currentPage: 1,
                cantidadDePaginas: 0,
                limit: 12
            }
        },
        created() {
            this.$axios.get(`/productos/?_start=${this.start}&_limit=${this.limit}`).then(response => {
                this.productos = response.data
                this.initProductos = response.data
            })
            this.$axios.get('/productos/count').then(response => {
                this.cantidadDeProductos = response.data
            })
        },
        watch: {
            buscar(newVal, oldVal) {
                if (newVal == "") {
                    this.showRefresh = false
                    this.productos = this.initProductos
                    this.cantidadDeProductos = this.productos.length
                    return
                }
                this.showRefresh = true

            },
            currentPage(newVal, oldVal) {
                console.log("currentPage")
                this.$axios.get(`/productos/?_start=${this.currentPage - 1}&_limit=${this.limit}`).then(response => {
                    this.productos = response.data
                })
            }
        },
        methods: {
            refreshProducts() {
                this.$axios.get(`/productos/?nombre_contains=${this.buscar}&_start=${this.currentPage - 1}&_limit=${this.limit}`).then(response => {
                    this.productos = response.data
                    if (this.productos.length == 0)
                        this.cantidadDeProductos = 0
                    this.showRefresh = false
                })
            },
            colorBtn(number) {
                return (true) ? "primary" : "primary_obscure"
            }
        },
        components: {
            producto,
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
        position: fixed;
        z-index: 5;
        top: 25%;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
    }
</style>