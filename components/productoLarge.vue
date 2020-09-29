<template>

  <v-card v-ripple color="white" elevation="3">
    <v-row>
      <v-col class="col-12">
        <img :src="$axios.defaults.baseURL + producto.img_principal[0].url" width="100%" />
      </v-col>
      <v-col class="col-12">
        <div class="pl-2 text-truncate">
            <h3>{{producto.nombre}}</h3>
          <h3>$&nbsp;<span class="font-weight-medium-lg">{{producto.precio}}</span></h3>
        </div>
      </v-col>
    </v-row>
    <v-btn fab absolute right color="primary" width="35" height="35" style="right: 10px;bottom:10px">
      <v-icon color="white" @click="showProductoDetails">mdi-cart-plus</v-icon>
    </v-btn>
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
    .product {
        border: 1px solid #e7e7e7;
        cursor: pointer;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        perspective: 1000px;
        box-shadow: 0 5px 23px rgba(188, 207, 219, .35);
        transition: all .35s cubic-bezier(.39, .58, .57, 1);
        z-index: 1000 !important;
        border-radius: 2px !important;
        margin-bottom: 15px;
    }
    
    .product-title {
        color: #313131;
        font-size: 15px;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
    }
    
    .font-weight-medium-lg {
        font-weight: 600
    }
    
    .discount {
        color: #00bdb5;
        font-size: 17px;
        font-weight: 600;
        margin-left: 5px;
        text-align: left;
    }
    
    .ahorras {
        margin: 0;
        background: var(--secundary);
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: #00243c;
        z-index: 1;
        width: 100%;
        text-align: center;
        color: white;
        font-size: 17px;
        font-weight: 700;
    }
    
    .product-hr {
        border-color: #e7e7e71f;
        margin: 12px 0;
    }
    
    .porcent-discount {
        font-weight: 700;
    }
    
    .porcent-discount span {
        font-size: 25px;
        font-size: 20px;
    }
    
    .product-info {
        width: 100%;
    }
    
    .subasta-fin {
        text-align: center;
        color: black;
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 0 !important;
    }
</style>