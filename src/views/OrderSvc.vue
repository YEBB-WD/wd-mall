<template>
  <div class="ordersvc">
    <v-card flat>
      <select-seq
        @selectSeq="updateSeq"/>
      <order-status
          v-model="selectedSeq"
          @orderSeq="statusSeq"/>
      <order-operation
        v-model="selectedSeq"
        :selected="selected"
        :orderdatas="orderdatas"/>
      <order-list
        v-model="selectedSeq"
        @orderdatas="updateDate"
        @selected="updateSelect"/>
    </v-card>

  </div>
</template>

<script>
import SelectSeq from "@/views/SelectSeq";
import OrderOperation from "@/views/OrderOperation";
import OrderStatus from "@/views/OrderStatus";
import OrderList from "@/views/OrderList";

export default {
  name: "OrderSvc",
  components: {
    SelectSeq,
    OrderOperation,
    OrderStatus,
    OrderList,
  },
  data() { return {
    selectedSeq: null,
    selected: [],
    orderdatas: [],
  }},
  methods: {
    updateSeq(val) {
      if (typeof val === 'number') val = val.toString()
      this.selectedSeq = val;
      console.log("changed by select : " + val)
    },
    statusSeq(val) {
      this.selectedSeq = val;
      if (typeof val === 'number') val = val.toString()
      console.log("changed by status : " + val)
    },
    updateDate(val) {
      this.orderdatas = val;
    },
    updateSelect(val) {
      this.selected = val;
    }

  },
  watch: {
    selectedSeq(val) {
      console.log('changed selectedSeq : ' + val)
    }
  }
}
</script>

<style scoped>

</style>
