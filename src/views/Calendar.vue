<template>
    <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="190px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                    v-model="computedDateFormatted"
                    :label="label"
                    readonly
                    v-on="on"
                    dense
                    v-if="noDisIcon"
                    :disabled="disabled"
            ></v-text-field>
            <v-text-field
                    v-model="computedDateFormatted"
                    :label="label"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                    dense
                    v-else
                    :disabled="disabled"
            ></v-text-field>
        </template>
        <div v-if="!min && !max">
            <v-date-picker v-model="dates" no-title @input="menu2 = false" range v-if="range"></v-date-picker>
            <v-date-picker v-model="date" no-title @input="menu2 = false" v-else></v-date-picker>
        </div>
        <div v-else-if="max">
            <v-date-picker v-model="dates" no-title :max="max" @input="menu2 = false" range v-if="range"></v-date-picker>
            <v-date-picker v-model="date" no-title :max="max" @input="menu2 = false" v-else></v-date-picker>
        </div>
        <div v-else-if="min">
            <v-date-picker v-model="dates" no-title :min="min" @input="menu2 = false" range v-if="range"></v-date-picker>
            <v-date-picker v-model="date" no-title :min="min" @input="menu2 = false" v-else></v-date-picker>
        </div>

    </v-menu>
</template>

<script>
    export default {
        name: "Calendar",
        model: {
          prop: 'date',
          event: 'change'
        },
        props: {
            label: {
                type: String,
                default: '일자'
            },
            date: {
                types: String,
                default: (new Date().getFullYear() + "-" + ("0"+(new Date().getMonth()+1)).slice(-2)+ "-" + ("0"+(new Date().getDate())).slice(-2))
            },
            noDisIcon: {
                types: Boolean,
                default : false
            },
            disabled: {
                types: Boolean,
                default : false
            },
            dates: {
                types: Array,
                default: [(new Date().getFullYear() + "-" + ("0"+(new Date().getMonth()+1)).slice(-2)+ "-" + ("0"+(new Date().getDate())).slice(-2))],
            },
            range: {
                type: Boolean,
                default: false
            },
            min: {
                type: String,
                default: ""
            },
            max: {
                type: String,
                default: ""
            }
        },
        data () { return {
            // dateFormatted: this.formatDate(this.getToday()),
            menu1: false,
            menu2: false,
        }},
        computed: {
            computedDateFormatted () {
                if(this.range) {
                    this.dates.sort()
                    this.$emit('dates',this.dates)
                    return this.dates.join(' ~ ')
                } else {
                    let ndate = ''
                    if(this.date){
                        ndate =  this.formatDate(this.date)
                        this.$emit('date', ndate)
                        return ndate
                    } else
                        ndate = ''

                    return ndate
                }
            },
        },
        watch: {
            date (val) {
                this.dateFormatted = this.formatDate(this.date)
            },
        },
        methods: {
            formatDate (date) {
                if (!date) return date
                if(String(date).indexOf('-')<0) return date

                const [year, month, day] = date.split('-')
                return `${year}-${month}-${day}`
            },
            parseDate (date) {
                if (!date) return date

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
            getToday() {
                let d = new Date();
                return (d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2)+ "-" + ("0"+(d.getDate())).slice(-2));
            },
            getTheDay(day) {
                let d = new Date();
                return (d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2)+ "-" + ("0"+(d.getDate()+day)).slice(-2));
            }
        },
        updated() {
            console.log(this.label)
        }
    }
</script>

<style scoped>

</style>
