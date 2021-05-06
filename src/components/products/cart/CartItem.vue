<template>
  <div align="center">
    <v-card flat>
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
      <v-divider></v-divider>
      <v-card flat>
        <div align="right">
          <h5>Total Quantity: {{ numberWithCommas(totalQuantity()) }}</h5>
          <h1 style="color: red">Total : $ {{ numberWithCommas(totalPrice()) }}</h1>
          <h5 v-if="isLocalZH()" style="color: blue">( {{ $i18n.t('label.unit') }} {{ numberWithCommas(totalPrice_zh()) }} )</h5>
          <h5 v-else style="color: blue">( {{ numberWithCommas(totalPrice_ko()) }} {{ $i18n.t('label.unit') }})</h5>
        </div>
        <br/>
        <br/>
      </v-card>
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
    totalPrice() {
      return this.products.reduce((current, next) =>
          current + Number(next.prdt_sale_price), 0);
    },
    totalPrice_ko() {
      return this.products.reduce((current, next) =>
          current + Number(next.prdt_sale_price_ko), 0);
    },
    totalPrice_zh() {
      return this.products.reduce((current, next) =>
          current + Number(next.prdt_sale_price_zh), 0);
    },
    totalQuantity() {
      return this.products.reduce((current, next) =>
          current + Number(1), 0);
    },
    numberWithCommas(x) {
      if(x==undefined) x = '0'
      if(String(x).indexOf('.') > -1) x = Number(x).toFixed(2)
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    isLocalZH() {
      if(this.$i18n.locale == 'zh') return true;
      return false;
    },

  },
  computed: mapState({
    products: state => state.shoppingCart
  }),
}
</script>

<style scoped>

</style>
