<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    origin="center"
    min-width="0"
  >
    <template #activator="{ on }">
      <v-text-field
        class="white size-13 font-weight-bold textfield-dark-grey"
        :value="formattedValue"
        placeholder="Date"
        append-icon="mdi-calendar-month"
        v-on="on"
        @click:append="menu = true"
        outlined
        dense
        hide-details
      ></v-text-field>
    </template>
    <v-card color="white" width="350" class="date-range-content">
      <!-- Custom Range -->
      <div class="d-flex pa-4 justify-space-between align-center relative">
        <DatePicker
          v-model="startDate"
          placeholder="start"
          :textfield="true"
          @input="endDate = ''"
        />
        <div class="mx-4">
          <DatePicker
            v-model="endDate"
            placeholder="end"
            :textfield="true"
            :min="startDate"
          />
        </div>
        <v-btn outlined color="primary" height="40" @click="onDateSelection">
          ok
        </v-btn>
      </div>
      <!-- Existing Ranges -->
      <div>
        <div
          class="pa-3 pl-6 font-weight-bold ap-dark-gray--text range-item size-13"
          v-for="(item, i) in ranges"
          :key="i"
          @click="setDates(item.value, item.last)"
        >
          {{ item.text }}
        </div>
      </div>
    </v-card>
  </v-menu>
</template>

<script>
import DatePicker from './DatePicker'
import * as moment from 'moment'

export default {
  name: 'date-range-picker',
  components: {
    DatePicker
  },
  computed: {
    formattedValue() {
      let { startDate, endDate } = this
      startDate = startDate ? moment(startDate).format('ll') : ''
      endDate = endDate ? moment(endDate).format('ll') : ''
      if (startDate && endDate) return `${startDate} - ${endDate}`
      else if (startDate || endDate) return startDate || endDate

      return ''
    }
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    startDate: '',
    endDate: '',
    ranges: [
      { text: 'Today', value: 'today' },
      { text: 'This week', value: 'week' },
      { text: 'Last week', value: 'week', last: true },
      { text: 'This quarter', value: 'quarter' },
      { text: 'Last quarter', value: 'quarter', last: true },
      { text: 'This month', value: 'month' },
      { text: 'This year', value: 'year' }
    ]
  }),
  methods: {
    setDates(domain, last = false) {
      if (domain === 'today') {
        this.startDate = this.endDate = moment().toISOString()
        return
      }

      let factor = last ? -1 : 0

      this.startDate = moment()
        [domain](moment()[domain]() + factor)
        .startOf(domain)
        .toISOString()
      this.endDate = moment()
        [domain](moment()[domain]() + factor)
        .endOf(domain)
        .toISOString()
    },
    onDateSelection() {
      this.$refs.menu.save()
      let { startDate, endDate } = this
      this.$emit('change', {
        startDate,
        endDate
      })
    }
  }
}
</script>
