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
        <div class="pa-4">
            <producto-large 
        v-for="(producto,index) in showProductos" 
        :producto="producto" 
        :key="index" 
        class="mb-5"
    
        >
    
    </producto-large>
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
                showProductos: [],
                showProductoDialog: false,
                producto: {},
                buscar: ""
            }
        },
        watch: {
            buscar(newVal, oldVal) {
                if (newVal == "") {
                    this.showProductos = this.productos
                    return
                }

                this.showProductos = []
                this.productos.forEach(element => {
                    if (element.nombre.toLowerCase().includes(newVal.toLowerCase()))
                        this.showProductos.push(element)
                })
            }
        },
        created() {
            this.$axios.get('/productos/').then(response => {
                this.productos = response.data
                this.showProductos = response.data
            })
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
</style>