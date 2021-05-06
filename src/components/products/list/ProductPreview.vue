<template>
  <div align="center">
    <v-card max-width="300">
<!--      <v-card>
        <v-fab-transition>
          <v-btn
              color="pink"
              dark
              absolute
              top
              left
              fab
              small
              text
          >
            <h1>a</h1>
          </v-btn>
        </v-fab-transition>
      </v-card>-->
      <v-img
          :src="item.prdt_img"
          @click="clickItem(item)"
          contains>
      </v-img>
      <v-row>
        <v-col @click="clickItem(item)">
          <h3>{{ item.prdt_name }}</h3>
        </v-col>
      </v-row>
      <v-row>
          <v-col cols="9">
            <h5>$ {{ numberWithCommas(item.prdt_sale_price) }}</h5>
            <div v-if="isLocalZH()">
              <h6>( {{ $i18n.t('label.unit') }}{{ numberWithCommas(item.prdt_sale_price_ko) }} )</h6>
            </div>
            <div v-else>
              <h6>( {{ numberWithCommas(item.prdt_sale_price_zh) }} {{ $i18n.t('label.unit') }})</h6>
            </div>
          </v-col>
          <v-col cols="2">
            <v-btn
                color="pink"
                dark
                absolute
                right
                fab
                small
            >
              <v-icon>mdi-cart-plus</v-icon>
            </v-btn>
<!--            <v-card>
              <v-fab-transition>
                <v-btn
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
            </v-card>-->
          </v-col>
      </v-row>
    </v-card>

  </div>
</template>

<script>
export default {
  name: "ProductPreview",
  props: {
    item: {
      types: Object,
      defaults: {
        prdt_img: 'https://image.ssgdfm.com/images/product/500/641/20190821N0001493.jpg',
        prdt_code: '01069001778',
        prdt_brand: 'LANCOME',
        prdt_name: '뉴 어드밴스드 제니피끄 에센스 리페어링',
        prdt_list_price: '204',
        prdt_list_price_ko: '228337',
        prdt_list_price_zh: '439.96',
        prdt_sale_price: '183.6',
        prdt_sale_price_ko : '205503',
        prdt_sale_price_zh : '395.96',
        prdt_discount_rate: '10',
        prdt_quantity: 1,
        prdt_category: '护肤/基础护肤/精华',
      }
    },
  },
  data() { return {


  }},
  methods: {
    isLocalZH() {
      if(this.$i18n.locale == 'zh') return true;
      return false;
    },
    clickItem(item) {
      // this.$router.push('/prdtDetail')
      this.$router.push( { name: 'ProductDetail',
        params: {
          prdt: item
        }})
      console.log("Product view Detail : " + item);
    },
    numberWithCommas(x) {
      if(x==undefined) x = '0'
      if(String(x).indexOf('.') > -1) x = Number(x).toFixed(2)
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}
</script>

<style scoped>

</style>
