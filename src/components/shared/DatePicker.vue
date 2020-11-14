<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-if="textfield"
        class="white font-weight-bold"
        :value="formatDate(date)"
        :placeholder="placeholder || 'Date'"
        append-icon="mdi-calendar-month"
        v-on="on"
        @click:append="menu = true"
        outlined
        dense
        hide-details
      ></v-text-field>
      <v-icon v-else class="mr-1" v-on="on">mdi-calendar-month-outline</v-icon>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      color="primary"
      :min="min"
      @input="$refs.menu.save(date)"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import * as moment from 'moment'

export default {
  name: 'menu-date-picker',
  props: {
    value: {
      type: String,
      default: new Date().toISOString().substr(0, 7)
    },
    textfield: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    min: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 7),
    menu: false,
    modal: false
  }),
  methods: {
    formatDate(date) {
      return date ? moment(date).format('ll') : ''
    },
    openMenu() {
      this.menu = true
    }
  },
  mounted() {
    this.date = this.value
    this.$emit('input', this.date)
  },
  watch: {
    value: function (val) {
      this.date = val
    },
    date: function (newVal, oldVal) {
      if (newVal && this.value !== newVal && newVal !== oldVal)
        this.$emit('input', newVal)
    }
  }
}
</script>
