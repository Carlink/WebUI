<template>
  <v-row class="dupe_grid_bg" :class="label ? 'my-4' : 'mb-4'">
    <v-col class="d-flex column">
      <!-- Saved for future release -->
      <!-- <v-btn
        class="full-height mr-6"
        color="white"
        v-if="dashboardName !== dashboards.salesManager"
      >
        <v-icon>mdi-filter-outline</v-icon>
      </v-btn>-->
      <v-text-field
        v-model="searchText"
        :label="label ? label : 'Search'"
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
import constants from '@/constants/constants'
export default {
  name: 'dups-filter',
  props: ['searchText', 'dashboardName', 'label'],
  data() {
    return {
      dashboards: constants.dashboards
    }
  }
}
</script>
