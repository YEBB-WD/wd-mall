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
          <v-col>
            <h5>$ {{ prdt_price }}</h5>
            <div v-if="isLocalZH()">
              <h6>( {{ $i18n.t('label.unit') }}{{ prdt_price_kr }} )</h6>
            </div>
            <div v-else>
              <h6>( {{ prdt_price_kr }} {{ $i18n.t('label.unit') }})</h6>
            </div>
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
      console.log(prdtCode);
    }
  }
}
</script>

<style scoped>

</style>
