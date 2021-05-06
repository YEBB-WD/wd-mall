<template>
  <div align="center">
    <v-card>
      <v-list three-line subheader>
        <v-subheader>Shopping Cart</v-subheader>
        <v-divider></v-divider>

        <template v-for="(prdt, index) in products">
          <v-list-item
              :key="prdt.index">
            <v-list-item-avatar
                size="80">
              <v-img
                  :src="prdt.prdt_img"></v-img>
            </v-list-item-avatar>

            <v-list-item-content align="left">
              <v-list-item-subtitle v-text="prdt.prdt_brand"></v-list-item-subtitle>
              <v-list-item-title v-text="prdt.prdt_name"></v-list-item-title>
              <v-list-item-subtitle v-text="'$ ' + prdt.prdt_sale_price "></v-list-item-subtitle>
              <v-list-item-subtitle v-text="'Quantity: 1'"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon>
              <v-btn icon @click="removePrdtFromCart(index)">
                <v-icon color="deep-purple accent-4">
                  mdi-trash-can
                </v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </template>
      </v-list>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name: "CartItem",
  data() { return {

  }},
  methods: {
    ...mapActions([
      'removeProduct',
    ]),

    removePrdtFromCart(index) {
      this.removeProduct(index);
    },

  },
  computed: mapState({
    products: state => state.shoppingCart
  }),
}
</script>

<style scoped>

</style>
