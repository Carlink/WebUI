<template>
  <v-app class="transparent">
    <overlay
      :maxWidth="overlayWidth"
      :title="overlayTitle"
      :name="overlays"
      @close="close"
    />
    <v-row dense>
      <!-- HIDDEN FOR FUTURE -->
      <!-- <v-col cols="12" sm="12" md="4" :class="spaceBetweenCards">
        <AlertsRecommendations :class="cardClass" />
      </v-col> -->
      <v-col cols="12" sm="12" md="4" :class="spaceBetweenCards">
        <DupObject :class="cardClass" />
      </v-col>
      <v-col cols="12" sm="12" md="4" :class="spaceBetweenCards">
        <DupUserType :class="cardClass" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="12" md="4" :class="spaceBetweenCards">
        <CompletedTasks :class="cardClass" userType="admin" />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CompletedTasks from '@/components/dashboards/completedTasks'
import DupUserType from '@/components/dashboards/dupUserType'
import DupObject from '@/components/dashboards/dupObject'
import AlertsRecommendations from '@/components/dashboards/alertsRecommendations'
import Overlay from '@/components/overlay'
import cardGrid from '@/mixins/cardGrid'

export default {
  name: 'SystemPerformanceDashboard',
  mixins: [cardGrid],
  components: {
    AlertsRecommendations,
    CompletedTasks,
    DupUserType,
    DupObject,
    Overlay
  },
  data() {
    return {
      overlayWidth: '440'
    }
  },
  computed: {
    ...mapState({
      overlays(state) {
        let overlay = state.dashboard.overlay
        if (overlay === 'MergeHistoryOverlay') {
          this.overlayWidth = '900'
        } else {
          this.overlayWidth = '440'
        }
        return state.dashboard.overlay
      }
    }),
    overlayTitle() {
      if (this.overlays === 'MergeHistoryOverlay') {
        return 'Merge History'
      } else {
        return null
      }
    }
  },
  methods: {
    ...mapActions({
      closeOverlay: 'dashboard/closeOverlay'
    }),
    close() {
      this.closeOverlay()
    }
  }
}
</script>
