<template>
  <div align="center">
    <v-card max-width="98%">
      <v-card-title>{{ $i18n.t('label.visaTitle')}}</v-card-title>
      <v-divider></v-divider>
      <br/>
      <v-card max-width="96%" flat>
        <v-data-table
            :headers="headers"
            :items="visadatas"
            sort-by="file_num"
            class="elevation-1"
            :search="search"
        >
          <template v-slot:item.status="{ item }">
            <div v-if="item.status=='Y'">
              <v-icon color="green">mdi-alarm-check</v-icon>
            </div>
            <div v-else>
              <v-icon color="blue">mdi-run-fast</v-icon>
            </div>
          </template>
          <template v-slot:top>
            <v-toolbar
                flat
            >
              <v-toolbar-title>{{$i18n.t('label.visalist')}}</v-toolbar-title>
              <v-divider
                  class="mx-4"
                  inset
                  vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog
                  v-model="dialog"
                  max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      small
                  >
                    New Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row dense>
                        <v-col
                            cols="10"
                        >
                          <v-text-field
                              v-model="editedItem.file_num"
                              :label="$i18n.t('label.fileNum')"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="10"
                        >
                          <v-select
                              v-model="editedItem.question"
                              :items="questions"
                              :label="$i18n.t('label.query0')"
                              dense
                              flat
                              style="font-size: small"
                          ></v-select>
                        </v-col>
                        <v-col
                            cols="10"
                        >
                          <v-text-field
                              v-model="editedItem.answer"
                              :label="$i18n.t('label.answer')"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="10"
                        >
                          <v-select
                              v-model="editedItem.status"
                              :items="YNoption"
                              :label="$i18n.t('label.status')"
                              dense
                              flat
                              style="font-size: small"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-spacer></v-spacer>
              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
              ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <br/>
      <v-divider></v-divider>

      <br/>
      <v-card max-width="700px">
        <v-row class="fill-height">
          <v-col>
            <v-sheet height="64">
              <v-toolbar
                  flat
              >
                <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="prev"
                >
                  <v-icon small>
                    mdi-chevron-left
                  </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                  {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="next"
                >
                  <v-icon small>
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    outlined
                    class="mr-4"
                    color="grey darken-2"
                    @click="setToday"
                >
                  Today
                </v-btn>
              </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
              <v-calendar
                  ref="calendar"
                  v-model="focus"
                  color="primary"
                  :events="events"
                  :event-color="getEventColor"
                  :type="type"
                  @click:event="showEvent"
                  @click:more="viewDay"
                  @click:date="viewDay"
                  @change="updateRange"
              ></v-calendar>
              <v-menu
                  v-model="selectedOpen"
                  :close-on-content-click="false"
                  :activator="selectedElement"
                  offset-x
              >
                <v-card
                    color="grey lighten-4"
                    min-width="350px"
                    flat
                >
                  <v-toolbar
                      :color="selectedEvent.color"
                      dark
                  >
                    <v-btn icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <span v-html="selectedEvent.details"></span>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                        text
                        color="secondary"
                        @click="selectedOpen = false"
                    >
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card>
      <br/>
    </v-card>
  </div>
</template>

<script>
import i18n from "@/i18n";

export default {
  name: "VisaApply",
  data() { return {
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    search: '',
    headers: [
      { text: i18n.t('label.status'), value: 'status' },
      { text: i18n.t('label.fileNum'), value: 'file_num'},
      { text: i18n.t('label.question'), value: 'question'},
      { text: i18n.t('label.answer'), value: 'answer'},
      { text: i18n.t('label.scheduled_start_time'), value: 'start'},
      { text: i18n.t('label.scheduled_end_time'), value: 'end'},
      { text: 'Action', value: 'actions'},
    ],
    visadatas: [],
    editedIndex: -1,
    dialog: false,
    dialogDelete: false,
    editedItem: {
      status: '',
      filename: '',
      question: 0,
      answer: '',
      start: 0,
      end: 0
    },
    defaultItem: {
      status: '',
      filename: '',
      question: 0,
      answer: '',
      start: 0,
      end: 0
    },
    questions: [
      { text: i18n.t('label.query1'), value: "您父亲的姓名?"},
      { text: i18n.t('label.query2'), value: "您父亲是哪里人?"},
      { text: i18n.t('label.query3'), value: "您父亲的现居住地?"},
      { text: i18n.t('label.query4'), value: "您父亲的年龄?"},
      { text: i18n.t('label.query5'), value: "您祖父名字是什么?"},
      { text: i18n.t('label.query6'), value: "您祖母的姓是什么?"},
      { text: i18n.t('label.query7'), value: "您在哪个城市与另一半相遇?"},
      { text: i18n.t('label.query8'), value: "您的父母亲在哪个地方相遇?"},
      { text: i18n.t('label.query9'), value: "您的第一份工作在哪个城市或城镇?"},
      { text: i18n.t('label.query10'), value: "您11岁的时候在哪所学校上学?"},
      { text: i18n.t('label.query11'), value: "您8岁住在哪个街道?"},
      { text: i18n.t('label.query12'), value: "您小时候家里的电话号码是多少?"},
      { text: i18n.t('label.query13'), value: "您第一辆车的品牌是什么?"},
    ],
    YNoption: ['Y', 'N']
  }},
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
      this.type= 'month'
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        })
      }

      this.events = events
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    editItem (item) {
      this.editedIndex = this.visadatas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.visadatas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.visadatas.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.visadatas[this.editedIndex], this.editedItem)
      } else {
        this.visadatas.push(this.editedItem)
      }
      this.close()
    },
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? this.$i18n.t('label.visaSubTitle') : 'Edit Item'
    },
  },
  mounted () {
    this.$refs.calendar.checkChange()
  }
}
</script>

<style scoped>

</style>
