<template>
  <div class="order-operation">
    <v-card max-width="98%" flat>
      <div align="right">
        <v-card max-width="230px" flat>
          <v-card-title>
            <v-btn x-small @click="orderRun"
                   style="font-weight: bold; min-height: 30px; " color="primary">
              <span>Execute</span>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn x-small @click="orderStop"
                   style="font-weight: bold; min-height: 30px; " color="primary">
              <span>Stop</span>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn x-small @click="orderCancel"
                   style="font-weight: bold; min-height: 30px; " color="primary">
              <span>Cancel</span>
            </v-btn>
          </v-card-title>
        </v-card>
      </div>
    </v-card>
  </div>
</template>

<script>
import i18n from "@/i18n";

export default {
  name: "OrderOperation",
  model: {
    prop: 'selectSeq',
    event: 'change'
  },
  props: {
    selectSeq: {
      type: Number,
      default: null
    },
    selected: {
      type: Array,
      default: []
    },
    orderdatas: {
      type: Array,
      default: []
    }
  },
  data() { return {
    toglebtn: -1,
    siteSeq: 'orddb',
  }},
  methods: {
    orderRun() {
      let status = '000000'  //start
      let prdts = []
      if(this.selected.length==0) {
        // if(confirm("현재 차수 전체 주문을 실행하시겠습니까?")){
        if(confirm( i18n.t('label.doExecuteAllOrder'))){
          this.updatePlanStatus(status)
        }
      } else {
        // if(confirm("현재 차수 선택 상품 주문을 실행하시겠습니까?")){
        if(confirm( i18n.t('label.doExecuteSelectOrder'))){
          this.updatePlanStatus(status)
        }
      }
    },
    orderStop() {
      let status = '000090'  // ready == stop
      let prdts = []
      if(this.selected.length==0) {
        // if(confirm("진행중인 현재 차수 전체 주문(오류 포함)을 정지하시겠습니까?")) {
        if(confirm(i18n.t('label.doStopOngoingOrder'))) {
          this.orderStopSeq()
          this.cancelStopLast()
        }
      } else {
        // if(confirm("선택한 주문(오류 포함)을 정지하시겠습니까?")) {
        if(confirm(i18n.t('label.doStopSelectOngoingOrder'))) {
          let check = false
          this.orderStopSeq()
          this.cancelStopLast()
        }
      }
    },
    orderCancel() {
      let status = '000090'
      let prdts = []
      if(this.selected.length == 0) {
        // if(confirm("현재 차수 완료된 주문 전체을 취소하시겠습니까?")) {
        if(confirm(i18n.t('label.cancelAllOrder'))) {
          this.selected = this.orderdatas
          prdts = this.selected
          this.cancelOrderSeq()
        }
      } else {
        // if(confirm("선택한 주문을 취소하시겠습니까?")) {
        if(confirm(i18n.t('label.cancelSelectOrder'))) {
          prdts = this.selected
          this.cancelOrderSeq()
        }
      }
    },
    cancelOrderSeq() {
      let opSite = this.siteSeq
      let target = this.selected

      this.$axios.get( '/order/orderCancelSeq', {
        params: {
          op_site: opSite,
          datas: {
            prdts: target
          }
        }
      } ).then((response) => {
        let result = response.data;
        console.log(result)
        // this.updateTabData()
      })
      // this.sendEmailNoti('Cancel', target)
    },
    orderStopSeq() {
      let opSite = this.siteSeq
      let target = this.selected
      if(this.selected.length == 0){
        // target = this.orderdatas
        this.orderStopSeqAll()
        return
      }

      let prdts = []
      target.forEach((prdt) => {
        let val = {
          'plan_seq' : prdt.plan_seq
        }

        prdts.push(val)
      })

      this.$axios.post( '/order/stopOrderforSeq', {
        params: {
          op_site: opSite,
          datas: {
            prdts: prdts
          }
        }
      } ).then((response) => {
        let result = response.data;
        console.log(result)
        // this.updateTabData()
      })

      this.sendEmailNoti('Stop Seq', target)
    },
    orderStopSeqAll() {
      let order_seq = this.selectSeq

      this.$axios.post( '/order/updateOrderPlanByOrderSeq', {
        params: {
          order_seq: order_seq
        }
      } ).then((response) => {
        let result = response.data;
        console.log(result)
        // this.updateTabData()
      })

      this.sendEmailNoti('Stop All', order_seq)
    },
    updatePlanStatus(status) {
      let opSite = this.siteSeq
      let last_seq = this.selectSeq
      let params = {
        status: status,
        op_site: opSite,
        order_seq: last_seq,
        datas: {
          prdts: this.selected
        }
      }

      this.sendEmailNoti('Execute', params)
      this.sendKakao('Execute', params)

      console.log(JSON.stringify(params))
      this.$axios.get( '/order/orderExecOperate', { params } ).then((response) => {
        let result = response.data;
        console.log(result)
        // this.updateTabData()
      })

    },
    cancelStopLast() {
      let opSite = this.siteSeq
      this.$axios.get( '/order/stopCancelforLast', {
        params: {
          op_site: opSite
        }
      }).then((response) => {
        let result = response.data;
        console.log(result)
      })
    },
    sendEmailNoti(type, message) {
      let siteGbn = ''
      let url = location.href
      console.log(url)
      // url = "http://d1.specialdg.com/"
      let idx = url.indexOf('.specialdg.com')
      if(idx > 0){
        siteGbn = url.substring(7,idx)
      }

      let msgStr = JSON.stringify(message)

      let subject = '['+ siteGbn + '] Order ' + type
      this.$axios.post('/noti/mail',{
        params: {
          subject: subject,
          msg: msgStr
        }
      }).then((response) => {
        let result = response.data;
        console.log(result)
      })
      // this.sendKakao(type, message)
    },
    sendKakao(type, message){
      let siteGbn = ''
      let url = location.href
      console.log(url)
      // url = "http://d1.specialdg.com/"
      let idx = url.indexOf('.specialdg.com')
      if(idx > 0){
        siteGbn = url.substring(7,idx)
      }

      let msgStr = JSON.stringify(message)

      let subject = '['+ siteGbn + '] Order ' + type
      this.$axios.post('/noti/kakao',{
        params: {
          subject: subject,
          msg: msgStr
        }
      }).then((response) => {
        let result = response.data;
        console.log(result)
      })
    },
    getRootUrl(url){
      return url.replace(/^(.*\/\/[^\/?#]*).*$/,"$1");
    }
  },
  watch: {
    selectSeq(val) {
      console.log("changed seq" + val)
    }
  }
}
</script>

<style scoped>

</style>
