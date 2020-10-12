<template>
    <v-container class="checkout d-flex flex-column justify-space-between">
        <div>
            <h2 class="mt-2">Checkout</h2>
            <v-card class="mt-5 mb-auto" >
                <producto-comida-long-card v-if="subcategoriaComida" :producto_id="$route.params.id" @precio="updatePrecio"></producto-comida-long-card>
                <producto-accesorio-long-card v-if="subcategoriaAccesorio" :producto_id="$route.params.id" @precio="updatePrecio"></producto-accesorio-long-card>
            </v-card>
        </div>
        <!-- Costos -->
        <v-card class="fill-weight mt-5" >
            <v-list>
                <v-list-item>
                    <span class="font-weight-thin">Subtotal</span>
                    <span class="ml-auto font-weight-bold"> $ {{precio}} </span>
                </v-list-item>
                <v-list-item>
                    <span class="font-weight-thin">IVA</span>
                    <span class="ml-auto font-weight-bold"> $ {{precio * 0.22}} </span>
                </v-list-item>
                <v-list-item class="">
                    <span class="font-weight-regular primary--text ">Total</span>
                    <span class="ml-auto font-weight-bold primary--text"> $ {{precio * 1.22}} </span>
                </v-list-item>
                <v-list-item>
                    <v-btn class="white--text " color="primary" block>Comprar</v-btn>
                </v-list-item>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
    import ProductoComidaLongCard from "~/components/ProductoComidaLongCard.vue"
    import ProductoAccesorioLongCard from "~/components/ProductoAccesorioLongCard.vue"

    export default {
        layout: 'simpleWithBackButton',
        data() {
            return {
                precio: 0
            }
        },
        computed: {
            subcategoriaComida() {
                switch (this.$route.params.subcategoria) {
                    // Esto se va mas adelante - strapi trae objetos nested en dos niveles. Despues trae el id no mas
                    case 'comida-para-perro': //Comida para perro
                    case 'comida-para-gato': //Comida para gato
                        return true
                    default:
                        return false
                }
            },
            subcategoriaAccesorio() {
                switch (this.$route.params.subcategoria) {
                    // Esto se va mas adelante - strapi trae objetos nested en dos niveles. Despues trae el id no mas
                    case 'accesorios-para-perros': //Accesorio para perros
                    case 'accesorios-para-gatos': //Accesorio para gatos
                        return true
                    default:
                        return false
                }
            },
            subcategoriaServicio() {
                return (this.$route.params.subcategoria == 'servicios')
            }
        },
        methods: {
            updatePrecio(nuevoPrecio) {
                console.log(nuevoPrecio)
                this.precio += nuevoPrecio
            }
        },
        components: {
            ProductoComidaLongCard,
            ProductoAccesorioLongCard
        },

    }
</script>

<style>
    .checkout {
        height: 100%;
    }
</style>