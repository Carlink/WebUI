<template>
  <v-app class="transparent">
    <v-container fluid class="pa-1">
      <v-row>
        <v-col cols="12" md="12" :class="spaceBetweenCards">
          <DuplicateSets :class="cardClassNoFillHeight" :dashboard-name="adminDashboard.onYourPlate" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="7" :class="spaceBetweenCards">
          <AutomergeDuplicateSet :class="cardClassNoFillHeight" class="mt-4" :dashboard-name="adminDashboard.onYourPlate" />
        </v-col>
        <v-col cols="12" md="5" :class="spaceBetweenCards">
          <ExcludedSets :class="cardClassNoFillHeight" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import AutomergeDuplicateSet from '@/components/dashboards/automergeDuplicateSet'
import DuplicateSets from '@/components/dashboards/duplicateSets'
import ExcludedSets from '@/components/dashboards/ExcludedSets'
import constants from '@/constants/constants'
import cardGrid from '@/mixins/cardGrid'

export default {
  name: 'on-your-plate-dashboard',
  mixins: [cardGrid],
  data() {
    return {
      adminDashboard: constants.dashboards.admin
    }
  },
  components: {
    DuplicateSets,
    ExcludedSets,
    AutomergeDuplicateSet
  }
}
</script>
