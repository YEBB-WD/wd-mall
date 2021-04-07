<template>
  <div class="selectseq">
    <v-card max-width="98%" flat>
      <br/>
      <v-card-title>
        <v-row>
          <v-col cols="5">
            <calendar
                :label="$t('label.orderDate')"
                v-model="thedate"
                :dates="[]"
                @date="getMadeDt"></calendar>
          </v-col>
          <v-col cols="2"><pre>   </pre></v-col>
          <v-col cols="5">
            <v-select
                v-if="!isDetailView"
                v-model="selectSeq"
                :items="seqHistory"
                :label="(seqHistory.length==0)?'Empty':historylabel"
                :disabled="(seqHistory.length==0)"
                flat
                @change="searchDate"
                style="font-size: small"
            >
            </v-select>
          </v-col>
        </v-row>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import i18n from "@/i18n";
import Calendar from "@/views/Calendar";

export default {
  name: "SelectSeq",
  components: {
    Calendar
  },
  data() { return {
    thedate: this.getToday(),
    loadingdialog: false,
    madeDate: this.getToday(),
    seqHistory: [],
    selectSeq: null,
    lastSeq: '',
    siteSeq: 'orddb',
    isDetailView: false,
    historylabel: i18n.t('label.seqhistory'),
  }},
  methods: {
    getToday() {
      let d = new Date();
      return (d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2)+ "-" + ("0"+(d.getDate())).slice(-2));
    },
    getMadeDt(date) {
      this.loadingdialog = true
      this.madeDate = date
      this.thedate = date
      this.seqHistory = []
      this.getHistoryData()
      this.selectSeq= ''
      this.lastSeq= ''

      //test
      // this.$emit('selectSeq', date)
    },
    getHistoryData() {
      this.seqHistory= []
      let opSite = this.siteSeq
      // selOrderPlanSeq
      // this.$axios.post('/order/selOrderSeq', {
      this.$axios.get('/order/selOrderSeq', {
        params: {
          startSeq: this.getOrderStart(),
          endSeq: this.getOrderEnd(),
          op_site: opSite
        }
      }).then((response) => {
        let result = response.data;
        this.updateHistorySeq(result)
        console.log(result)
        return result[0]
      })
    },
    getOrderStart() {
      // order plan '00' / pre_order_plan '000'
      return String(this.parseDate(this.madeDate)).substring(2)+'00'
    },
    getOrderEnd() {
      // order plan '99' / pre_order_plan '999'
      return String(this.parseDate(this.madeDate)).substring(2)+'99'
    },
    searchDate() {
      if(this.selectSeq){
        this.loadingdialog = true
        this.lastSeq = this.selectSeq
        this.$emit('selectSeq', this.selectSeq)
      }
    },
    updateHistorySeq(result) {
      let maxSeq = ''
      this.seqHistory = []

      if(typeof result === 'string'){
        result = JSON.parse(result)
      }

      result.forEach((item) => {
        let seq = {
          text: (String(item.order_seq)).substring(6) + ' ('+item.order_type+')',
          value: item.order_seq
        }
        maxSeq = Math.max(item.order_seq, maxSeq)
        this.updateHistorySeqBuf(seq)
      })
      if(maxSeq) {
        this.lastSeq = maxSeq
        this.selectSeq = maxSeq
        this.thedate = "20"+String(this.selectSeq).substring(0,2)+"-"+String(this.selectSeq).substring(2,4)+"-"+String(this.selectSeq).substring(4,6)
        this.$emit('selectSeq', maxSeq)
      }
      this.loadingdialog = false
    },
    updateHistorySeqBuf(seq) {
      this.seqHistory.push(seq)
    },
    parseDate(date) {
      if (!date) return null
      if (date.indexOf('-') != -1) {
        const [year, month, day] = date.split('-')
        return `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`
      } else if (date.indexOf('/') != -1) {
        const [year, month, day] = date.split('/')
        return `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`
      }
      return date
    },
  }
}
</script>

<style scoped>

</style>
