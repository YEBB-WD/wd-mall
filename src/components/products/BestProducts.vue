<template>
  <div class="best-products">
    <v-card>
      <product-preview-list></product-preview-list>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import ProductPreview from "@/components/products/list/ProductPreview";
import ProductPreviewList from "@/components/products/list/ProductPreviewList";

export default {
  name: "BestProducts",
  components: {
     ProductPreview,
     ProductPreviewList
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
