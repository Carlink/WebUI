<template>
  <div class="d-flex flex-column">
    <v-row no-gutters align="start" class="header-title">
      <CardHeader
        v-if="
          dashboardName === dashboards.salesRepresentative ||
          dashboardName === dashboards.salesManager
        "
        :title="title"
        class="black--text"
      />
      <v-tabs
        slot="extension"
        :height="getHeight"
        v-model="selectedTab"
        :class="
          dashboardName === dashboards.salesRepresentative ||
          dashboardName === dashboards.salesManager
            ? 'alternative-dashboard-tab'
            : 'dashboard-tab'
        "
      >
        <div
          v-if="
            dashboardName !== dashboards.salesRepresentative &&
            dashboardName !== dashboards.salesManager
          "
        >
          <CardHeader :title="title" class="black--text" />
        </div>
        <v-spacer
          v-if="
            dashboardName !== dashboards.salesRepresentative &&
            dashboardName !== dashboards.salesManager
          "
        ></v-spacer>
        <v-tab
          v-for="(tab, i) in getTabs"
          :key="i"
          :class="
            dashboardName !== dashboards.salesRepresentative &&
            dashboardName !== dashboards.salesManager
              ? 'border-bottom'
              : ''
          "
        >
          <div>
            <div
              :class="{
                'mt-2 size-20':
                  dashboardName === dashboards.salesRepresentative ||
                  dashboardName === dashboards.salesManager
              }"
              class="tab-text text-uppercase"
            >
              {{ tab.title }}
            </div>
            <div
              class="pt-1 pb- text-left"
              v-if="
                dashboardName === dashboards.salesRepresentative ||
                dashboardName === dashboards.salesManager
              "
            >
              <span class="pr-2 text-lowercase subtitle d-flex align-center">
                <v-icon left small v-if="tab.total_min"
                  >mdi-timer-outline</v-icon
                >
                <div v-if="tab.total_min">{{ tab.total_min + ' mins' }}</div>
                <div v-if="tab.duplicates">
                  {{ tab.duplicates + ' duplicates' }}
                </div>
              </span>
            </div>
          </div>
        </v-tab>
      </v-tabs>
    </v-row>
    <v-tabs-items v-model="selectedTab">
      <v-divider
        v-if="
          !(
            dashboardName === dashboards.salesRepresentative ||
            dashboardName === dashboards.salesManager
          )
        "
      ></v-divider>
      <v-tab-item v-for="(tab, i) in getTabs" :key="i">
        <DuplicateSets
          :dashboard-name="dashboardName"
          v-if="selectedTab === i"
          :tab-name="tab.name"
        />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import DuplicateSets from './DuplicateSets'
import CardHeader from '../../shared/CardHeader'
import constants from '@/constants/constants'

export default {
  name: 'duplicate-sets-layout',
  props: ['dashboardName'],
  data() {
    return {
      title: 'Duplicate sets to be reviewed',
      groupField: 'group_id',
      ignoreField: 'is_ignored',
      multiSelect: false,
      pagination: true,
      reorderAble: true,
      uniqueColumn: true,
      actionColumn: true,
      selectedTab: 0,
      dashboards: constants.dashboards
    }
  },
  components: {
    DuplicateSets,
    CardHeader
  },
  computed: {
    ...mapState({
      agentId: (state) => state.auth.agentId
    }),
    getTabs: function () {
      if (this.dashboardName === this.dashboards.salesRepresentative) {
        return [
          {
            name: 'this_week',
            title: 'This Week',
            total_points: 320,
            total_min: 12
          },
          {
            name: 'admin_waiting',
            title: 'Admin waiting',
            duplicates: 16
          }
        ]
      } else if (this.dashboardName === this.dashboards.salesManager) {
        return [
          {
            name: 'my_team',
            title: 'My Team'
          },
          {
            name: 'sm_admin_waiting',
            title: 'Admin waiting'
          },
          {
            name: 'mine',
            title: 'Mine'
          }
        ]
      }
      return [
        {
          name: 'Mine',
          title: 'Mine'
        },
        {
          name: 'All',
          title: 'All'
        }
      ]
    },
    getHeight: function () {
      if (this.dashboardName === this.dashboards.salesRepresentative) {
        return '74px'
      } else if (this.dashboardName === this.dashboards.salesManager) {
        return '55px'
      }
      return '30px'
    },
    getTabClass: function () {
      if (
        this.dashboardName !== this.dashboards.salesRepresentative &&
        this.dashboardName !== this.dashboards.salesManager
      ) {
        return 'duplicates-tab'
      }
      return ''
    }
  },
  mounted() {
    if (this.agentId !== undefined) {
      this.$store.dispatch('dashboard/fetchDupeData')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-title {
  max-height: 30px;
}
</style>
