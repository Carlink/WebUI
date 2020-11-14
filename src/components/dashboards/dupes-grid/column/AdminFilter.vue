<template>
  <v-row class="dupe_grid_bg my-4">
    <v-col class="col-md-6 col-sm-6 col-xs-12">
      <v-row no-gutters>
        <v-col class="d-flex column">
          <DatePicker @change="$emit('change', $event)" />
        </v-col>
      </v-row>
    </v-col>
    <v-col class="col-md-6 col-sm-6 col-xs-12">
      <v-text-field
        v-model="searchText"
        label="Search"
        single-line
        solo
        clearable
        append-icon="mdi-magnify"
        hide-details
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script>
import DatePicker from './../DatePicker'
export default {
  name: 'admin-filter',
  props: ['searchText'],
  components: {
    DatePicker
  }
}
</script>
