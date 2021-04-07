<template>
  <div align="center">
    <v-card flat min-width="900px">
      <br/>
      <v-card max-width="96%">
        <v-row
            justify="start"
            align="center"
            style="background-color: #ECEFF1"
        >
          <tr valign="middle">
            <td width="100px" height="40px">{{ $i18n.t('label.orderNumber')}}: </td>
            <td>{{ tid }}</td>
            <td><pre>  </pre></td>
            <td width="80px">{{ $i18n.t('label.orderTime')}}: </td>
            <td>{{ orderTime }}</td>
            <td><pre>  </pre></td>
            <td>
              <v-btn small @click="reOrderAll">
                {{ $i18n.t('label.all')}}{{ $i18n.t('label.reorder')}}
              </v-btn>
            </td>
            <td><pre>  </pre></td>
            <td>
              <v-btn small @click="cancelAll">
                {{ $i18n.t('label.all')}}{{ $i18n.t('label.orderCancel')}}
              </v-btn>
            </td>
          </tr>
        </v-row>
        <v-row v-for="prdt in prdts">
          <tr valign="middle">
            <td>
              <v-img
                :src="prdt.prdtImage"
                contains
                width="50">
              </v-img>
            </td>
            <td><pre>  </pre></td>
            <td width="350" align="left">{{prdt.prdtName}}</td>
            <td><pre>  </pre></td>
            <td>{{prdt.orderNumber}}</td>
            <td><pre>  </pre></td>
            <td width="60">
              <v-btn small text>
                {{prdt.orderStatus}}
              </v-btn>
            </td>
            <td><pre>  </pre></td>
            <td>
              <v-btn x-small @click="reOrder(prdt.orderNumber)">
                {{$i18n.t('label.reorder')}}
              </v-btn>
            </td>
            <td><pre>  </pre></td>
            <td>
              <v-btn x-small @click="orderCancel(prdt.orderNumber)">
                {{$i18n.t('label.orderCancel')}}
              </v-btn>
            </td>
          </tr>
        </v-row>

      </v-card>
    </v-card>
  </div>
</template>

<script>
import i18n from '@/i18n'

export default {
  name: "OrderCard",
  components: {},

  data() { return {
    tid: 'E20201221224349048000099',
    orderTime: '2020-12-21 22:43:49',
    prdts: [
      {
        prdtImage: 'https://img.yzcdn.cn/upload_files/2020/12/10/FkIqkHUKGACaXAx3itbuzrJtIOwx.jpg',
        prdtName: '[CHRISTIAN LOUBOUTIN BEAUTY] 丝绒哑光唇膏 Justine 003M 3.8g - TEST',
        orderStatus: i18n.t('label.completed'),
        orderNumber: '12345789601'
      },
      {
        prdtImage: 'https://img.yzcdn.cn/upload_files/2020/12/10/Fi8JRcN_x0tEqIK8kEnqmZDv27mY.jpg',
        prdtName: '[黛珂 COSME DECORTE] 保湿赋活眼霜 15g',
        orderStatus: i18n.t('label.shipped'),
        orderNumber: '12345789602'
      },
      {
        prdtImage: 'https://img.yzcdn.cn/upload_files/2020/12/11/FuvRbiEOAhy4Ree6DJDgMA05NqZS.jpg',
        prdtName: '[MAC] 魅可唇膏 哑光 MARRAKESH 3g',
        orderStatus: i18n.t('label.toBeDelivered'),
        orderNumber: '12345789603'
      }
    ]
  }},
  methods: {
    reOrderAll() {

    },
    cancelAll() {

    },
    reOrder(orderNumber) {

    },
    orderCancel(orderNumber) {

    }

  }
}
</script>

<style scoped>

</style>
