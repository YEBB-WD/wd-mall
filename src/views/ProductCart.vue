<template>
  <div align="center">
    <v-card max-width="98%" flat>
      <cart-item></cart-item>

    </v-card>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import CartItem from "@/components/products/cart/CartItem";

export default {
  name: "ProductCart",
  components: {CartItem},
  comments: {
    CartItem
  },
  data() { return {

  }},
  methods: {

  },
  computed: mapState({
    products: state => state.shoppingCart
  }),
}
</script>

<style scoped>

</style>
