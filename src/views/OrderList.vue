<template>
  <div class="orderlist">
    <v-card max-width="98%" flat>
      <v-card-title>
        <span style="font-size: small" v-if="!isDetailView">Sequence : {{ convertDispSeq(lastSeq) }}
        <br/>
        <v-btn text small readonly v-if="getvisiable()">
            Run Schedule ({{ orderDate }})
            <br/>
            [{{ orderStTime }} ~ {{ orderEdTime }}]
        </v-btn>
          <br/>
          <v-container
              class="px-0"
              fluid
          >
            <v-switch
                v-model="imgview"
                :label="`Image: ${(imgview)? $i18n.t('label.shown') : $i18n.t('label.hidden')}`"
            ></v-switch>
          </v-container>
        </span>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="$i18n.t('label.search')"
            single-line
            hide-details
            style="max-width: 120px"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn x-small @click="excelDownload"
               style="font-weight: bold; min-height: 30px" color="primary">
          <span>{{$t('label.export')}}</span>
        </v-btn>
      </v-card-title>
      <v-data-table
          dense
          :headers="headers"
          :items="orderdatas"
          mobile-breakpoint="0"
          item-key="plan_seq"
          v-model="selected"
          :search="search"
          show-select
          group-by="YZ"
      >
        <template v-slot:item.prdt_img="{ item }">
          <div v-if="imgview">
            <v-img :src="item.prdt_img" max-width="60px" @click="viewDetail(item)" v-if="item.prdt_img"></v-img>
            <v-img :src="notfoundimg" max-width="50px" v-else></v-img>
          </div>
          <div v-else>
            <v-icon>mdi-gift</v-icon>
          </div>
        </template>
        <template v-slot:item.progress="{ item }">
          <div v-if="isRoate(item.status, item.order_type)">
            <v-progress-circular
                :width="3"
                color="blue"
                indeterminate
            ></v-progress-circular>
          </div>
          <div v-else-if="checkStatus(item.status)=='Ready'">
            <v-icon>mdi-coffee</v-icon>
          </div>
          <div v-else-if="checkStatus(item.status)=='Ongoing'">
            <v-icon color="blue">mdi-run-fast</v-icon>
          </div>
          <div v-else-if="checkStatus(item.status)=='Finish'">
            <v-icon color="green">mdi-check-bold</v-icon>
          </div>
          <div v-else-if="checkStatus(item.status)=='Error'">
            <v-icon color="red">mdi-alert-octagram</v-icon>
          </div>
        </template>
        <template v-slot:item.status="{ item }">
          {{ getStatus(item.status) }}
        </template>
        <template v-slot:item.s_order_start="{ item }">
          <div v-if="item.s_order_yn=='Y'">
            {{ item.s_order_start }}
          </div>
        </template>
        <template v-slot:item.s_order_end="{ item }">
          <div v-if="item.s_order_yn=='Y'">
            {{ item.s_order_end }}
          </div>
        </template>
        <template v-slot:item.api_res="{ item }">
          {{ getApiResStatus(item.api_res) }}
        </template>
        <template v-slot:item.order_seq="{ item }">
          {{ (String(item.order_seq)).slice(-2) }}
        </template>
        <template v-slot:item.exit_dt="{ item }">
          {{ getExitDtVal(item.exit_dt) }}
        </template>
        <template v-slot:item.datetime="{ item }">
          {{ getTime(item.datetime) }}
        </template>
        <template v-slot:item.prdt_name="{ item }">
          <span class="d-inline-block text-truncate" style="max-width: 250px; ">
            {{ item.prdt_name }}
          </span>
        </template>
        <template v-slot:item.list_price="{ item }">
          {{ numberWithCommas(item.list_price) }}
        </template>
        <template v-slot:item.buy_price_dol="{ item }">
          {{ numberWithCommas(item.buy_price_dol) }}
        </template>
        <template v-slot:item.d_rate="{ item }">
          {{ numberWithCommas(item.d_rate) }}
        </template>
        <template v-slot:top>
          <v-dialog v-model="imageDetail" max-width="500px">
            <v-card>
              <v-row align="center" justify="center" dense>
                <v-img
                    :src="detailInfo.prdt_img"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="300px"
                    crossOrigin="anonymous"
                    v-if="(detailInfo.prdt_img && detailInfo.prdt_img!='None')"
                ></v-img>
                <v-img
                    :src="notfoundimg"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="250px"
                    crossOrigin="anonymous"
                    v-else
                ></v-img>
              </v-row>
              <v-row align="center" justify="end" dense>
                <h6>{{$t('label.urlLink')}}</h6>
                <pre>&nbsp;&nbsp;</pre>
                <v-btn-toggle
                    color="deep-purple accent-3"
                >
                  <v-btn x-small dark style="font-weight: bold; background-color: dodgerblue" :href="getLinkUrl(detailInfo, 'KO' )" target="_blank">
                    KR
                  </v-btn>
                  <v-btn x-small dark style="font-weight: bold; background-color: red" :href="getLinkUrl(detailInfo, 'ZH')" target="_blank">
                    CN
                  </v-btn>
                </v-btn-toggle>
                <pre>&nbsp;&nbsp;&nbsp;</pre>
              </v-row>
              <v-row align="center" justify="center" dense>
                <v-col cols="8" >
                  <v-text-field style="font-size: small" dense readonly v-model="detailInfo.brand_name" :label="$t('label.brand_name')"></v-text-field>
                </v-col>
                <v-col cols="8" >
                  <v-text-field style="font-size: small" dense readonly v-model="detailInfo.prdt_name" :label="$t('label.prdt_name')"></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">{{$t('label.confirm')}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import i18n from "@/i18n";
import XLSX from 'xlsx'

export default {
  name: "OrderList",
  model: {
    prop: 'lastSeq',
    event: 'change'
  },
  props: {
    lastSeq: {
      type: Number,
      default: null
    }
  },
  data() { return {
    imgview: false,
    editdialog: false,
    isDetailView: false,
    search: '',
    headers: [
      { text: i18n.t('label.image'), value: 'prdt_img' },
      { text: i18n.t('label.progress'), value: 'progress'},
      { text: i18n.t('label.status'), value: 'status'},
      { text: i18n.t('label.orderTime'), value: 'datetime'},
      { text: i18n.t('label.scheduled_start_time'), value: 's_order_start'},
      { text: i18n.t('label.scheduled_end_time'), value: 's_order_end'},
      { text: 'Order Number', value: 'order_num'},
      { text: i18n.t('label.user_id'), value: 'user_id'},
      { text: i18n.t('label.brand_name'), value: 'brand_name'},
      { text: i18n.t('label.store'), value: 'store'},
      { text: 'Ref_No.', value: 'ref_num'},
      { text: 'P.ID', value: 'product_id'},
      { text: 'EMS', value: 'ems_yn'},
      { text: i18n.t('label.prdt_name'), value: 'prdt_name'},
      { text: i18n.t('label.order_cnt'), value: 'p_count'},
      { text: i18n.t('label.prdt_price'), value: 'prdt_price'},
      { text: i18n.t('label.list_price'), value: 'list_price'},
      { text: i18n.t('label.buy_price'), value: 'buy_price_dol'},
      { text: i18n.t('label.d_rate'), value: 'd_rate' },
      { text: i18n.t('label.save_amt'), value: 'save_amt' },
      { text: i18n.t('label.gift_amt'), value: 'gift_amt' },
      { text: i18n.t('label.p_count_limit'), value: 'p_count_limit'},
      { text: i18n.t('label.exit_dt'), value: 'exit_dt'},
      { text: i18n.t('label.exit_time'), value: 'exit_time'},
      { text: i18n.t('label.flt_code'), value: 'flt_code'},
      { text: i18n.t('label.order_type'), value: 'order_type'},
      { text: 'Plan Seq.', value: 'plan_seq'},
    ],
    orderdatas: [],
    selected: [],
    imageDetail: false,
    detailInfo : {},
    chlinkurl: 'http://cn.ssgdfm.com/shop/product/productDetail?prdtCode=',
    chmlinkurl: 'http://mcn.ssgdfm.com/shop/product/productDetail?prdtCode=',
    linkurl: 'http://www.ssgdfm.com/shop/product/productDetail?prdtCode=',
    mlinkurl: 'http://m.ssgdfm.com/shop/product/productDetail?prdtCode=',
    notfoundimg: 'http://www.madeinmacau.net/images/No_Image_Available.jpg',
    editedItem: {
      // product_id, EMS, 수량, 출국일제한, 출국일, 출국시간, 편명/항편, 주문유형, 주문ID, Password
    },
    polling: null,
    timeCounter : 0, //3초
    allData: [],
    finishData: [],
    notfineData: [],
    cardEmptyData: [],
    noStockData: [],
    cancelData: [],
    errorData: [],
    ongoingData: [],
    tabValue: {
      'ALL': 0,
      'Ongoing': 0,
      'Finish': 0,
      'Canceled': 0,
      'Not Finish': 0,
      'Error': 0
    },
    siteSeq: 'orddb',
    apiResStatus: [
      { text: 'Start', value: '000000' },
      { text: 'Ongoing', value: '000001' },
      { text: 'Temp. No Stock', value: '000002' },
      { text: 'FltCode Err', value: '000003' },
      { text: 'EMS Err', value: '000004' },
      { text: 'GiftCard Empty', value: '000005' },
      { text: 'Qty Limit', value: '000006' },
      { text: 'No OrderID', value: '000007' },
      { text: 'OrderErr', value: '000008' },
      { text: 'Amount Err', value: '000009' },
      { text: 'Payment Err', value: '000010' },
      { text: 'Login Err', value: '000011' },
      { text: 'No Stock', value: '000022' },
      { text: 'No Order Num', value: '000027' },
      { text: 'System Busy', value: '000052' },
      { text: 'Delivery Warn', value: '000054' },
      { text: 'Payment Error', value: '000055' },
      { text: 'No Active OrderID', value: '000057' },
      { text: 'Order Timeout', value: '000058' },
      { text: 'Order Mismatch', value: '000059' },
      { text: 'Net Err', value: '000070' },
      { text: 'Unknown Err', value: '000080' },
      { text: 'Ready', value: '000090' },
      { text: i18n.t('label.orderCompleted'), value: '000099' },
      { text: 'Cancel Ready', value: '000100' },
      { text: 'Cancel Ongoing', value: '000101' },
      { text: 'OrderNum Err', value: '000102' },
      { text: 'Timeout Err', value: '000103' },
      { text: 'Net Err', value: '000170' },
      { text: 'Unknown Err', value: '000180' },
      { text: 'Cancel Ready', value: '000190' },
      { text: i18n.t('label.prdtCanceled'), value: '000199' },
      { text: 'No P.ID', value: '000202' },
      { text: 'P.ID Wrong', value: '000203' },
      { text: 'Upload Err', value: '000280' },
      { text: i18n.t('label.prdtReady'), value: '000299' },
      { text: i18n.t('label.customerPreparation'), value: '000399' },
      { text: i18n.t('label.inTransit'), value: '000499' },
      { text: i18n.t('label.deliveryCenter'), value: '000599' },
      { text: i18n.t('label.prdtDelivered'), value: '000699' },
      { text: i18n.t('label.prdtNotDelivered'), value: '000799' },
      { text: i18n.t('label.reEntry'), value: '000899' },
      { text: i18n.t('label.prdtPaymentFail'), value: '000999' },
      { text: i18n.t('label.completedEMSReg'), value: '001099' },
    ],
    detailStatus: [
      { text: 'ALL', value: '' },
      { text: 'Ready', value: '000090' },
      { text: 'Start', value: '000000' },
      { text: 'Ongoing', value: '000001' },
      { text: 'Login Err', value: '000011' },
      { text: 'Finish', value: '000099' },
      { text: 'Temp. No Stock', value: '000002' },
      { text: 'No Stock', value: '000022' },
      { text: 'FltCode Err', value: '000003' },
      { text: 'EMS Err', value: '000004' },
      { text: 'GiftCard Empty', value: '000005' },
      { text: 'Qty Limit', value: '000006' },
      { text: 'No OrderID', value: '000007' },
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
    dontNeedStop: [
      '000090', '000099', '000199', '000202'
    ],
    dgOrderTyps: [
      'DGFRONT', 'DGSPECIAL'
    ],

  }},
  methods: {
    convertDispSeq(seq) {
      // this.setdataValues(this.tabTiles[this.tab])
      if(seq)
        return "20"+ String(seq).substring(0,2)+"/"+String(seq).substring(2,4)+"/"+String(seq).substring(4,6)+"-"+String(seq).substring(6)
      return ''
    },
    viewDetail(item) {
      this.imageDetail = true
      this.detailInfo = item
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
    getStatus(status) {
      let val = this.detailStatus.find(a => a.value == status)
      if(val) return val.text
      return status
    },
    getApiResStatus(status) {
      let val = this.apiResStatus.find( a => a.value == status )
      if(val) return val.text
      return status
    },
    getExitDtVal(exit_dt) {
      if(exit_dt) {
        return exit_dt.substring(0,4) + "-" + exit_dt.substring(4,6) + "-" + exit_dt.substring(6,8)
      }
    },
    getTime(datetime) {
      if(datetime){
        return String(datetime).substring(11,16)
      }
      return datetime
    },
    numberWithCommas(x) {
      if(x==undefined) x = '0'
      if(String(x).indexOf('.') > -1) x = Number(x).toFixed(2)
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    editItem (item) {
      this.editedIndex = this.orderdatas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editdialog = true
    },
    excelDownload() {
      let prdts = this.orderdatas
      var fileName = "Order_Execute_" + (this.thedate)+".xlsx"
      var list = XLSX.utils.json_to_sheet(prdts,
          { header: [
              "prdt_img",
              "status",
              "datetime",
              "s_order_start",
              "s_order_end",
              "order_num",
              "user_id",
              "brand_name",
              "store",
              "ref_num",
              "product_id",
              "ems_yn",
              "prdt_name",
              "p_count",
              "prdt_price",
              "list_price",
              "buy_price_dol",
              "d_rate",
              "save_amt",
              "gift_amt",
              "p_count_limit",
              "exit_dt",
              "exit_time",
              "flt_code",
              "order_type",
              "plan_seq",
            ], skipHeader: false })

      this.changeTitle(list)
      this.changeStatusText(list)
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, list, 'Order Execute')
      XLSX.writeFile(wb, fileName)
    },
    changeTitle(list) {
      var range = XLSX.utils.decode_range(list['!ref']);
      // for(var C = range.s.r; C <= range.e.r; ++C) {
      for (let C = 1; C < this.headers.length; C++) {
        var address = XLSX.utils.encode_col(C-1) + "1"; // <-- first row, column number C
        if(!list[address]) continue;
        list[address].v = this.headers[C].text
      }
    },
    changeStatusText(list){
      var range = XLSX.utils.decode_range(list['!ref']);
      // for(var C = range.s.r; C <= range.e.r; ++C) {
      for (let R = 2; R < this.orderdatas.length+3; R++) {
        var address = XLSX.utils.encode_col(1) + R; // <--  row number C
        if(!list[address]) continue;

        let idx = this.detailStatus.findIndex((st) => (st.value == list[address].v))

        if(idx < 0) continue;
        list[address].v = this.detailStatus[idx].text
      }
    },
    start() { // 1초에 한번씩 start 호출
      this.polling = setInterval(() => {
        this.timeCounter--   //1찍 감소
        if (this.timeCounter <= 0) {
          this.execute()
          this.timeCounter = 3   // 3초
        }
      }, 1000)
    },
    timeStop() {
      clearInterval(this.polling)
    },
    execute(){
      this.getLastOrderByfilterSeq('ALL')
    },
    getLastOrderByfilterSeq(filter) {
      if(this.lastSeq) {
        if(typeof this.lastSeq === 'number') this.lastSeq = this.lastSeq.toString()
        let seq = this.lastSeq
        if(this.selectSeq) seq = this.selectSeq

        // let order_seq = (seq.split('('))[0]
        let order_seq = seq
        let query = '/order/'
        if(filter == 'ALL') {
          query += 'getLastOrderPlanAllSeq'
        } else if(filter == 'Finish') {
          query += 'getLastOrderPlanFilterFinishSeq'
        } else if(filter == 'Ongoing') {
          query += 'getLastOrderPlanFilterOngoingSeq'
        } else if(filter == 'Canceled') {
          query += 'getLastOrderPlanFilterCancelSeq'
        } else if(filter == 'Error') {
          query += 'getLastOrderPlanFilterErrorSeq'
        } else if(filter == 'Not Finish') {
          query += 'getLastOrderPlanFilterNotFineSeq'
        }

        if(Number(order_seq) > 0){
          let opSite = this.siteSeq
          // this.$axios.post( query, {
          this.$axios.get( query, {
            params: {
              order_seq: Number(order_seq),
              op_site: opSite
            }
          } ).then((response) => {
            let result = response.data;
            if(typeof result === 'string') {
              result = JSON.parse(result)
            }
            this.updateDataArray(filter, result)
            this.setdataValues(filter)
            this.loadingdialog = false
            this.$emit("orderdatas", result)
            console.log(result)
          }).catch(error => {
            console.log(opSite + " >>> " + { error });
          })
        } else {
          // this.updateDataArray(filter, [])
        }
      }
      this.loadingdialog = false
    },
    updateDataArray(filter, result) {
      if(filter == 'ALL') {
        this.allData = result
      } else if(filter == 'Finish') {
        this.finishData = result
      } else if(filter == 'Ongoing') {
        this.ongoingData = result
      } else if(filter == 'Canceled') {
        this.cancelData = result
      } else if(filter == 'Error') {
        this.errorData = result
      } else if(filter == 'Not Finish') {
        this.notfineData = result
      }
      this.tabValue[filter] = result.length
    },
    setdataValues(filter) {
      this.firstVisit = false
      if(filter == 'ALL') {
        this.orderdatas = this.allData
      } else if(filter == 'Finish') {
        this.orderdatas = this.finishData
      } else if(filter == 'Ongoing') {
        this.orderdatas = this.ongoingData
      } else if(filter == 'Canceled') {
        this.orderdatas = this.cancelData
      } else if(filter == 'Error') {
        this.orderdatas = this.errorData
      } else if(filter == 'Not Finish') {
        this.orderdatas = this.notfineData
      }

      let data = this.orderdatas
      if(data.length > 0) {
        if(data[0].s_order_yn == "Y") {
          let order_start = data[0].s_order_start
          let order_end = data[0].s_order_end
          if(order_start) {
            this.orderDate = String(order_start).substring(0,10)
            this.orderStTime = String(order_start).substring(11,16)
            this.orderEdTime = String(order_end).substring(11,16)
          }
        }

        data.forEach((item) => {
          item.d_rate = this.getDiscountRate(item.buy_price_dol, item.list_price)
          item.YZ = this.yzIdDisplay(item)
          if(this.isDGType(item.order_type))
            item.save_amt = (item.save_amt + item.plus_save_amt)
        })
      }
    },
    getDiscountRate(val, total){
      if(total == 0 || total == null) return 0
      return 100 - Number(((Number(val)/Number(total))*100).toFixed(2))
    },
    getvisiable() {
      if(this.orderdatas.length>0){
        return (this.orderdatas[0].s_order_yn == 'Y')
      }
      return false
    },
    close () {
      this.imageDetail = false
    },
    isBest(order_type) {
      /*let url = location.href
      console.log(url)
      let idx = url.indexOf('://') + 3
      let surl = url.substring(idx)
      if(surl.toLowerCase().startsWith('b')){
        return true
      }*/
      if(order_type=='BEST' || order_type=='DGBEST') return true
      return false
    },
    isRoate(status, order_type) {
      if(this.isBest(order_type)){
        if((status == '000002')||(status == '000022')) {
          return true
        }
      }
      return false
    },
    checkStatus(status) {
      if(status == '000090') return 'Ready'
      else if(status =='000000' || status == '000001' ) return 'Ongoing'
      else if(status == '000099' || status == '000199') return 'Finish'

      return 'Error'
    },
    isDGType(status) {
      let idx = this.dgOrderTyps.indexOf(status)
      if(idx < 0) return false;
      return true;
    },
    yzIdDisplay(item) {
      return "   "+ (this.$i18n.t('label.orderNumber'))+':  '+item.yz_tid
    },

  },
  created() {
    this.start()
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
  watch: {
    selected(val) {
      console.log("changed seq" + val)
      this.$emit("selected", val)
    }
  }
}
</script>

<style scoped>

</style>
