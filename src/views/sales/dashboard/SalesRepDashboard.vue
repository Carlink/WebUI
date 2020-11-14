<template>
  <v-app>
    <Overlay :name="currentOverlay" v-if="currentOverlay === overlays.weeklylimit" @close="close" />
    <v-container fluid>
      <v-row>
        <v-col>
          <v-row no-gutters class="pb-2 pt-4">
            <return-button></return-button>
          </v-row>
          <v-btn small outlined color="primary" @click="openWeeklyLimit">Weekly Limit Popup</v-btn>
        </v-col>
      </v-row>
      <!-- Content -->
      <v-row dense>
        <v-col cols="12" md="8" sm="12" :class="spaceBetweenCards">
          <duplicate-sets :class="cardClass" :dashboardName="salesRepDashboard" />
        </v-col>
        <v-col cols="12" md="4" :class="spaceBetweenCards">
          <completed-tasks :class="cardClassNoFillHeight" userType="salesRep" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import constants from '@/constants/constants'
import CompletedTasks from '@/components/dashboards/completedTasks'
import Overlay from '@/components/overlay'
import DuplicateSets from '@/components/dashboards/duplicateSets'
import cardGrid from '@/mixins/cardGrid'
import ReturnButton from '@/components/shared/ReturnButton.vue'

export default {
  name: 'sales-rep-dashboard',
  mixins: [cardGrid],
  components: {
    CompletedTasks,
    Overlay,
    DuplicateSets,
    ReturnButton,
  },
  data: () => ({
    overlays: constants.overlays,
    currentOverlay: '',
    salesRepDashboard: constants.dashboards.salesRepresentative,
  }),
  methods: {
    ...mapActions({
      saveOverlay: 'dashboard/saveOverlay',
      closeOverlay: 'dashboard/closeOverlay',
    }),
    openWeeklyLimit() {
      this.currentOverlay = this.overlays.weeklylimit
      this.saveOverlay(this.currentOverlay)
    },
    close() {
      this.currentOverlay = ''
      this.closeOverlay()
    },
  },
}
</script>
