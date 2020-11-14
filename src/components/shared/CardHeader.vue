<template>
  <div class="d-flex align-center px-3 pt-2 pb-4">
    <div class="size-20 font-weight-black header-title">{{ title }}</div>
    <v-icon right small color="ap-gray" class="cursor-help">mdi-information-outline</v-icon>
    <v-spacer></v-spacer>
    <date-picker-btn v-model="date" v-if="calendar" />
  </div>
</template>

<script>
import DatePickerBtn from '@/components/dashboards/countTasks/datePickerBtn'

export default {
  name: 'card-header',
  data() {
    return {
      date: ''
    }
  },
  components: {
    DatePickerBtn
  },
  props: ['value', 'title', 'tooltip', 'calendar'],
  mounted() {
    this.date = this.value
  },
  watch: {
    value(val) {
      this.date = val
    },
    date(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.header-title {
  line-height: 1;
}
</style>
