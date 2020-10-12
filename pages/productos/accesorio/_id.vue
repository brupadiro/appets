<template>
  <section>
    <div class="medium-background">
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12">
            <div class="nombre white--text pl-3 pt-4 pb-4">
              <h2>{{producto.nombre}}</h2>
            </div>
          </v-col>
          <v-col class="text-center col-7">
            <v-img :src="$axios.defaults.baseURL + producto.img_principal[0].url" class="mb-5">
            </v-img>
          </v-col>
          <v-col class="col-5 pl-2">
            <div class="mb-5">
              <h3 class="font-weight-thin white--text">Largo</h3>
              <h3 class="font-weight-bold  white--text">60cm</h3>
            </div>
            <div>
              <h3 class="font-weight-thin  white--text">Precio</h3>
              <h3 class="font-weight-bold  white--text">${{producto.precio}}</h3>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-6 d-flex align-center justify-center">
            <v-rating :value="rating" small readonly color="white"></v-rating>
          </v-col>
          <v-col class="col-6">
            <div class="ma-3 text-center">
              <v-btn color="white" rounded outlined large @click="saveProduct()">Comprar</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container>
      <v-row>
        <v-col class="col-12">
          <h3 class="font-weight-bold">Descripcion</h3>
          <p>{{producto.descripcion}}</p>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
    export default {
        layout: 'simpleWithBackButton',
        data() {
            return {
                accesorio: {
                    peso: 0,
                    tipo: '',
                },
                producto: {
                    img_principal: [{
                        url: ""
                    }],
                    nombre: '',
                    precio: 0,
                    descripcion: ''
                },
                rating: 3,
            }
        },
        created() {
            this.getProduct()
        },
        methods: {
            getProduct() {
                this.$axios.get('/accesorio/?producto=' + this.$route.params.id).then((response) => {
                    this.accesorio = response.data[0]
                    this.producto = this.accesorio.producto
                })
            },
            saveProduct() {
                var to = `/productos/checkout/${this.producto.subcategoria}/${this.producto.id}`
                this.$router.push(to)
            }
        }
    }
</script>

<style>
    .medium-background {
        width: 100%;
        background: #00b8ad;
    }
</style>