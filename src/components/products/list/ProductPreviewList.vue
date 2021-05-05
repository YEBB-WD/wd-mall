<template>
  <div align="center">
    <v-card max-width="96%">
      <div class="row">
<!--        <div class="col-md-3" v-for="(item, index) in prdts" :key="index" v-if="prdts">
          <product-preview></product-preview>
        </div>-->
        <product-preview></product-preview>
        <product-preview></product-preview>
        <product-preview></product-preview>
        <product-preview></product-preview>
      </div>
    </v-card>
  </div>
</template>

<script>

import ProductPreview from "@/components/products/list/ProductPreview";

export default {
  name: "ProductPreviewList",
  components: {
    ProductPreview
  },
  props: {
      prdts: {
        types: Array,
        default: [
          {
            prdt_img: ""
          }
        ]
      }
  },
  data() { return {

  }},
}
</script>

<style scoped>

</style>
