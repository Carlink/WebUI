<template>
  <td v-if="isActive && colVisible">
    <span class="size-13" :class="contentClasses">
      <v-icon left v-if="field === 'required_time'" class="ap-orange--text"
        >mdi-timer-outline</v-icon
      >
      {{ finalValue }}
    </span>
  </td>
</template>

<script>
export default {
  name: 'cell',
  props: ['field', 'item', 'colVisible', 'salesColVisible'],
  data() {
    return {}
  },
  computed: {
    isActive() {
      if (this.salesColVisible) {
        if (this.field === 'cause' || this.field === 'origin') {
          return false
        }
      } else if (this.field === 'city') {
        return false
      }
      return true
    },
    contentClasses() {
      if (this.field === 'cause') {
        if (this.item.merge_failed) {
          return 'ap-orange--text'
        } else if (this.item.sales_rep) {
          return 'ap-alarm--text'
        } else if (this.item.automattic) {
          return 'secondary--text'
        }
      } else if (this.field === 'name') {
        return 'ap-dark-blue--text'
      } else if (this.field === 'required_time') {
        return 'ap-orange--text'
      } else if (this.field !== 'source') {
        return 'ap-dark-gray--text'
      }
      return ''
    },
    value() {
      return this.item[this.field]
    },
    finalValue() {
      if (typeof this.value === 'object' && this.value !== null) {
        return this.value.value
      }
      if (this.field === 'required_time') {
        return this.value + ' sec'
      }
      return this.value
    }
  }
}
</script>
