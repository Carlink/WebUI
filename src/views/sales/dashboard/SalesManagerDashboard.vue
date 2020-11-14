<template>
  <v-app>
    <div>
      <v-row no-gutters class="pb-2 pt-4 pl-2">
        <return-button></return-button>
      </v-row>
      <!-- Content -->
      <v-row no-gutters>
        <v-col cols="12" md="8" sm="12" :class="spaceBetweenCards">
          <DuplicateSets
            :class="cardClassNoFillHeight"
            :dashboardName="salesManagerDashboard"
          />
        </v-col>
        <v-col cols="12" md="4" :class="spaceBetweenCards">
          <!-- <TeamTasks :class="cardClassNoFillHeight" class="mb-4" /> -->
          <CompletedTasks
            :class="cardClassNoFillHeight"
            userType="salesManager"
          />
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>
<script>
import constants from '@/constants/constants'
import CompletedTasks from '@/components/dashboards/completedTasks'
import DuplicateSets from '@/components/dashboards/duplicateSets'
// import { TeamTasks } from '@/components/dashboards/TeamTasks'
import ReturnButton from '@/components/shared/ReturnButton.vue'
import cardGrid from '@/mixins/cardGrid'

export default {
  name: 'sales-manager-dashboard',
  mixins: [cardGrid],
  components: {
    CompletedTasks,
    DuplicateSets,
    // TeamTasks,
    ReturnButton
  },
  data: () => ({
    salesManagerDashboard: constants.dashboards.salesManager
  })
}
</script>
