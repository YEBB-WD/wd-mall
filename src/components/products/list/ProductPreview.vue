<template>
  <div align="center">
    <v-card max-width="300">
      <v-img
          :src="prdt_img"
          @click="clickItem(prdt_code)"
          contains>
      </v-img>
      <v-row>
        <v-col @click="clickItem(prdt_code)">
          <h3>{{ prdt_name }}</h3>
        </v-col>
      </v-row>
      <v-row>
          <v-col cols="9">
            <h5>$ {{ prdt_price }}</h5>
            <div v-if="isLocalZH()">
              <h6>( {{ $i18n.t('label.unit') }}{{ prdt_price_kr }} )</h6>
            </div>
            <div v-else>
              <h6>( {{ prdt_price_kr }} {{ $i18n.t('label.unit') }})</h6>
            </div>
          </v-col>
          <v-col cols="2">
            <v-card>
              <v-fab-transition>
                <v-btn
                    v-show="!hidden"
                    color="pink"
                    dark
                    absolute
                    bottom
                    right
                    fab
                    small
                >
                  <v-icon>mdi-cart-plus</v-icon>
                </v-btn>
              </v-fab-transition>
            </v-card>
          </v-col>
      </v-row>
    </v-card>

  </div>
</template>

<script>
export default {
  name: "ProductPreview",
  props: {
    prdt_img: {
      type: String,
      default: 'https://image.ssgdfm.com/images/product/500/641/20190821N0001493.jpg'
    },
    prdt_name: {
      type: String,
      default: '뉴 어드밴스드 제니피끄 에센스 리페어링'
    },
    prdt_price: {
      type: String,
      default: '204.00'
    },
    prdt_price_kr: {
      type: String,
      default: '225,909'
    },
    prdt_price_zh: {
      type: String,
      default: '503'
    },
    prdt_code: {
      type: String,
      default: '01069001778'
    }
  },
  data() { return {

  }},
  methods: {
    isLocalZH() {
      if(this.$i18n.locale == 'zh') return true;
      return false;
    },
    clickItem(prdtCode) {
      // this.$router.push('/prdtDetail')
      this.$router.push( { name: 'ProductDetail',
        params: {
          item: {
            prdt_img: 'http://image.ssgdfm.com/images/product/500/946/20170220F0000386.jpg',
            prdt_code: '09839000088',
            prdt_brand: 'AESOP',
            prdt_name: 'PARSLEY SEED ANTI-OXIDANT SERUM 精华 100mL',
            prdt_list_price: '68',
            prdt_list_price_ko: '75452',
            prdt_list_price_zh: '439.96',
            prdt_sale_price: '61.2',
            prdt_sale_price_ko : '67907',
            prdt_sale_price_zh : '395.96',
            prdt_discount_rate: '10',
            prdt_quantity: 1,
            prdt_category: '护肤/基础护肤/精华',
          }
        }})
      console.log("Product view Detail : " + prdtCode);
    }
  }
}
</script>

<style scoped>

</style>
