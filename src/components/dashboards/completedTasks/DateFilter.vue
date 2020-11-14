<template>
  <div>
    <!-- calendar -->
    <v-row class="mb-3 pa-3 pr-5 ap-light-bg align-center rounded" no-gutters>
      <DateRPicker @change="$emit('change', $event)" />
      <v-spacer></v-spacer>
      <div class="size-18 ap-dark-gray--text font-weight-bold text-center">
        7 Duplicate Sets
      </div>
    </v-row>
  </div>
</template>

<script>
import DateRPicker from '../../shared/DateRPicker'

export default {
  name: 'table-actions',
  components: {
    DateRPicker
  }
}
</script>

<style></style>
