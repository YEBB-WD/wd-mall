<template>
  <div align="center">
    <v-card max-width="98%" flat>
      <v-card>
        <v-toolbar dense flat color="#81D4FA" height="50px" style="font-weight: bold" v-if="isMG()">
          <v-btn text style="font-weight: bold" :href="getSiteLinkUrl()" target="_blank">
            [ {{ siteSeq }} - {{ orderSeq }} ]<br/>{{order_type}}
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
        <!--<v-toolbar dense flat color="#A5D6A7" height="50px" style="font-weight: bold" v-if="!isMG()">-->
        <v-toolbar dense flat color="#B0BEC5" height="50px" style="font-weight: bold" v-if="!isMG()">
          <v-btn text style="font-weight: bold" >
            [ {{ orderSeq }} ]<br/>{{order_type}}
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
        <template v-if="true">
          <v-simple-table dense>
            <thead>
            <tr>
              <th style="text-align: right; width: 130px; background-color: #ECEFF1">
                <span>{{ $i18n.t('label.orderDate') }}</span>
                <v-btn icon small v-if="(!orderDetail)"
                       @click="orderDetail = true">
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
                <v-btn icon small v-if="(orderDetail)"
                       @click="orderDetail = false">
                  <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
              </th>
              <td style="text-align: center; background-color: #ECEFF1; color: blue">
                <span style="font-size: small; font-weight: bold; text-align: center">{{getOrderStats()}}</span>
              </td>
            </tr>
            </thead>
          </v-simple-table>
        </template>
      </v-card>
      <v-card v-if="orderDetail">
        <v-simple-table dense>
          <tr>
            <order-plan-progress
                key-val="Ready"
                key-val2=""
                :progress-value= "getPercent(orderReadyCnt, totalOrderCount)"
                :progress-text="orderReadyCnt + '/' +totalOrderCount"
                background="true"
                p-color="light-blue lighten-4"
            >
            </order-plan-progress>
          </tr>
          <tr>
            <order-plan-progress
                key-val="Start"
                key-val2=""
                :progress-value= "getPercent(orderStartCnt, totalOrderCount)"
                :progress-text="orderStartCnt + '/' +totalOrderCount"
                background="true"
                p-color="light-blue accent-1"
            >
            </order-plan-progress>
          </tr>
          <tr>
            <order-plan-progress
                key-val="Finish"
                key-val2=""
                :progress-value="getPercent(orderFinishCnt, totalOrderCount)"
                :progress-text="orderFinishCnt + '/' +totalOrderCount"
                background="true"
                p-color="success"
            >
            </order-plan-progress>
          </tr>
          <tr>
            <order-plan-progress
                key-val="Ongoing"
                key-val2=""
                :progress-value="getPercent(orderOngoingCnt, totalOrderCount)"
                :progress-text="orderOngoingCnt + '/' +totalOrderCount"
                background="true"
                p-color="info"
            >
            </order-plan-progress>
          </tr>
          <tr>
            <order-plan-progress
                key-val="Error"
                key-val2=""
                :progress-value="getPercent(orderErrorCnt, totalOrderCount)"
                :progress-text="orderErrorCnt + '/' +totalOrderCount"
                background="true"
                p-color="yellow darken-3"
            >
            </order-plan-progress>
          </tr>
        </v-simple-table>
      </v-card>
      <v-divider></v-divider>
      <v-card>
        <template>
          <v-simple-table dense>
            <thead>
            <tr>
              <th style="text-align: right; width: 130px; background-color: #ECEFF1">
                <span>{{$t('label.user_id')}}</span>
                <v-btn icon small v-if="(!orderIdDetail)"
                       @click="orderIdDetail = true">
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
                <v-btn icon small v-if="(orderIdDetail)"
                       @click="orderIdDetail = false">
                  <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
              </th>
              <td style="text-align: center; background-color: #ECEFF1; color: Black">
                <span style="font-size: small; font-weight: bold">{{getOrderIdStatus()}}</span>
              </td>
            </tr>
            </thead>
          </v-simple-table>
        </template>
      </v-card>
      <v-card v-if="orderIdDetail">
        <v-simple-table dense>
          <tr v-for="orderId in orderIds" >
            <div>
              <order-plan-progress
                  :key-val="orderId.user_id"
                  :progress-value="getPercent(orderId.cnt,totalCount)"
                  :progress-text="orderId.cnt + '/' +totalCount"
                  p-color="primary"
              >
              </order-plan-progress>
              <order-plan-progress
                  key-val="Save Amount"
                  key-val2=""
                  :progress-value="getPercent(orderId.save_amt_rest, orderId.total_save_amt_rest)"
                  :progress-text="'₩'+orderId.save_amt_rest"
                  :p-color="getRateColor(getPercent(orderId.save_amt_rest, orderId.total_save_amt_rest), orderId.orderStyle)"
                  background="true"
              >
              </order-plan-progress>
              <order-plan-progress
                  key-val="Gift Amount"
                  key-val2=""
                  :progress-value="getPercent(orderId.gift_amt_rest, orderId.total_gift_amt_rest)"
                  :progress-text="'₩'+orderId.gift_amt_rest"
                  :p-color="getRateColor(getPercent(orderId.gift_amt_rest, orderId.total_gift_amt_rest), orderId.orderStyle)"
                  background="true"
              >
              </order-plan-progress>
            </div>
          </tr>
        </v-simple-table>
      </v-card>
      <v-divider></v-divider>
      <v-card>
        <template>
          <v-simple-table dense>
            <thead>
            <tr align="center">
              <th style="text-align: right; width: 130px; background-color: #ECEFF1">{{$t('label.product')}}
                <v-btn icon small v-if="(!prdtDetail)"
                       @click="prdtDetail = true">
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
                <v-btn icon small v-if="(prdtDetail)"
                       @click="prdtDetail = false">
                  <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
              </th>
              <td style="text-align: center; background-color: #ECEFF1; color: black">
                <span style="font-size: small; font-weight: bold">{{$t('label.total')}} {{$t('label.prdt_cnt')}} ({{ numberWithCommas(totalCount) }}) / Kinds ({{ numberWithCommas(orderPrdts.length) }}) </span>
              </td>
            </tr>
            </thead>
          </v-simple-table>
        </template>
      </v-card>
      <v-card v-if="prdtDetail">
        <br v-if="orderPrdts.length > 0"/>
        <v-simple-table dense>
          <tr v-for="orderPrdt in orderPrdts" v-if="orderPrdt.product_id">
            <template>
              <product-process
                  :prdt="orderPrdt">
              </product-process>
            </template>
          </tr>
        </v-simple-table>
        <br v-if="orderPrdts.length > 0"/>
      </v-card>

      <v-divider></v-divider>
      <v-card>
        <template>
          <v-simple-table dense>
            <thead>
            <tr>
              <th style="text-align: right; width: 130px; background-color: #ECEFF1">
                <span>{{$t('label.orderStatus')}}</span>
                <v-btn icon small v-if="(!orderDash)"
                       @click="orderDash = true">
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
                <v-btn icon small v-if="(orderDash)"
                       @click="orderDash = false">
                  <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
              </th>
              <td style="text-align: center; background-color: #ECEFF1; color: black">
                <span style="font-size: small; font-weight: bold">{{$t('label.prdt_cnt')}}</span>
              </td>
            </tr>
            </thead>
          </v-simple-table>
        </template>
      </v-card>



      <v-divider></v-divider>
      <v-card v-if="orderDash">
        <v-simple-table dense>
          <tr>
            <th>{{$t('label.orderStatus')}} ({{$t('label.prdt_cnt')}})</th>
          </tr>
          <tbody>
          <tr>
            <order-plan-progress
                key-val="Ready"
                :progress-value= "getPercent(readyCount,totalCount)"
                :progress-text="readyCount + '/' +totalCount"
                height="25"
                p-color="primary"
            >
            </order-plan-progress>
          </tr>
          <tr>
            <order-plan-progress
                key-val="Start"
                :progress-value= "getPercent(startCount,totalCount)"
                :progress-text="startCount + '/' +totalCount"
                height="25"
                p-color="primary"
            >
            </order-plan-progress>
          </tr>
          <tr>
            <order-plan-progress
                key-val="Finish"
                :progress-value="getPercent(finishCount,totalCount)"
                :progress-text="finishCount + '/' +totalCount"
                height="25"
                p-color="primary"
            >
            </order-plan-progress>
          </tr>
          <tr>
            <order-plan-progress
                key-val="Ongoing"
                :progress-value="getPercent(ongoingCount,totalCount)"
                :progress-text="ongoingCount + '/' +totalCount"
                height="25"
                p-color="primary"
            >
            </order-plan-progress>
          </tr>
          <tr>
            <order-plan-progress
                key-val="Error"
                :progress-value="getPercent(errorCount,totalCount)"
                :progress-text="errorCount + '/' +totalCount"
                :extend="true"
                p-color="primary"
                height="25"
                @fdetail="errExtend"
            >
            </order-plan-progress>
          </tr>
          <div v-if="errorExtend" >
            <order-plan-progress
                key-val="Out of stock"
                key-val2=""
                err-msg="OutOfStock"
                :progress-value="getPercent(oosErrCnt,totalCount)"
                :progress-text="oosErrCnt + '/' +totalCount"
                height="16"
                background="true"
                errorType="true"
                p-color="primary"
                @btnclick="getbtn"
            >
            </order-plan-progress>
            <order-plan-progress
                key-val="Giftcard"
                key-val2="amount over"
                err-msg="GiftcardAmtOver"
                :progress-value="getPercent(giftoverErrCnt,totalCount)"
                :progress-text="giftoverErrCnt + '/' +totalCount"
                height="16"
                background="true"
                errorType="true"
                p-color="primary"
                @btnclick="getbtn"
            >
            </order-plan-progress>
            <order-plan-progress
                key-val="AirCargo/"
                key-val2="EMS error"
                err-msg="AirCargoEmsError"
                :progress-value="getPercent(emsErrCnt,totalCount)"
                :progress-text="emsErrCnt + '/' +totalCount"
                height="16"
                background="true"
                errorType="true"
                p-color="primary"
                @btnclick="getbtn"
            >
            </order-plan-progress>
            <order-plan-progress
                key-val="Flight code"
                key-val2="error"
                err-msg="FlightCodeError"
                :progress-value="getPercent(fltErrCnt,totalCount)"
                :progress-text="fltErrCnt + '/' +totalCount"
                height="16"
                background="true"
                errorType="true"
                p-color="primary"
                @btnclick="getbtn"
            >
            </order-plan-progress>
            <order-plan-progress
                key-val="Quota limit"
                key-val2="error"
                err-msg="QuotaLimitError"
                :progress-value="getPercent(quotyErrCnt,totalCount)"
                :progress-text="quotyErrCnt + '/' +totalCount"
                height="16"
                background="true"
                errorType="true"
                p-color="primary"
                @btnclick="getbtn"
            >
            </order-plan-progress>
            <order-plan-progress
                key-val="No"
                key-val2="Product ID"
                err-msg="NoProducetID"
                :progress-value="getPercent(noPidErrCnt,totalCount)"
                :progress-text="noPidErrCnt + '/' +totalCount"
                height="16"
                background="true"
                errorType="true"
                p-color="primary"
                @btnclick="getbtn"
            >
            </order-plan-progress>
            <order-plan-progress
                key-val="Payment"
                key-val2="error"
                err-msg="PaymentError"
                :progress-value="getPercent(payErrCnt,totalCount)"
                :progress-text="payErrCnt + '/' +totalCount"
                height="16"
                background="true"
                errorType="true"
                p-color="primary"
                @btnclick="getbtn"
            >
            </order-plan-progress>
            <order-plan-progress
                key-val="System"
                key-val2="error"
                err-msg="SystemError"
                :progress-value="getPercent(sysErrCnt,totalCount)"
                :progress-text="sysErrCnt + '/' +totalCount"
                height="16"
                background="true"
                errorType="true"
                p-color="primary"
                @btnclick="getbtn"
            >
            </order-plan-progress>

          </div>

          </tbody>
        </v-simple-table>
      </v-card>
      <v-card v-if="orderDash">
        <v-simple-table dense>
          <thead>
          <tr>
            <th colspan="2">{{$t('label.cancelStatus')}} ({{$t('label.prdt_cnt')}})</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <order-plan-progress
                key-val="C.Ready"
                :progress-value="getPercent(CancelReadyCount, totalCount)"
                :progress-text="CancelReadyCount + '/' +totalCount"
                striped="true"
                p-color="primary"
            >
            </order-plan-progress>
          </tr>
          <tr>
            <order-plan-progress
                key-val="C.Finish"
                :progress-value="getPercent(CancelFinishCount, totalCount)"
                :progress-text="CancelFinishCount + '/' +totalCount"
                height="25"
                p-color="primary"
            >
            </order-plan-progress>
          </tr>
          <tr>
            <order-plan-progress
                key-val="C.Ongoing"
                :progress-value="getPercent(CancelOngoingCount, totalCount)"
                :progress-text="CancelOngoingCount + '/' +totalCount"
                striped="true"
                p-color="primary"
            >
            </order-plan-progress>
          </tr>
          <tr>
            <order-plan-progress
                key-val="C.Error"
                :progress-value="getPercent(CancelErrorCount, totalCount)"
                :progress-text="CancelErrorCount + '/' +totalCount"
                striped="true"
                p-color="primary"
            >
            </order-plan-progress>
          </tr>
          </tbody>
        </v-simple-table>
        <v-dialog v-model="errorDialog" max-width="500px">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">{{$t('label.confirm')}}</v-btn>
                </v-row>
                <v-row dense>
                  <v-col cols="5">
                    <v-text-field readonly dense v-model="logD.logStatus" label="status"></v-text-field>
                  </v-col>
                  <v-col cols="7">
                    <v-text-field readonly dense v-model="logD.logLog_id" label="log_id"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field readonly dense v-model="logD.logOrder_seq" label="order_seq"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field readonly dense v-model="logD.logPlan_seq" label="plan_seq"></v-text-field>
                  </v-col>
                </v-row>
                <v-simple-table dense>
                  <tbody>
                  <tr>
                    <th>User ID</th>
                    <td>{{logD.user_id}}</td>
                  </tr>
                  <tr>
                    <th>Product Code</th>
                    <td>{{logD.prdt_id}}</td>
                  </tr>
                  <tr>
                    <th>Message</th>
                    <td>{{logD.message}}</td>
                  </tr>
                  <tr>
                    <th>Return Code</th>
                    <td>{{logD.retCode}}</td>
                  </tr>
                  </tbody>
                </v-simple-table>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">{{$t('label.confirm')}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-overlay :value="loadingdialog">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-card>
      <br/>
    </v-card>
  </div>
</template>

<script>
import i18n from '@/i18n'
import OrderPlanProgress from "./OrderPlanProgress";
import ProductProcess from "./ProductProcess";
export default {
  name: "OrderStatus",
  components: {
    OrderPlanProgress,
    ProductProcess
  },
  model: {
    prop: 'selectSeq',
    event: 'change'
  },
  props: {
    siteSeq: {
      types: String,
      default: 'orddb'
    },
    selectSeq: {
      types: String,
      default: null
    }
  },
  data () { return {
    orderDash: false,
    order_type: '',
    prdtInfo: {},
    chlinkurl: 'http://cn.ssgdfm.com/shop/product/productDetail?prdtCode=',
    chmlinkurl: 'http://mcn.ssgdfm.com/shop/product/productDetail?prdtCode=',
    linkurl: 'http://www.ssgdfm.com/shop/product/productDetail?prdtCode=',
    mlinkurl: 'http://m.ssgdfm.com/shop/product/productDetail?prdtCode=',
    prdtDialog: false,
    startTime: 0,
    updateTime: 0,
    prdtDetail: true,
    active: false,
    orderSeq: null,
    loadingdialog: false,
    polling: null,
    timeCounter: 3, //3초
    orderDetail: false,
    totalOrderCount: 0,
    totalOrderBuyPrice: 0,
    orderReadyCnt: 0,
    orderStartCnt: 0,
    orderFinishCnt: 0,
    orderOngoingCnt: 0,
    orderErrorCnt: 0,
    orderIdDetail: false,
    orderIds: [],
    orderPrdts: [],
    totalCount: 0,
    readyCount: 0,
    startCount: 0,
    finishCount: 0,
    ongoingCount: 0,
    errorCount: 0,
    oosErrCnt: 0,
    emsErrCnt: 0,
    fltErrCnt: 0,
    giftoverErrCnt: 0,
    quotyErrCnt: 0,
    noPidErrCnt: 0,
    payErrCnt: 0,
    sysErrCnt: 0,
    errorDialog: false,
    finishExtend: false,
    errorExtend: false,
    CancelReadyCount: 0,
    CancelFinishCount:0,
    CancelOngoingCount: 0,
    CancelErrorCount: 0,
    logD: {},
    detailStatus: [
      { text: 'Ready', value: '000090' },
      { text: 'Start', value: '000000' },
      { text: 'Ongoing', value: '000001' },
      { text: 'Login Err', value: '000011' },
      { text: 'Finish', value: '000099' },
      { text: 'No Stock1', value: '000002' },
      { text: 'No Stock1', value: '000022' },
      { text: 'FltCode Err', value: '000003' },
      { text: 'EMS Err', value: '000004' },
      { text: 'GiftCard Empty', value: '000005' },
      { text: 'Qty Limit', value: '000006' },
      { text: 'NoOrderID', value: '000007' },
      { text: 'OrderErr', value: '000008' },
      { text: 'Amount Err', value: '000009' },
      { text: 'Payment Err', value: '000010' },
      { text: 'No Order Num', value: '000027' },
      { text: 'Net Err', value: '000070' },
      { text: 'Unknown Err', value: '000080' },
      { text: 'Cancel Ready', value: '000100' },
      { text: 'Cancel Ongoing', value: '000101' },
      { text: 'OrderNum Err', value: '000102' },
      { text: 'Timeout Err', value: '000103' },
      { text: 'Net Err', value: '000170' },
      { text: 'Unknown Err', value: '000180' },
      { text: 'Canceled', value: '000199' },
      { text: 'No P.ID', value: '000202' },
      { text: 'P.ID Wrong', value: '000203' },
      { text: 'Upload Err', value: '000280' },
    ],
    orderStyle: ['init','T1','T2','T3','error'],
    dgOrderTyps: [
      'DGFRONT', 'DGSPECIAL'
    ],
  }},
  methods: {
    getOrderStats() {
      return i18n.t('label.order_cnt') + "(" + this.numberWithCommas(this.totalOrderCount) + "), " + i18n.t('label.purchasePrice') + "($"+ this.numberWithCommas(this.totalOrderBuyPrice)+") "
    },
    numberWithCommas(x) {
      if(x==undefined) x = '0'
      if(String(x).indexOf('.') > -1) x = Number(x).toFixed(2)
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getPercent(val, total){
      if(total == 0 || total == null) return 0
      return Number(((Number(val)/Number(total))*100).toFixed(2))
    },
    getOrderIdStatus() {
      return i18n.t('label.user_id') + i18n.t('label.quantity')+"("+ this.numberWithCommas(this.orderIds.length)+")"
    },
    getRateColor(rate, style){
      if(style == this.orderStyle[4]) {
        return 'purple'
      }

      if(rate>30) {
        return 'primary'
      } else if(rate > 10){
        return 'orange'
      } else{
        return 'red'
      }
    },
    errExtend(fetail) {
      this.errorExtend = fetail
    },
    getbtn(btnclick) {
      let errorCode = ''
      if (btnclick == "Out of stock") {
        errorCode = 'OutOfStock'
      } else if (btnclick == "Giftcard") {
        errorCode = 'GiftcardAmtOver'
      } else if (btnclick == "AirCargo/") {
        errorCode = 'AirCargoEmsError'
      } else if (btnclick == "Flight code") {
        errorCode = 'FlightCodeError'
      } else if (btnclick == "Quota limit") {
        errorCode = 'QuotaLimitError'
      } else if (btnclick == "No") {
        errorCode = 'NoProducetID'
      } else if (btnclick == "Payment") {
        errorCode = 'PaymentError'
      } else if (btnclick == "System") {
        errorCode = 'SystemError'
      }
      this.errorDialog = true
      this.getDetailInfo(this.siteSeq, this.orderSeq, errorCode)
    },
    getDetailInfo(site_seq, order_seq, error){
      this.$axios.get('/order/dashErrorDetail', {
        params: {
          site_seq: site_seq,
          order_seq: order_seq,
          status: error
        }
      }).then((response) => {
        console.log(response.data)
        let detail = response.data[0];

        if(detail){
          let logDetail = JSON.parse(detail.log)

          let logs = {
            logStatus: this.dispDetail(detail.status),
            logOrder_seq: detail.order_seq,
            logPlan_seq: detail.plan_seq,
            logLog_id: detail.log_id,
            user_id: logDetail.userId,
            prdt_id: logDetail.prdtCode,
            message: logDetail.retMessage,
            retCode: logDetail.retCode
          }
          this.logD = logs
        } else {
          this.errorDialog = false
          // alert("Not exist Log Data in DB")
        }

      })
    },
    dispDetail(error) {
      if(error.length < 1) return ''
      let detail = this.detailStatus.find( (element) => {
        if(element.value == error ) return element
      })

      if(detail)
        return detail.text
      return error
    },
    start() { // 1초에 한번씩 start 호출
      this.polling = setInterval(() => {
        this.timeCounter--   //1찍 감소
        if (this.timeCounter <= 0) {
          this.execute()
          this.timeCounter = 3
        }
      }, 1000)
    },
    execute() {
      this.getStatusSeqSite(this.selectSeq, this.siteSeq)
    },
    timeStop() {
      clearInterval(this.polling)
    },
    getStatusSeqSite(seq,op_site) {
      let siteInfo = {
        site: op_site,
        active: false
      }
      if(seq=='') seq = null
      this.$axios.get('/order/procstatusSeqSite', {
      // this.$axios.post('/order/procstatusSeqSite', {
        params: {
          order_seq: seq,
          op_site: op_site
        }
      }).then((response) => {
        let result = response.data;
        if(result.length > 0) {
          //if(Number(this.getTodaySeq()) <= result[0]['order_seq']){
          siteInfo.active = true
          if(typeof result === 'string'){
            result = JSON.parse(result)
          }

          this.updateStatus(result)
          //}
          //else
          //  siteInfo.active = false

          this.$emit('active',siteInfo)
        }

        // console.log(op_site+" >>> " + response.data)
      }).catch(error => {
        this.$emit('active',siteInfo)
        console.log(op_site + " >>> " + { error });
      })
      this.loadingdialog = false
    },
    updateStatus(result) {
      // this.startTime = 0
      // this.updateTime = 0

      let total_plan_count = 0
      let total_buy_price =0
      let tot_process_count = 0
      let orderIds = []
      let orderPrdts = []

      let orderReady = 0
      let orderStart = 0
      let orderFinish = 0
      let orderOngoing = 0
      let orderError = 0

      let ready = 0
      let success = 0
      let cancelReady = 0
      let cancelSuccess = 0
      let cancelProcess = 0
      let process = 0
      let start = 0

      let outOfBStock = 0
      let flightCode = 0
      let emsError = 0
      let dfs = 0
      let orderQutyLimit = 0
      let netError = 0
      let unknown = 0
      let cnetError = 0
      let cunknown = 0
      let noPrdtcode = 0
      let uploadErr = 0

      let NoOrderID = 0  //# 000007
      let NoOrderNum = 0 // # 000027
      let OrderError = 0  //# 000008
      let PaymentAmountError = 0 //# 000009
      let PaymentError = 0 //# 000010
      let PrdtIDWrong = 0 //# 000203
      let updateTime = 0

      let order_seq = ''
      let order_type = ''

      result.forEach((row) => {
        let status  = row['status']
        let p_count = row['p_count']
        order_seq = row['order_seq']
        let userId = row['user_id']
        let buy_price = row['buy_price_dol']
        tot_process_count += p_count
        let prdtId = row['product_id']
        let prdtName = row['prdt_name']
        let giftAmtRest = row['gift_amt_rest']
        let saveAmtRest = row['save_amt_rest']
        let datetime = row['datetime']
        let prdt_img = row['prdt_img']
        let brand_name = row['brand_name']
        let ref_num = row['ref_num']
        let prdt_link = row['prdt_link']
        order_type = row['order_type']
        let store = row['store']

        if(this.isDGType(row['order_type'])) {
          saveAmtRest += row['plus_save_amt']
        }

        total_plan_count++
        total_buy_price += buy_price

        updateTime = datetime

        if((status == "000099")||(status == "000199")) {
          orderFinish++
        } else if((status=="000090")|| (status == "000190")) {
          orderReady++
        } else if((status=="000000") || (status=="000100")) {
          orderStart++
        } else if((status=="000001") || (status=="000101")) {
          orderOngoing++
        } else  {
          orderError++
        }

        let userIdx = orderIds.findIndex((st)=>(st.user_id == userId))
        if(userIdx == -1){
          let id = {
            user_id: userId,
            cnt: 0,
            save_amt_rest: saveAmtRest,
            gift_amt_rest: giftAmtRest,
            total_save_amt_rest: saveAmtRest,
            total_gift_amt_rest: giftAmtRest,
            order_style: this.orderStyle[0]
          }
          if((status == "000099")||(status == "000199")){
            id.cnt+=p_count
            id.save_amt_rest = Math.min(id.save_amt_rest, saveAmtRest)
            id.gift_amt_rest = Math.min(id.gift_amt_rest, giftAmtRest)
            if(id.order_style == this.orderStyle[0]) {
              if( (id.total_save_amt_rest != id.save_amt_rest) && (id.total_gift_amt_rest == id.gift_amt_rest) ) {
                id.order_style = this.orderStyle[1]
              } else if ( (id.total_save_amt_rest == id.save_amt_rest) && (id.total_gift_amt_rest != id.gift_amt_rest) ) {
                id.order_style = this.orderStyle[2]
              } else if ( (id.total_save_amt_rest != id.save_amt_rest) && (id.total_gift_amt_rest != id.gift_amt_rest) ) {
                id.order_style = this.orderStyle[3]
              }
            } else if (id.order_style != this.orderStyle[4]) {  // not Error
              if( (id.order_style == this.orderStyle[1]) && (id.total_gift_amt_rest != id.gift_amt_rest) ) {
                id.order_style = this.orderStyle[4]
              } else if ((id.order_style == this.orderStyle[2]) && (id.total_save_amt_rest != id.save_amt_rest) ) {
                id.order_style = this.orderStyle[4]
              }
            }
          }
          orderIds.push(id)
        } else {
          if((status == "000099")||(status == "000199")){
            orderIds[userIdx].cnt+=p_count
            orderIds[userIdx].save_amt_rest = Math.min(orderIds[userIdx].save_amt_rest, saveAmtRest)
            orderIds[userIdx].gift_amt_rest = Math.min(orderIds[userIdx].gift_amt_rest, giftAmtRest)
          }
        }

        let prdtIdx = orderPrdts.findIndex((st) => (st.product_id == prdtId))
        if(prdtIdx == -1) {
          let prdt = {
            product_id: prdtId,
            prdt_name: prdtName,
            cnt : 0,
            prdt_img: prdt_img,
            brand_name: brand_name,
            total_count: p_count,
            ref_num: ref_num,
            prdt_link: prdt_link,
            store: store
          }

          if(status == "000099"){
            prdt.cnt+= p_count
          }
          orderPrdts.push(prdt)
        } else {
          orderPrdts[prdtIdx].total_count+= p_count
          if(status == "000099"){
            orderPrdts[prdtIdx].cnt+= p_count
          }
        }

        if ((status == "000002") || ( status == "000022")) {
          outOfBStock += p_count
        } else if(status == "000000") {
          start +=  p_count
        } else if(status == "000099") {
          success +=  p_count
        } else if(status == "000100") {
          cancelReady +=  p_count
        } else if(status == "000199") {
          cancelSuccess += p_count
        } else if(status == "000101") {
          cancelProcess += p_count
        } else if(status == "000001") {
          process += p_count
        } else if(status == "000090") {
          ready += p_count
        } else if(status == "000003") {
          flightCode += p_count
        } else if(status == "000004") {
          emsError += p_count
        } else if(status == "000005") {
          dfs += p_count
        } else if(status == "000006") {
          orderQutyLimit += p_count
        } else if(status == "000070") {
          netError += p_count
        } else if(status == "000170") {
          cnetError += p_count
        } else if(status == "000180") {
          cunknown += p_count
        } else if(status == "000007") {
          NoOrderID += p_count
        } else if(status == "000027") {
          NoOrderNum += p_count
        } else if(status == "000008") {
          OrderError += p_count
        } else if(status == "000009") {
          PaymentAmountError += p_count
        } else if(status == "000010") {
          PaymentError += p_count
        } else if(status == "000203") {
          PrdtIDWrong += p_count
        } else if(status == "000202") {
          noPrdtcode += p_count
        } else {
          unknown += p_count
        }
      })


      this.totalCount = tot_process_count
      this.finishCount = success
      this.readyCount = ready
      this.startCount = start
      this.ongoingCount = process
      this.errorCount = flightCode + emsError + dfs + orderQutyLimit + netError + NoOrderID + NoOrderNum + outOfBStock
          + OrderError + PaymentAmountError + PaymentError + PrdtIDWrong +  noPrdtcode + unknown
      this.CancelFinishCount = cancelSuccess
      this.CancelReadyCount = cancelReady
      this.CancelOngoingCount = cancelProcess
      this.CancelErrorCount = cnetError

      this.oosErrCnt = outOfBStock
      this.giftoverErrCnt = dfs
      this.emsErrCnt = emsError
      this.noPidErrCnt = noPrdtcode
      this.fltErrCnt = flightCode
      this.quotyErrCnt = orderQutyLimit
      this.payErrCnt = PaymentError + OrderError + PaymentAmountError
      this.sysErrCnt = netError + unknown

      this.$emit('orderSeq', order_seq)
      this.orderSeq = order_seq
      this.orderIds = orderIds
      this.totalOrderCount = total_plan_count
      this.orderPrdts = orderPrdts
      this.totalOrderBuyPrice = total_buy_price

      this.orderReadyCnt = orderReady
      this.orderStartCnt = orderStart
      this.orderFinishCnt = orderFinish
      this.orderOngoingCnt = orderOngoing
      this.orderErrorCnt = orderError

      // if(this.startTime==0) this.startTime = updateTime
      // this.updateTime = updateTime
      console.log("updateTime : " + updateTime)
      console.log("this.startTime :" + this.startTime)
      console.log("this.updateTime :" + this.updateTime)
      console.log("(this.updateTime < updateTime)?" + this.compareTimeString(updateTime,this.updateTime))
      console.log("(this.startTime > updateTime)?" + this.compareTimeString(this.startTime, updateTime))

      if(this.updateTime==0)
        this.updateTime = updateTime
      else
        this.updateTime = (this.compareTimeString(updateTime,this.updateTime))? updateTime : this.updateTime
      if(this.startTime==0)
        this.startTime = updateTime
      else
        this.startTime = (this.compareTimeString(this.startTime, updateTime))? updateTime : this.startTime

      this.order_type = order_type
    },
    compareTimeString( dataA, dataB) {
      let A = new Date(dataA).getTime()
      let B = new Date(dataB).getTime()
      if(A > B) return true
      else return false
    },
    getToday() {
      let d = new Date();
      return (d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2)+ "-" + ("0"+(d.getDate())).slice(-2));
    },
    getTodaySeq() {
      let today = this.getToday()
      return String(today.slice(2).replace(/-/g,''))+'00'
    },
    close () {
      this.logD = {}
      this.errorDialog = false
      console.log('Dialog closed')
    },
    isMG() {
      return ((this.siteSeq.indexOf('u') > -1) || (this.siteSeq.indexOf('m') > -1))
    },
    popup(orderPrdt) {
      this.prdtInfo = orderPrdt
      this.prdtDialog = true
    },
    getLinkUrl(item, site) {
      if(site == "KO") {
        if(item){
          if( this.isMobile() ) {
            // it's mobile
            if(item.prdt_link)
              return this.mlinkurl + item.prdt_link
            else
              return this.mlinkurl + item.product_id
          } else {
            if(item.prdt_link)
              return this.linkurl + item.prdt_link
            else
              return this.linkurl + item.product_id
          }
        }
      } else {  //ZH
        if(item){
          if( this.isMobile() ) {
            // it's mobile
            if(item.prdt_link)
              return this.chmlinkurl + item.prdt_link
            else
              return this.chmlinkurl + item.product_id
          } else {
            if(item.prdt_link)
              return this.chlinkurl + item.prdt_link
            else
              return this.chlinkurl + item.product_id
          }
        }
      }
      return ''
    },
    isMobile(){
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    },
    getSiteLinkUrl() {
      /*let url =  '.specialdg.com'
      if(this.siteSeq == 'u0') return 'http://www.wdplatform.com'
      return 'http://'+ this.siteSeq + url*/
    },
    async updatePrdt(prdt){
      if(prdt.ref_num) {
        let prj = await this.getPrdtInfo(prdt.ref_num)
        prdt.product_id =  prj.prdt_id
        prdt.prdt_img = prj.prdt_img
      }
      return prdt
    },
    getPrdtInfo(ref_num) {
      let prdt = this.$axios.get('/common/getPrdtInfoWRefNum', {
        params: {
          ref_num: ref_num
        }
      }).then((response) => {
        let result = response.data;
        console.log(result)
        return result[0]
      })
      return prdt
    },
    isDGType(status) {
      let idx = this.dgOrderTyps.indexOf(status)
      if(idx < 0) return false;
      return true;
    }
  },
  created() {
    this.start()
  },
  mounted() {
    this.getStatusSeqSite(this.selectSeq, this.siteSeq)
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
}
</script>

<style scoped>

</style>
