<template>
  <div class="top-products">
    <v-card>
      <v-card-title>
        Top Products
      </v-card-title>
      <product-preview-list :prdts="prdts"></product-preview-list>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import ProductPreviewList from "@/components/products/list/ProductPreviewList";

export default {
  name: "TopProducts",
  components: {
    ProductPreviewList
  },
  data() {
    return {
      topProducts: [],
      loading: false,
      prdts: [
        {
          prdt_img: 'http://image.ssgdfm.com/images/product/500/173/20170306F0000977.jpg',
          prdt_code: '05979000211',
          prdt_brand: 'KIEHL`S',
          prdt_name: '울트라 훼이셜 크림 125ML',
          prdt_list_price: '62',
          prdt_list_price_ko: '69396',
          prdt_list_price_zh: '439.96',
          prdt_sale_price: '55.8',
          prdt_sale_price_ko : '62456',
          prdt_sale_price_zh : '395.96',
          prdt_discount_rate: '10',
          prdt_quantity: 1,
          prdt_category: '护肤/基础护肤/精华',
        },
        {
          prdt_img: 'http://image.ssgdfm.com/images/product/500/141/20210426N0000254.jpg',
          prdt_code: '07709000163',
          prdt_brand: 'URBAN DECAY',
          prdt_name: '올 나이터 메이크업 세팅 스프레이 118 ml',
          prdt_list_price: '31',
          prdt_list_price_ko: '34698',
          prdt_list_price_zh: '439.96',
          prdt_sale_price: '27.9',
          prdt_sale_price_ko : '31228',
          prdt_sale_price_zh : '395.96',
          prdt_discount_rate: '10',
          prdt_quantity: 1,
          prdt_category: '护肤/基础护肤/精华',
        },
        {
          prdt_img: 'http://image.ssgdfm.com/images/product/500/946/20170220F0000386.jpg',
          prdt_code: '09839000088',
          prdt_brand: 'AESOP',
          prdt_name: 'Parsley Seed Anti-Oxidant Serum 100mL',
          prdt_list_price: '68',
          prdt_list_price_ko: '76112',
          prdt_list_price_zh: '439.96',
          prdt_sale_price: '61.2',
          prdt_sale_price_ko : '68501',
          prdt_sale_price_zh : '395.96',
          prdt_discount_rate: '10',
          prdt_quantity: 1,
          prdt_category: '护肤/基础护肤/精华',
        },
        {
          prdt_img: 'http://image.ssgdfm.com/images/product/500/145/20190816N0002779.jpg',
          prdt_code: '01069001732',
          prdt_brand: 'LANCOME',
          prdt_name: 'UV 엑스퍼트 비비 컴플리트 트리오 자외선 차단',
          prdt_list_price: '162',
          prdt_list_price_ko: '181326',
          prdt_list_price_zh: '439.96',
          prdt_sale_price: '145.8',
          prdt_sale_price_ko : '163193',
          prdt_sale_price_zh : '395.96',
          prdt_discount_rate: '10',
          prdt_quantity: 1,
          prdt_category: '护肤/基础护肤/精华',
        },
        {
          prdt_img: 'http://image.ssgdfm.com/images/product/500/541/20180321F0000197.jpg',
          prdt_code: '05979000478',
          prdt_brand: 'KIEHL`S',
          prdt_name: '울트라 라이트 데일리 유브이 디팬스 썬스크린 60ml',
          prdt_list_price: '42',
          prdt_list_price_ko: '47010',
          prdt_list_price_zh: '439.96',
          prdt_sale_price: '37.8',
          prdt_sale_price_ko : '42309',
          prdt_sale_price_zh : '395.96',
          prdt_discount_rate: '10',
          prdt_quantity: 1,
          prdt_category: '护肤/基础护肤/精华',
        },
        {
          prdt_img: 'http://image.ssgdfm.com/images/product/500/241/20200220N0001078.jpg',
          prdt_code: '04229000685',
          prdt_brand: 'SHISEIDO',
          prdt_name: 'AN PERFECT UV SS SKINCARE MILK A 90ml',
          prdt_list_price: '34',
          prdt_list_price_ko: '38056',
          prdt_list_price_zh: '439.96',
          prdt_sale_price: '30.6',
          prdt_sale_price_ko : '34250',
          prdt_sale_price_zh : '395.96',
          prdt_discount_rate: '10',
          prdt_quantity: 1,
          prdt_category: '护肤/基础护肤/精华',
        },
        {
          prdt_img: 'http://image.ssgdfm.com/images/product/500/803/20170306F0000968.jpg',
          prdt_code: '05979000220',
          prdt_brand: 'KIEHL`S',
          prdt_name: '크리미 아이 트리트먼트 위드 아보카도 28G',
          prdt_list_price: '57',
          prdt_list_price_ko: '63800',
          prdt_list_price_zh: '439.96',
          prdt_sale_price: '51.3',
          prdt_sale_price_ko : '57420',
          prdt_sale_price_zh : '395.96',
          prdt_discount_rate: '10',
          prdt_quantity: 1,
          prdt_category: '护肤/基础护肤/精华',
        },
        {
          prdt_img: 'http://image.ssgdfm.com/images/product/500/575/20200529N0000208.jpg',
          prdt_code: '55559000039',
          prdt_brand: 'BIOTHERM HOMME',
          prdt_name: '아쿠아파워 & 아쿠아파워 로션 세트 - 수분보습 (남성용)',
          prdt_list_price: '83',
          prdt_list_price_ko: '92901',
          prdt_list_price_zh: '439.96',
          prdt_sale_price: '74.7',
          prdt_sale_price_ko : '83611',
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

    getTopProducts() {
      /*this.loading = true;
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/top/products`)
        .then((response) => {
          this.loading = false;
          this.topProducts = response.data;
        })
        .catch(() => {
          errorToaster(
            "The server encountered an unexpected condition.",
            "Internal Error 500"
          );
        });*/
    },
  },
  created() {
    this.getTopProducts();
  },
};
</script>

<style>
.card {
  height: 490px;
}
.card-text {
  height: 70px;
  overflow: hidden;
}
</style>
