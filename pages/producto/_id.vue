<template>
    <div class="pa-4">
        <div class="nombre">
            <h2>{{producto.nombre}}</h2>
        </div>
        <div>
            <v-row no-gutters>
                <v-col class="text-center">
                    <v-img 
                    :src="$axios.defaults.baseURL + producto.img_principal[0].url"
                    class="mb-5"
                    >
                    </v-img>
                    <v-rating :value="rating" small readonly ></v-rating>
                </v-col>
                <v-col>
                    <div class="mb-5">
                        <h3 class="font-weight-thin">Peso</h3>
                        <h2 class="font-weight-bold">150 g</h2>
                    </div>
                    <div class="mb-5">
                        <h3 class="font-weight-thin">Tipo</h3>
                        <h2 class="font-weight-bold">Adulto</h2>
                    </div>
                    <div class="mb-5">
                        <h3 class="font-weight-thin">Precio</h3>
                        <h2 class="font-weight-bold">${{producto.precio}}</h2>
                    </div>
                </v-col>
            </v-row>
            <div class="ma-3 text-center">
                <v-btn color="primary" rounded outlined large >Comprar</v-btn>
            </div>
            <div class="mt-auto">
                <h3 class="font-weight-bold">Descripcion</h3>
                <p>{{producto.descripcion}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        layout: 'simpleWithBackButton',
        data() {
            return {
                producto: {
                    img_principal: [{
                        url: ""
                    }]
                },
                rating: 3,
            }
        },
        created() {
            this.$axios.get('/productos/' + this.$route.params.id).then((response) => this.producto = response.data)
        }
    }
</script>