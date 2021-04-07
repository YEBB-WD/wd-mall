<template>
  <div align="center">
    <br/>
    <v-card min-width="900px" flat>
      <v-card max-width="96%" >
        <v-row justify="start">
          <tr>
            <td width="100px" align="right">{{ $i18n.t('label.orderSearch') }}:</td>
            <td><pre> </pre></td>
            <td width="170px">
              <v-select
                  v-model="searchType"
                  :items="searchTypes"
                  dense
                  flat
                  outlined
                  style="font-size: small"
              ></v-select>
            </td>
            <td><pre>  </pre></td>
            <td width="250px">
              <v-text-field
                  v-model="searchText"
                  dense
                  flat
                  outlined
              ></v-text-field>
            </td>
          </tr>
        </v-row>
        <v-row justify="start">
          <tr>
            <td width="100px" align="right">{{ $i18n.t('label.orderTime') }}:</td>
            <td><pre> </pre></td>
            <td width="170px">
              <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="stDate"
                      :label="$i18n.t('label.startDate')"
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                      flat
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="stDate"
                    no-title
                    @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </td>
            <td>{{$i18n.t('label.from') }}<pre> </pre></td>
            <td width="170px">
              <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="edDate"
                      :label="$i18n.t('label.endDate')"
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                      flat
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="edDate"
                    no-title
                    @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </td>
            <td>
              <v-btn small @click="setToday">
                {{ $i18n.t('label.today')}}
              </v-btn>
              <v-btn small @click="setYesterDay">
                {{ $i18n.t('label.yesterday')}}
              </v-btn>
              <v-btn small @click="setLast7Days">
                {{ $i18n.t('label.last7days')}}
              </v-btn>
              <v-btn small @click="setLast30Dasys">
                {{ $i18n.t('label.last30days')}}
              </v-btn>
            </td>
          </tr>
        </v-row>
        <v-row justify="start">
          <tr>
            <td width="100px" align="right">{{ $i18n.t('label.prdtName') }}:</td>
            <td><pre> </pre></td>
            <td width="170px">
              <v-text-field
                  v-model="productName"
                  :label="$i18n.t('label.enterText')"
                  dense
                  flat
                  outlined
              ></v-text-field>
            </td>
            <td><pre>  </pre></td>
            <td>
              {{ $i18n.t('label.orderType')}} :
            </td>
            <td width="170px">
              <v-select
                  v-model="orderType"
                  :items="orderTypes"
                  dense
                  flat
                  outlined
                  style="font-size: small"
              ></v-select>
            </td>
            <td><pre>  </pre></td>
            <td>
              {{ $i18n.t('label.afterSalesStatus')}} :
            </td>
            <td width="170px">
              <v-select
                  v-model="afterSalesType"
                  :items="afterSalesTypes"
                  dense
                  flat
                  outlined
                  style="font-size: small"
              ></v-select>
            </td>
          </tr>
        </v-row>
        <v-row justify="start">
          <tr>
            <td width="100px" align="right">{{ $i18n.t('label.orderStatus') }}:</td>
            <td><pre> </pre></td>
            <td width="170px">
              <v-select
                  v-model="orderStatusType"
                  :items="orderStatusTypes"
                  dense
                  flat
                  outlined
                  style="font-size: small"
              ></v-select>
            </td>
            <td><pre>  </pre></td>
            <td>
              {{ $i18n.t('label.deliveryMethod')}} :
            </td>
            <td width="170px">
              <v-select
                  v-model="deliveryMethodType"
                  :items="deliveryMethodTypes"
                  dense
                  flat
                  outlined
                  style="font-size: small"
              ></v-select>
            </td>
            <td><pre>   </pre></td>
            <td>
              {{ $i18n.t('label.paymentMethod')}} :
            </td>
            <td width="170px">
              <v-select
                  v-model="paymentMethodType"
                  :items="paymentMethodTypes"
                  dense
                  flat
                  outlined
                  style="font-size: small"
              ></v-select>
            </td>
          </tr>
        </v-row>
        <v-row justify="start">
          <tr>
            <td width="100px" align="right">{{ $i18n.t('label.premotiongMethod') }}:</td>
            <td><pre> </pre></td>
            <td width="170px">
              <v-select
                  v-model="premotiongMethodType"
                  :items="premotiongMethodTypes"
                  dense
                  flat
                  outlined
                  style="font-size: small"
              ></v-select>
            </td>
            <td><pre>  </pre></td>
            <td>
              {{ $i18n.t('label.orderSource')}} :
            </td>
            <td width="170px">
              <v-select
                  v-model="orderSourceType"
                  :items="orderSourceTypes"
                  dense
                  flat
                  outlined
                  style="font-size: small"
              ></v-select>
            </td>
            <td><pre>   </pre></td>
            <td>
              {{ $i18n.t('label.addStars')}} :
            </td>
            <td width="170px">
              <v-select
                  v-model="addStarsType"
                  :items="addStarsTypes"
                  dense
                  flat
                  outlined
                  style="font-size: small"
              ></v-select>
            </td>
          </tr>
        </v-row>
        <v-row justify="start">
          <tr>
            <td width="100px" align="right"></td>
            <td><pre> </pre></td>
            <td>
              <v-btn @click="filterBtn" color="primary">
                {{ $i18n.t('label.filter')}}
              </v-btn>
            </td>
            <td><pre>  </pre></td>
            <td>
              <v-btn @click="exportBtn" >
                {{ $i18n.t('label.export')}}
              </v-btn>
            </td>
            <td><pre>  </pre></td>
            <td>
              <v-btn text @click="viewExportList" color="primary">
                {{ $i18n.t('label.viewTheExported')}}
              </v-btn>
            </td>
            <td><pre>  </pre></td>
            <td>
              <v-btn text @click="resetFilter" color="primary">
                {{ $i18n.t('label.resetFilters')}}
              </v-btn>
            </td>
          </tr>
        </v-row>
        <br/>
      </v-card>
    </v-card>

    <br/>

    <v-card min-width="900px" flat>
      <v-card max-width="96%">
        <v-tabs
            v-model="tab"
            background-color="blue-grey lighten-5"
            grow
        >
          <v-tab v-for="item in tabItems" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in tabItems" :key="item">
            <v-card flat>
              <order-card />
              <order-card />
<!--              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="tabSearch"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                    style="max-width: 150px"
                ></v-text-field>
              </v-card-title>
              <v-data-table
                  :headers="tabHeaders"
                  :items="tabDatas"
                  :search="tabSearch"
                  mobile-breakpoint="0"
                  dense
              >
              </v-data-table>-->

            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import i18n from '@/i18n'
import OrderCard from "@/views/OrderCard";

export default {
  name: "Order",
  components: {OrderCard},
  extends: {
    OrderCard
  },
  data() { return {
    searchType: 'orderNumber',
    searchTypes: [
      { text: i18n.t('label.orderNumber'), value: 'orderNumber' },
      { text: i18n.t('label.trackNumber'), value: 'trackNumber'},
      { text: i18n.t('label.receiver'), value: 'receiver'},
      { text: i18n.t('label.buyerPhone'), value: 'buyerPhone'},
      { text: i18n.t('label.receiverPhone'), value: 'receiverPhone'},
      { text: i18n.t('label.buyerPhone4Dist'), value: 'buyerPhone4Dist'},
      { text: i18n.t('label.receiverPhone4Dist'), value: 'receiverPhone4Dist'}
    ],
    searchText: '',
    menu1: false,
    menu2: false,
    stDate: '',
    edDate: '',
    productName: '',
    orderType: 'all',
    orderTypes: [
      { text: i18n.t('label.all'), value: 'all' },
      { text: i18n.t('label.normalOrder'), value: 'normalOrder' },
      { text: i18n.t('label.orderPayment'), value: 'orderPayment' },
      { text: i18n.t('label.giftOrder'), value: 'giftOrder' },
      { text: i18n.t('label.giftCommunityOrder'), value: 'giftCommunityOrder' },
      { text: i18n.t('label.wishOrder'), value: 'wishOrder' },
      { text: i18n.t('label.transferOrder'), value: 'transferOrder' },
      { text: i18n.t('label.gatherScanCode'), value: 'gatherScanCode' },
      { text: i18n.t('label.hotelOrder'), value: 'hotelOrder' },
      { text: i18n.t('label.permissionOrder'), value: 'permissionOrder' },
      { text: i18n.t('label.scheduleOrder'), value: 'scheduleOrder' },
      { text: i18n.t('label.multiOrder'), value: 'multiOrder' },
      { text: i18n.t('label.knowledgeOrder'), value: 'knowledgeOrder' },
      { text: i18n.t('label.lotteryOrder'), value: 'lotteryOrder' },
      { text: i18n.t('label.giftCardOrder'), value: 'giftCardOrder' },
      { text: i18n.t('label.buyerOrder'), value: 'buyerOrder' },
      { text: i18n.t('label.prePayOrder'), value: 'prePayOrder' },
      { text: i18n.t('label.fcodeOrder'), value: 'fcodeOrder' },
      { text: i18n.t('label.discountOrder'), value: 'discountOrder' },
      { text: i18n.t('label.dineinOrder'), value: 'dineinOrder' },
      { text: i18n.t('label.haitaoOrder'), value: 'haitaoOrder' },
      { text: i18n.t('label.pointExchangeOrder'), value: 'pointExchangeOrder' },
      { text: i18n.t('label.communityGroupOrder'), value: 'communityGroupOrder' },
      { text: i18n.t('label.brandOrder'), value: 'brandOrder' },
      { text: i18n.t('label.socialOrder'), value: 'socialOrder' }
    ],
    afterSalesType: 'all',
    afterSalesTypes: [
      { text: i18n.t('label.all'), value: 'all' },
      { text: i18n.t('label.afterSale'), value: 'afterSale' },
      { text: i18n.t('label.endOfAfterSales'), value: 'endOfAfterSales' }
    ],
    orderStatusType: 'all',
    orderStatusTypes: [
      { text: i18n.t('label.all'), value: 'all' },
      { text: i18n.t('label.pendingPayment'), value: 'pendingPayment' },
      { text: i18n.t('label.toBeDelivered'), value: 'toBeDelivered' },
      { text: i18n.t('label.shipped'), value: 'shipped' },
      { text: i18n.t('label.completed'), value: 'completed' },
      { text: i18n.t('label.closed'), value: 'closed' },
      { text: i18n.t('label.afterSale'), value: 'afterSale' },
    ],
    deliveryMethodType: 'all',
    deliveryMethodTypes: [
      { text: i18n.t('label.all'), value: 'all' },
      { text: i18n.t('label.expressDelivery'), value: 'expressDelivery' },
      { text: i18n.t('label.pickup'), value: 'pickup' },
      { text: i18n.t('label.sameCityDelivery'), value: 'sameCityDelivery' },
    ],
    paymentMethodType: 'all',
    paymentMethodTypes: [
      { text: i18n.t('label.all'), value: 'all' },
      { text: i18n.t('label.weChatPay'), value: 'weChatPay' },
      { text: i18n.t('label.weChatPayOwn'), value: 'weChatPayOwn' },
      { text: i18n.t('label.bankCardPayment'), value: 'bankCardPayment' },
      { text: i18n.t('label.alipay-userPay'), value: 'alipay-userPay' },
      { text: i18n.t('label.storedValueCardPayment'), value: 'storedValueCardPayment' },
      { text: i18n.t('label.cashOnDelivery'), value: 'cashOnDelivery' },
      { text: i18n.t('label.findSomebodyToPay'), value: 'findSomebodyToPay' },
      { text: i18n.t('label.giftExchange'), value: 'giftExchange' },
      { text: i18n.t('label.offerRedemption'), value: 'offerRedemption' },
      { text: i18n.t('label.giftCardPayment'), value: 'giftCardPayment' },
      { text: i18n.t('label.combinedPayment'), value: 'combinedPayment' },
      { text: i18n.t('label.installment'), value: 'installment' },
      { text: i18n.t('label.likeChange'), value: 'likeChange' },
      { text: i18n.t('label.huabelPayment'), value: 'huabelPayment' },
      { text: i18n.t('label.alipayfreePayment'), value: 'alipayfreePayment' },
    ],
    premotiongMethodType: 'all',
    premotiongMethodTypes: [
      { text: i18n.t('label.all'), value: 'all' },
      { text: i18n.t('label.subCommissionPromotion'), value: 'subCommissionPromotion' },
      { text: i18n.t('label.threePartyApplicationPromotion'), value: 'threePartyApplicationPromotion' }
    ],
    orderSourceType: 'all',
    orderSourceTypes: [
      { text: i18n.t('label.all'), value: 'all' },
      { text: i18n.t('label.alipay'), value: 'alipay' },
      { text: i18n.t('label.Browser'), value: 'Browser' },
      { text: i18n.t('label.merchantApp'), value: 'merchantApp' },
      { text: i18n.t('label.other'), value: 'other' },
      { text: i18n.t('label.tencentQQ'), value: 'tencentQQ' },
      { text: i18n.t('label.weibo'), value: 'weibo' },
      { text: i18n.t('label.miniProgram'), value: 'miniProgram' },
      { text: i18n.t('label.weChatMall'), value: 'weChatMall' },
      { text: i18n.t('label.likeFeatured'), value: 'likeFeatured' },
      { text: i18n.t('label.loveToShop'), value: 'loveToShop' },
      { text: i18n.t('label.baiduMiniProgram'), value: 'baiduMiniProgram' },
      { text: i18n.t('label.quickWorker'), value: 'quickWorker' },
      { text: i18n.t('label.huya'), value: 'huya' },
      { text: i18n.t('label.momo'), value: 'momo' },
      { text: i18n.t('label.himalaya'), value: 'himalaya' },
      { text: i18n.t('label.guotongXingyixing'), value: 'guotongXingyixing' },
      { text: i18n.t('label.kuGou'), value: 'kuGou' },
      { text: i18n.t('label.inke'), value: 'inke' },
      { text: i18n.t('label.lesPark'), value: 'lesPark' },
      { text: i18n.t('label.knowAlmost'), value: 'knowAlmost' },
      { text: i18n.t('label.fightingFish'), value: 'fightingFish' },
      { text: i18n.t('label.alipay-merchantMiniProgram'), value: 'alipay-merchantMiniProgram' },
      { text: i18n.t('label.qq-businessMiniProgram'), value: 'qq-businessMiniProgram' },
    ],
    addStarsType: 'all',
    addStarsTypes: [
      { text: i18n.t('label.all'), value: 'all' },
      { text: i18n.t('label.starred'), value: 'starred' },
    ],
    tab: null,
    tabItems: [
      i18n.t('label.all'),
      i18n.t('label.pendingPayment'),
      i18n.t('label.toBeDelivered'),
      i18n.t('label.shipped'),
      i18n.t('label.completed'),
      i18n.t('label.closed'),
      i18n.t('label.afterSale'),
    ],
    tabSearch: null,
    tabHeaders: [
      { text: i18n.t('label.product'), value: 'prdt' },
      { text: i18n.t('label.unitPrice'), value: 'unitPrice' },
      { text: i18n.t('label.afterSales'), value: 'afterSales' },
      { text: i18n.t('label.buyer'), value: 'buyer' },
      { text: i18n.t('label.deliveryMethod'), value: 'deliveryMethod' },
      { text: i18n.t('label.RealPrice'), value: 'RealPrice' },
      { text: i18n.t('label.orderStatus'), value: 'orderStatus' },
      { text: i18n.t('label.operate'), value: 'operate' },
    ],
    tabDatas: [],
  }},
  methods: {
    setToday() {
      this.stDate = this.getToday();
      this.edDate = this.getToday();
    },
    setYesterDay() {
      this.stDate = this.getTheDay(-1);
      this.edDate = this.getToday();
    },
    setLast7Days() {
      this.stDate = this.getTheDay(-7);
      this.edDate = this.getToday();
    },
    setLast30Dasys() {
      this.stDate = this.getOneMonthAgo();
      this.edDate = this.getToday();
    },
    getToday() {
      let d = new Date();
      return (d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2)+ "-" + ("0"+(d.getDate())).slice(-2));
    },
    getTheDay(day) {
      let d = new Date();
      return (d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2)+ "-" + ("0"+(d.getDate()+day)).slice(-2));
    },
    getOneMonthAgo(){
      let d = new Date();
      d.setMonth(d.getMonth()-1);
      return (d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2)+ "-" + ("0"+(d.getDate()+1)).slice(-2));
    },
    filterBtn() {

    },
    exportBtn() {

    },
    viewExportList() {

    },
    resetFilter() {

    }
  }
}
</script>

<style scoped>

</style>
