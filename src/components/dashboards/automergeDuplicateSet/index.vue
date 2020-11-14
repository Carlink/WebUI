<template>
  <div class="d-flex flex-column">
    <v-row no-gutters align="center">
      <CardHeader
        v-if="
          dashboardName === dashboards.salesRepresentative ||
          dashboardName === dashboards.salesManager
        "
        :title="title"
        class="black--text"
      />
      <div
        v-if="
          dashboardName !== dashboards.salesRepresentative &&
          dashboardName !== dashboards.salesManager
        "
      >
        <CardHeader :title="title" class="black--text" />
      </div>
    </v-row>
    <div>
      <AutomergeDuplicateSet :dashboard-name="dashboardName" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import AutomergeDuplicateSet from './AutomergeDuplicateSet'
import CardHeader from '../../shared/CardHeader'
import constants from '@/constants/constants'

export default {
  name: 'auto-merge-duplicate-sets-layout',
  props: ['dashboardName'],
  data() {
    return {
      title: 'Automerge duplicate sets',
      dashboards: constants.dashboards
    }
  },
  components: {
    AutomergeDuplicateSet,
    CardHeader
  },
  computed: {
    ...mapState({
      agentId: (state) => state.auth.agentId
    }),
  },
  mounted() {
    if (this.agentId !== undefined) {
      this.$store.dispatch('dashboard/fetchDupeData')
    }
  }
}
</script>
