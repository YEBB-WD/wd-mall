<template>
    <div align="center">
        <v-card max-width="96%" flat>
            <v-simple-table dense>
                <tbody>
                <tr v-if="background">
                    <th style="text-align: center;width: 130px; background-color: #F5F5F5">
                        <v-btn x-small text color="red" style="font-weight: bold" @click="btnclick" v-if="isRedText()">{{ keyVal }}<br>{{ keyVal2 }}</v-btn>
                        <v-btn x-small text @click="btnclick" v-if="!isRedText()">{{ keyVal }}<br>{{ keyVal2 }}</v-btn>
                        <v-btn icon small v-if="(!fDetail && extend)"
                               @click="fDetail = true">
                            <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn icon small v-if="(fDetail && extend)"
                               @click="fDetail = false">
                            <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                    </th>
                    <th style="background-color: #F5F5F5">
                        <v-progress-linear
                                :value="progressValue"
                                :height="height"
                                :color="getColor()"
                                rounded
                                reactive
                        >
                            <strong>{{ getText }}</strong>
                        </v-progress-linear>
                    </th>
                </tr>
                <tr v-if="!background">
                    <th style="text-align: right;width: 90px">{{ keyVal }}
                        <v-btn icon small v-if="(!fDetail && extend)"
                               @click="fDetail = true">
                            <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn icon small v-if="(fDetail && extend)"
                               @click="fDetail = false">
                            <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                    </th>
                    <th >
                        <v-progress-linear
                                :value="progressValue"
                                :height="height"
                                :color="getColor()"
                                rounded
                                reactive
                        >
                            <strong><h3>{{ getText }}</h3></strong>
                        </v-progress-linear>
                    </th>
                </tr>
                </tbody>

            </v-simple-table>
        </v-card>
    </div>
</template>

<script>
import i18n from '@/i18n'
    export default {
        name: "OrderPlanProgress",
        props: {
            keyVal: {
                types: String,
                default: 'Finish'
            },
            keyVal2: {
                types: String,
                default: 'etc'
            },
            progressValue: {
                types: String,
                default: '30'
            },
            progressText: {
                types: String,
                default: '0'
            },
            pColor: {
                types: String,
                default: 'primary'
            },
            height: {
                types: String,
                default: '20',
            },
            extend: {
                types: Boolean,
                default: false
            },
            background: {
                types: Boolean,
                default: false,
            },
            errorType: {
                types: Boolean,
                default: false
            }
        },
        data () { return {
            search: '',
            fDetail: false,
            headers: [
                { text: i18n.t('label.user_id'), value: 'user_id'},
                { text: i18n.t('label.brand_name'), value: 'brand_name'},
                { text: i18n.t('label.prdt_name'), value: 'prdt_name'},
                { text: 'P.ID', value: 'product_id' },
                { text: 'Ref.No', value: 'ref_num' },
                { text: i18n.t('label.manage'), value: 'action', sortable: false },
            ],
        }},
        methods: {
            stopItem(item) {

            },
            goItem(item) {

            },
            numberWithCommas(x) {
                if(x==undefined) x = '0'
                if(String(x).indexOf('$') == 0) {
                    let nx = x.slice(1)
                    if(String(nx).indexOf('.') > -1) x = Number(nx).toFixed(2)
                    return '$'+ nx.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                } else
                if(String(x).indexOf('₩') == 0) {
                    let nx = x.slice(1)
                    if(String(nx).indexOf('.') > -1) x = Number(nx).toFixed(2)
                    return '₩'+ nx.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                } else
                if(String(x).indexOf('.') > -1) x = Number(x).toFixed(2)
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            getColor(){
                if((!this.progressValue)||(this.progressValue==0)){
                    return 'grey'
                }
                return this.pColor
            },
            isRedText() {
                if(!this.errorType) {
                    return false
                } else
                if((!this.progressValue)||(this.progressValue==0)){
                    return false
                }
                return true
            },
            btnclick() {
                if(this.progressValue > 0)
                    this.$emit('btnclick', this.keyVal)
            }
        },
        computed: {
            getText() {
                return this.progressValue +'% ( '+ this.numberWithCommas(this.progressText) + ' )'
            }
        },
        watch: {
            fDetail (val) {
                this.$emit('fdetail', val)
            }
        }
    }
</script>

<style scoped>

</style>
