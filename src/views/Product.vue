<template>
  <div align="center">
    <v-card flat>
      <v-tabs
          v-model="tab"
          centered>
        <v-tab v-for="item in tabTitles" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items
          touchless
          v-model="tab">
        <v-tab-item>
          <best-products></best-products>
        </v-tab-item>
        <v-tab-item>
          <top-products></top-products>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>

import BestProducts from "@/components/products/BestProducts";
import TopProducts from "@/components/products/TopProducts";

export default {
  name: "Product",
  components: {
    BestProducts,
    TopProducts
  },
  data() { return {
    tab: 0,
    tabTitles: ['Best Product', 'Top Product'],

  }},
  methods: {

  }

}
</script>

<style scoped>

</style>
