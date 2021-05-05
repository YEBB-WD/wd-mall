<template>
  <div>
    <v-card>
      <v-row align="left">
        <v-col cols="1"></v-col>
        <v-col cols="10">
          <tr>
            <th align="left">
              <h4> {{ item.prdt_brand }}</h4>
            </th>
          </tr>
          <tr align="left">
              <h2> {{ item.prdt_name }}</h2>
          </tr>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="10" xs="10" sm="5" md="5">
          <v-card align="center" flat>
            <v-img
              :src="item.prdt_img"
              contains
              max-width="350"></v-img>
          </v-card>
        </v-col>
        <v-col cols="10" xs="10" sm="7" md="7">
<!--          <tr>
            <th width="60" align="left">
              <h6> {{ $i18n.t('label.brand_name')}}</h6>
            </th>
            <th align="left">
              <h4> {{ item.prdt_brand }}</h4>
            </th>
          </tr>
          <tr>
            <th align="left">
              <h6> {{ $i18n.t('label.prdt_name')}}</h6>
            </th>
            <th align="left">
              <h4> {{ item.prdt_name }}</h4>
            </th>
          </tr>
          <br>-->
          <tr>
            <th width="60" align="left">
              <h6>{{ $i18n.t('label.prdt_price')}}</h6>
            </th>
            <th align="left">
              <h4>$ {{ numberWithCommas(item.prdt_list_price) }}
                <span style="font-size: small" v-if="lang=='zh'">( ￥ {{ numberWithCommas(item.prdt_list_price_zh) }} )</span>
                <span style="font-size: small" v-else>( {{ numberWithCommas(item.prdt_list_price_ko) }} 원)</span>
              </h4>
            </th>
          </tr>
          <tr>
            <th align="left">
              <h6>{{ $i18n.t('label.list_price')}}</h6>
            </th>
            <th style="color: red" align="left">
              <h4>$ {{ numberWithCommas(item.prdt_sale_price) }}
                <span style="font-size: small" v-if="lang=='zh'">( ￥ {{ numberWithCommas(item.prdt_sale_price_zh) }} )</span>
                <span style="font-size: small" v-else>( {{ numberWithCommas(item.prdt_sale_price_ko) }} 원)</span>
              </h4>
            </th>
          </tr>
          <v-divider></v-divider>
          <br>
          <tr>
            <th width="60" align="left">
              <h6>{{ $i18n.t('label.quantity')}}</h6>
            </th>
            <td style="width: 80px">
              <v-select
                  v-model="prdt_quantity"
                  :items="quantity_list"
                  flat
                  style="font-size: small"
              >
              </v-select>
            </td>
            <td/>
          </tr>
          <tr>
            <th width="80" align="left">
              <h6>{{ $i18n.t('label.total') }} {{ $i18n.t('label.purchasePrice')}}</h6>
            </th>
            <th style="color: red"  align="left" colspan="2">
              <h1>$ {{ numberWithCommas(getTotalPrice) }}
                <span style="font-size: small" v-if="lang=='zh'">(￥{{ numberWithCommas(getTotalPriceZh) }})</span>
                <span style="font-size: small" v-else>({{ numberWithCommas(getTotalPriceKo) }} 원)</span>
              </h1>
            </th>
          </tr>
          <tr>
          <br>
          <tr>
            <td width="200" align="right" colspan="3">
              <v-btn color="blue" dark>
                Add to cart<pre>&nbsp;</pre>
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </td>
          </tr>
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-card-title>
        Detail
      </v-card-title>
      <div>
        <v-data-table
            dense
            :items="prdt_desc_zh"
            mobile-breakpoint="0"
            item-key="key"
            hide-default-header
            hide-default-footer
            v-if="isLocalZH"
        ></v-data-table>
        <v-data-table
            dense
            :items="prdt_desc_ko"
            mobile-breakpoint="0"
            item-key="key"
            hide-default-header
            hide-default-footer
            v-if="isLocalZH"
        ></v-data-table>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ProductDetail",
  props: {
    item: {
      types: Object,
      default: {
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
      },
    },
    prdt_desc_ko: {
      types: Array,
      default: [
        {
          key: '용량 또는 중량',
          value: '100ML'
        },
        {
          key: '제품 주요 사양',
          value: '모든 피부용'
        },
        {
          key: '사용기한 또는 개봉 후 사용기간',
          value: '개봉 후 1년 이내 사용권장'
        },
        {
          key: '사용방법',
          value: '세안 후 토너를 바른 피부에 사용합니다.'
        },
        {
          key: '제조자 및 제조판매업자',
          value: '제조업자 : Emeis Cosmetics Pty Ltd. 화장품 책임판매업자: Emeis Cosmetics Pty Ltd.'
        },
        {
          key: '제조국',
          value: '오스트레일리아'
        },
        {
          key: '전성분',
          value: '알로에베라잎즙, 정제수, 폴리솔베이트80, 솔비톨, 피이지-150다이스테아레이트, 폴리솔베이트20, 벤질알코올, 페녹시에탄올, 라벤더오일, 판테놀, 다이소듐이디티에이, 시트릭애씨드, 소듐시트레이트, 녹차추출물, 데하이드로아세틱애씨드, 오르메니스물티카울리스오일, 포도씨추출물, 카룸페트로셀리눔씨오일, 리날룰, 리모넨, 제라니올'
        }
      ],
    },
    prdt_desc_zh: {
      types: Array,
      default: [
        {
          key: '规格',
          value: '100 ml'
        },
        {
          key: '产品主要事项',
          value: '适合所有肤质'
        },
        {
          key: '使用期限或开封后使用期限',
          value: '开封后1年'
        },
        {
          key: '使用方法',
          value: '洁面后在护肤水下一阶段涂于肌肤'
        },
        {
          key: '制造商及销售商',
          value: '制造商 : Emeis Cosmetics Pty Ltd..  制造销售商: C.F.Co'
        },
        {
          key: '产地',
          value: '澳大利亚'
        },
        {
          key: '全部成分',
          value: '芦荟叶汁，水，柠檬烯等'
        }
      ]
    }
  },
  data() { return {
    lang: 'zh',
    prdt_quantity: 1,
    quantity_list: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  }},
  methods: {
    isLocalZH() {
      if(this.$i18n.locale == 'zh') return true;
      return false;
    },
    numberWithCommas(x) {
      if(x==undefined) x = '0'
      if(String(x).indexOf('.') > -1) x = Number(x).toFixed(2)
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  computed: {
    getTotalPrice() {
      return this.prdt_quantity * (Number(this.item.prdt_sale_price))
    },
    getTotalPriceKo() {
      return this.prdt_quantity * (Number(this.item.prdt_sale_price_ko))
    },
    getTotalPriceZh() {
      return this.prdt_quantity * (Number(this.item.prdt_sale_price_zh))
    }
  },
  watch: {
    '$i18n.locale': function(newVal, oldVal) {
      console.log('locale change', newVal)
      this.lang = newVal
    }
  }
}
</script>

<style scoped>

</style>
