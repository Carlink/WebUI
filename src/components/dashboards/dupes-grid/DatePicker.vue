<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="dates"
    transition="scale-transition"
    offset-y
    origin="center"
    min-width="0"
  >
    <template #activator="{ on }">
      <v-text-field
        class="white"
        v-model="dateRangeText"
        placeholder="date"
        append-icon="mdi-calendar"
        v-on="on"
        @click:append="menu = true"
        solo
        single-line
        hide-details
      ></v-text-field>
    </template>
    <v-date-picker v-model="dates" no-title scrollable range>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment'
export default {
  data: () => ({
    dates: [
      new Date().toISOString().substr(0, 10),
      new Date().toISOString().substr(0, 10)
    ],
    menu: false,
    modal: false
  }),
  computed: {
    dateRangeText() {
      return this.dates
        ? moment(this.dates[0]).format('MMMM DD, YYYY') +
            ' - ' +
            moment(this.dates[1]).format('MMMM DD, YYYY')
        : ''
    }
  },
  watch: {
    dates: function (val) {
      if (val.length === 1) return

      const start = val[0] < val[1] ? val[0] : val[1]
      const end = val[0] > val[1] ? val[0] : val[1]

      this.$emit('change', { start: new Date(start), end: new Date(end) })
    }
  }
}
</script>
