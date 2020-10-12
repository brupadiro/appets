<template>
    <div>
        <v-list-item three-line>
            <v-img class="mt-1 mb-1" max-width="100" :src="$axios.defaults.baseURL + producto.img_principal[0].url" ></v-img>
            <v-list-item-content>
            <v-list-item-title>{{producto.nombre}}</v-list-item-title>
            <v-list-item-subtitle>
                Tipo {{comida.tipo}}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
                Peso {{comida.peso}}g
            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>

<script>
    export default {
        props: {
            producto_id: {
                type: Number
            },
        },
        data() {
            return {
                comida: {
                    tipo: '',
                    peso: 0
                },
                producto: {
                    img_principal: [{
                        url: ''
                    }],
                    nombre: '',
                }
            }
        },
        created() {
            var url = `/comidas/?producto=${this.producto_id}`
            this.$axios.get(url).then(response => {
                this.comida = response.data[0]
                this.producto = this.comida.producto
                this.$emit('precio', this.producto.precio)
            })
        },

    }
</script>