<template>
    <div align="center">
        <v-card max-width="96%" flat>
            <v-simple-table dense>
                <tr>
                    <th rowspan="2" v-if="(prdt.prdt_img && prdt.prdt_img != 'None')" style="text-align: center;width: 130px; background-color: #F5F5F5" >
                        <v-btn icon @click="popup(prdt)">
                            <v-img :src="prdt.prdt_img" max-width="40px"></v-img>
                        </v-btn>
                    </th>
                    <th rowspan="2" v-else style="text-align: center;width: 130px; background-color: #F5F5F5">
                        {{prdt.product_id}}
                    </th>
                    <td style="font-size: small; background-color: #F5F5F5">[{{prdt.brand_name}}] {{prdt.prdt_name}}</td>
                </tr>
                <tr>
                    <th style="background-color: #F5F5F5">
                        <v-progress-linear
                                :value="progressValue"
                                :height="20"
                                :color="getColor()"
                                rounded
                                reactive
                        >
                            <strong>{{ getText }}</strong>
                        </v-progress-linear>
                    </th>
                </tr>
            </v-simple-table>
            <v-dialog v-model="prdtDialog" max-width="500px">
                <v-card>
                    <v-row align="center" justify="center" dense>
                        <v-img
                                :src="prdtInfo.prdt_img"
                                aspect-ratio="1"
                                class="grey lighten-2"
                                max-width="300px"
                                crossOrigin="anonymous"
                        ></v-img>
                    </v-row>
                    <v-row align="center" justify="end" dense>
                        <h6>{{$t('label.urlLink')}}</h6>
                        <pre>&nbsp;&nbsp;</pre>
                        <v-btn-toggle
                                color="deep-purple accent-3"
                        >
                            <v-btn x-small dark style="font-weight: bold; background-color: dodgerblue" :href="getLinkUrl(prdtInfo, 'KO' )" target="_blank">
                                KR
                            </v-btn>
                            <v-btn x-small dark style="font-weight: bold; background-color: red" :href="getLinkUrl(prdtInfo, 'ZH')" target="_blank">
                                CN
                            </v-btn>
                        </v-btn-toggle>
                        <pre>&nbsp;&nbsp;&nbsp;</pre>
                    </v-row>
                    <v-row align="center" justify="center" dense>
                        <v-col cols="9" >
                            <v-text-field style="font-size: small" dense readonly v-model="prdtInfo.brand_name" :label="$t('label.brand_name')"></v-text-field>
                        </v-col>
                        <v-col cols="9" >
                            <v-text-field style="font-size: small" dense readonly v-model="prdtInfo.prdt_name" :label="$t('label.prdt_name')"></v-text-field>
                        </v-col>
                        <v-col cols="9" >
                            <v-text-field style="font-size: small" dense readonly v-model="prdtInfo.product_id" label="Product Code"></v-text-field>
                        </v-col>
                        <v-col cols="6" >
                            <v-text-field style="font-size: small" dense readonly v-model="prdtInfo.ref_num" label="REF_num"></v-text-field>
                        </v-col>
                        <v-col cols="3" >
                            <v-text-field style="font-size: small" dense readonly v-model="prdtInfo.store" :label="$t('label.store')"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">{{$t('label.confirm')}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "ProductProcess",
        props: {
            prdt: {
                types: Object,
                default: {
                    product_id: '12345678901',
                    prdt_name: 'abcdefg',
                    cnt : 10,
                    prdt_img: 'https://img2.tmon.kr/cdn3/deals/2019/12/30/2162137434/catlist_3col_v2_ab5a0_5wr5h.jpg',
                    brand_name: 'channel',
                    total_count: 100,
                    ref_num: '1111',
                    store: '명동점'
                }
            },
        },
        data () { return {
            prdtInfo: {
                product_id: '',
                prdt_name: '',
                cnt : 0,
                prdt_img: '',
                brand_name: '',
                total_count: 0,
                ref_num: '',
                store: ''
            },
            progressValue: this.getRate(this.prdt.cnt, this.prdt.total_count),
            getText: this.getDispTxt(this.prdt.cnt, this.prdt.total_count),
            chlinkurl: 'http://cn.ssgdfm.com/shop/product/productDetail?prdtCode=',
            chmlinkurl: 'http://mcn.ssgdfm.com/shop/product/productDetail?prdtCode=',
            linkurl: 'http://www.ssgdfm.com/shop/product/productDetail?prdtCode=',
            mlinkurl: 'http://m.ssgdfm.com/shop/product/productDetail?prdtCode=',
            prdtDialog: false,
        }},
        methods: {
            popup(orderPrdt) {
                this.prdtInfo = orderPrdt
                this.prdtDialog = true
            },
            close () {
                this.prdtDialog = false
                console.log('Dialog closed')
            },
            getColor(){
                if((!this.progressValue)||(this.progressValue==0)){
                    return 'grey'
                }
                return 'primary'
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
            getRate(val, total){
                if(total == 0 || total == null) return 0
                return Number(((Number(val)/Number(total))*100).toFixed(2))
            },
            getDispTxt(val, total){
                return this.getRate(val, total) +"% (" + this.numberWithCommas(val) + "/" + this.numberWithCommas(total) + ")"
            },
            numberWithCommas(x) {
                if(x==undefined) x = '0'
                if(String(x).indexOf('.') > -1) x = Number(x).toFixed(2)
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        },
        watch: {
            prdt(val) {
                this.progressValue = this.getDispTxt(val.cnt, val.total_count)
                this.getText= this.getDispTxt(this.prdt.cnt, this.prdt.total_count)
            }
        }
    }
</script>

<style scoped>

</style>
