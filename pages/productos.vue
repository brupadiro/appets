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
            <v-row >
                <v-col class="col-6" v-for="(producto,index) in productos" >
                    <producto-large 
                    :producto="producto" 
                    :key="index" 
                    class="mb-5"
                    ></producto-large>
                </v-col>
            </v-row>
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
                showProductoDialog: false,
                showRefresh: false,
                producto: {},
                buscar: ""
            }
        },
        created() {
            this.$axios.get('/productos/').then(response => {
                this.productos = response.data
            })
        },
        watch: {
            buscar(newVal, oldVal) {
                if (newVal == "") {
                    this.showRefresh = false
                    return
                }
                this.showRefresh = true

            }
        },
        methods: {
            refreshProducts() {
                this.$axios.get('/productos/').then(response => {
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
        top: 20vh;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
    }
</style>