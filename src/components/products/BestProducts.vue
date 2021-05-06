<template>
  <div class="best-products">
    <v-card>
      <v-card-title>
        Best Products
      </v-card-title>
      <product-preview-list :prdts="prdts"></product-preview-list>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import ProductPreviewList from "@/components/products/list/ProductPreviewList";

export default {
  name: "BestProducts",
  components: {
     ProductPreviewList
  },
  data() {
    return {
      bestProducts: [],
      loading: false,
      prdts: [
        {
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
        },
        {
          prdt_img: 'https://image.ssgdfm.com/images/product/500/462/20170410F0000291.png',
          prdt_code: '01069000518',
          prdt_brand: 'LANCOME',
          prdt_name: '토닉 꽁포르 400ml 모이스처라이징',
          prdt_list_price: '61',
          prdt_list_price_ko: '68277',
          prdt_list_price_zh: '439.96',
          prdt_sale_price: '54.9',
          prdt_sale_price_ko : '61449',
          prdt_sale_price_zh : '395.96',
          prdt_discount_rate: '10',
          prdt_quantity: 1,
          prdt_category: '护肤/基础护肤/精华',
        },
        {
          prdt_img: 'https://image.ssgdfm.com/images/product/500/717/20190816N0002687.jpg',
          prdt_code: '01069001536',
          prdt_brand: 'LANCOME',
          prdt_name: '압솔뤼 루즈 드라마 마뜨 196 Orange Sanguine',
          prdt_list_price: '33',
          prdt_list_price_ko: '36936',
          prdt_list_price_zh: '439.96',
          prdt_sale_price: '29.7',
          prdt_sale_price_ko : '33242',
          prdt_sale_price_zh : '395.96',
          prdt_discount_rate: '10',
          prdt_quantity: 1,
          prdt_category: '护肤/基础护肤/精华',
        },
        {
          prdt_img: 'https://image.ssgdfm.com/images/product/500/244/20190816N0002707.jpg',
          prdt_code: '01069001457',
          prdt_brand: 'LANCOME',
          prdt_name: '뗑 이돌 롱라스팅 파운데이션 PO-01',
          prdt_list_price: '54',
          prdt_list_price_ko: '60442',
          prdt_list_price_zh: '439.96',
          prdt_sale_price: '48.6',
          prdt_sale_price_ko : '54398',
          prdt_sale_price_zh : '395.96',
          prdt_discount_rate: '10',
          prdt_quantity: 1,
          prdt_category: '护肤/基础护肤/精华',
        },
        {
          prdt_img: 'https://image.ssgdfm.com/images/product/500/591/20190911N0000706.jpg',
          prdt_code: '01069001650',
          prdt_brand: 'LANCOME',
          prdt_name: '압솔뤼 리제너레이팅 브라이트닝 소프트 크림 주름 개선',
          prdt_list_price: '310',
          prdt_list_price_ko: '346983',
          prdt_list_price_zh: '439.96',
          prdt_sale_price: '279',
          prdt_sale_price_ko : '312285',
          prdt_sale_price_zh : '395.96',
          prdt_discount_rate: '10',
          prdt_quantity: 1,
          prdt_category: '护肤/基础护肤/精华',
        },
        {
          prdt_img: 'https://image.ssgdfm.com/images/product/500/060/20200317N0000604.jpg',
          prdt_code: '01069001893',
          prdt_brand: 'LANCOME',
          prdt_name: '클라리피끄 듀얼 에센스 광채 정화 투명함',
          prdt_list_price: '139',
          prdt_list_price_ko: '155582',
          prdt_list_price_zh: '439.96',
          prdt_sale_price: '125.1',
          prdt_sale_price_ko : '140024',
          prdt_sale_price_zh : '395.96',
          prdt_discount_rate: '10',
          prdt_quantity: 1,
          prdt_category: '护肤/基础护肤/精华',
        },
        {
          prdt_img: 'https://image.ssgdfm.com/images/product/500/280/20200807N0000019.jpg',
          prdt_code: '01069001963',
          prdt_brand: 'LANCOME',
          prdt_name: '압솔뤼 에센스 파운데이션 골든글로우 100-P',
          prdt_list_price: '111',
          prdt_list_price_ko: '124242',
          prdt_list_price_zh: '439.96',
          prdt_sale_price: '99.9',
          prdt_sale_price_ko : '111818',
          prdt_sale_price_zh : '395.96',
          prdt_discount_rate: '10',
          prdt_quantity: 1,
          prdt_category: '护肤/基础护肤/精华',
        },
        {
          prdt_img: 'https://image.ssgdfm.com/images/product/500/464/20200928N0000019.jpg',
          prdt_code: '01069002009',
          prdt_brand: 'LANCOME',
          prdt_name: '압솔뤼 루즈 인티마뜨 888레드와인',
          prdt_list_price: '33',
          prdt_list_price_ko: '36936',
          prdt_list_price_zh: '439.96',
          prdt_sale_price: '29.7',
          prdt_sale_price_ko : '33242',
          prdt_sale_price_zh : '395.96',
          prdt_discount_rate: '10',
          prdt_quantity: 1,
          prdt_category: '护肤/基础护肤/精华',
        }
      ],
    }
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
