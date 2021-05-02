<template>
  <div class="best-products">
    <v-card>

    </v-card>
    <div class="row">
      <card-loader :loopCount="4" v-if="loading"/>
      <div class="col-md-3" v-for="(item, index) in bestProducts" :key="index">
        <v-row>
          <v-col>
            <product-preview></product-preview>
          </v-col>
        </v-row>
      </div>
      <div align="center" v-if="bestProducts.length == 0">
        <v-row>
          <v-col>
            <product-preview></product-preview>
          </v-col>
          <v-col>
            <product-preview></product-preview>
          </v-col>
          <v-col>
            <product-preview></product-preview>
          </v-col>
          <v-col>
            <product-preview></product-preview>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductPreview from "@/components/products/list/ProductPreview";

export default {
  name: "BestProducts",
  components: {
     ProductPreview,
  },
  data() {
    return {
      bestProducts: [],
      loading: false
    };
  },
  methods: {
    //manadatory function called from cardTemplate
    editProduct(product) {
      this.$refs.editProduct.setProduct(product);
    },

    getBestProducts() {
      /*this.loading = true;
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/best/products`)
        .then(response => {
          this.loading = false;
          this.bestProducts = response.data;
        })
        .catch(error => {
          console.log(error);
        });*/
    }
  },
  created() {
    this.getBestProducts();
  }
};
</script>

<style>
.best-products {
  margin-bottom: 10px;
}
</style>
