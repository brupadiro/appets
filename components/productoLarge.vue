<template>

  <v-card v-ripple color="white" elevation="2" :to="`/productos/${producto.id}`">
    <v-row no-gutters>
      <v-col class="col-12">
        <v-img :src="$axios.defaults.baseURL + producto.img_principal[0].url" width="100%" height="150" contain />
          <v-divider class="divider-product"></v-divider>
      </v-col>
      <v-col class="col-12">
        <div class="pl-2 text-truncate">
          <h4 class="text-center">{{producto.nombre}}</h4>
        </div>
      </v-col>
      <v-col class="col-12">
        <div class="pl-2 text-truncate">
          <p class="text-center overline mb-0">{{producto.descripcion}}</p>
        </div>
      </v-col>
      <v-col class="col-12 d-flex justify-center mb-3">
        <div class="div-price">
          <h4 class="font-weight-bold">$&nbsp;<span class="font-weight-medium-lg">{{producto.precio}}</span></h4>
          <v-btn  color="primary" width="35" height="35" fab>
            <v-icon color="white" @click="showProductoDetails">mdi-cart-plus</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    props: {
      producto: Object
    },
    methods: {
      showProductoDetails() {
        this.$router.push('/producto/' + this.producto.id)
      }
    }
  }

</script>
<style scoped>
.div-price{
    border: 2px solid #00b8ad;
    border-radius: 50px;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
}
.divider-product{
    height:1px;
    background:#00b8ad;
}
</style>
