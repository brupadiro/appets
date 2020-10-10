<template>
    <v-container class="checkout d-flex flex-column justify-space-between">
        <div>
            <h2 class="mt-2">Checkout</h2>
            <v-card class="mt-5 mb-auto" >
                <v-list-item three-line>
                    <v-img class="mt-1 mb-1" max-width="100" :src="$axios.defaults.baseURL + producto.img_principal[0].url" ></v-img>
                    <v-list-item-content>
                    <v-list-item-title>{{producto.nombre}}</v-list-item-title>
                    <v-list-item-subtitle>
                        Tipo {{producto.comida.tipo}}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                        Peso {{producto.comida.peso}}g
                    </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </div>
        <!-- Costos -->
        <v-card class="fill-weight mt-5" >
            <v-list>
                <v-list-item>
                    <span class="font-weight-thin">Subtotal</span>
                    <span class="ml-auto font-weight-bold"> $ {{producto.precio}} </span>
                </v-list-item>
                <v-list-item>
                    <span class="font-weight-thin">IVA</span>
                    <span class="ml-auto font-weight-bold"> $ {{producto.precio * 0.22}} </span>
                </v-list-item>
                <v-list-item class="">
                    <span class="font-weight-regular primary--text ">Total</span>
                    <span class="ml-auto font-weight-bold primary--text"> $ {{producto.precio * 1.22}} </span>
                </v-list-item>
                <v-list-item>
                    <v-btn class="white--text " color="primary" block>Comprar</v-btn>

                </v-list-item>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        layout: 'simpleWithBackButton',
        data() {
            return {
                producto: {
                    img_principal: [{
                        url: ""
                    }],
                    comida: {
                        tipo: '',
                        peso: 0
                    }
                },
            }
        },
        created() {
            var url = `/productos/${this.$route.params.id}`
            this.$axios.get(url).then(response => this.producto = response.data)
        }
    }
</script>

<style>
    .checkout {
        height: 100%;
    }
</style>