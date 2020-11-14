<template>
  <div class="d-flex align-center flex-1 pointer" @click="$refs.datePickerRef.openMenu()" :class="outline ? 'rounded border-all px-2 py-2' : ''">
    <date-picker v-model="date" ref="datePickerRef" />
    <span class="ap-dark-gray--text font-weight-black caption" :class="outline ? 'mr-3' : ''">This week</span>
    <v-icon>mdi-chevron-down</v-icon>
  </div>
</template>

<script>
import DatePicker from '../../shared/DatePicker'

export default {
  name: 'date-picker-btn',
  props: {
    value: {
      type: String
    },
    outline: {
      type: Boolean,
      default: false
    }
  },
  components: { DatePicker },
  mounted() {
    this.date = this.value
  },
  data() {
    return {
      date: ''
    }
  },
  methods: {
    dateChanged() {
      this.$emit('input', this.date)
    }
  },
  watch: {
    value: function (val) {
      console.log('val', val)
      this.date = val
    },
    date: function (newVal, oldVal) {
      if (newVal && this.value !== newVal && newVal !== oldVal) {
        this.$emit('input', newVal)
      }
    }
  }
}
</script>
