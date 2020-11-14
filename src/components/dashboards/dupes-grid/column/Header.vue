<template>
  <v-row no-gutters align="center" justify="start">
    <span>
      {{ header.text }}
    </span>
    <v-spacer></v-spacer>
    <v-icon v-if="sorted">
      {{ sortDirection === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
    </v-icon>
  </v-row>
</template>
<script>
export default {
  name: 'dups-header',
  data() {
    return {}
  },
  props: ['header', 'options'],
  computed: {
    sorted() {
      return this.options.sortBy.indexOf(this.header.name) !== -1
    },
    sortDirection() {
      const sortIndex = this.options.sortBy.indexOf(this.header.name)
      let sortDir = 'asc'
      if (sortIndex !== -1 && this.options.sortDesc[sortIndex]) {
        sortDir = 'desc'
      }
      return sortDir
    }
  }
}
</script>
