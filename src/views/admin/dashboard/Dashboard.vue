<template>
  <v-app>
    <v-container fluid>
      <v-app-bar dense elevation="0" class="transparent">
        <v-toolbar-title class="font-weight-black"
          >Acme Widgets Inc</v-toolbar-title
        >
        <v-spacer />
        <!-- HIDDEN FOR FUTURE -->
        <!-- <v-btn
          color="primary"
          class="mx-2"
          to="/admin-dashboard/team-performance-dashboard"
        >
          <v-icon>mdi-view-dashboard</v-icon>
          <span class="px-2">Team Performance</span>
        </v-btn> -->
        <v-btn
          color="primary"
          class="mx-2"
          to="/admin-dashboard/sys-performance-dashboard"
        >
          <v-icon>mdi-view-dashboard</v-icon>
          <span class="px-2">System Performance</span>
        </v-btn>
        <v-btn
          color="primary"
          class="mx-2"
          to="/admin-dashboard/on-plate-dashboard"
        >
          <v-icon>mdi-view-dashboard</v-icon>
          <span class="px-2">On Your Plate</span>
        </v-btn>
      </v-app-bar>
      <v-row no-gutters class="pb-2 pt-4">
        <return-button></return-button>
      </v-row>
      <v-main>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </v-main>
      <div v-if="visibleComponent">
        <v-row dense>
          <!-- HIDDEN FOR FUTURE -->
          <!-- <v-col cols="12" sm="12" md="4" :class="spaceBetweenCards">
            <count-tasks :class="cardClass" :actions="true" :detailed="false" />
          </v-col> -->
          <v-col cols="12" sm="12" md="4" :class="spaceBetweenCards">
            <system-performance :class="cardClass" />
          </v-col>
          <v-col cols="12" sm="12" md="4" :class="spaceBetweenCards">
            <on-your-plate :class="cardClass" />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import OnYourPlate from '@/components/dashboards/OnYourPlate'
import SystemPerformance from '@/components/dashboards/SystemPerformance'
// import CountTasks from '@/components/dashboards/countTasks'
import { mapActions } from 'vuex'
import constants from '@/constants/constants'
import cardGrid from '@/mixins/cardGrid'
import ReturnButton from '@/components/shared/ReturnButton.vue'

export default {
  name: 'admin-dashboard',
  mixins: [cardGrid],
  data() {
    return {
      spaceBetweenCards: 'pa-2'
    }
  },
  components: {
    OnYourPlate,
    SystemPerformance,
    // CountTasks,
    ReturnButton
  },
  computed: {
    actualRoute() {
      switch (this.$route.path.split('/')[2]) {
        case 'team-performance-dashboard':
          return 'Team Performance Dashboard'
        case 'sys-performance-dashboard':
          return 'System Performance Dashboard'
        case 'on-plate-dashboard':
          return 'On My Plate'
        default:
          return null
      }
    },
    visibleComponent: {
      get() {
        if (
          this.$route.name !== 'systemPerformanceDashboard' &&
          this.$route.name !== 'onYourPlateDashboard' &&
          this.$route.name !== 'teamPerformanceDashboard'
        ) {
          return true
        }
        return false
      }
    }
  },
  methods: {
    ...mapActions({
      saveUrlQueryParametersToTheVuexStore:
        'dashboard/saveUrlQueryParametersToTheVuexStore',
      saveAgentId: 'dashboard/saveAgentId',
      saveDataForDupeSetQuery: 'dashboard/saveDataForDupeSetQuery',
      saveStatus: 'dashboard/saveStatus'
    }),
    routerLink(link) {
      this.$router.push(link)
    },
    dashboardLoaded(event) {
      const { data } = event
      if (data.agent_id !== undefined) {
        this.setAxiosBaseURL(data.server_url)
        this.saveAgentId(data.agent_id)
        this.saveDataForDupeSetQuery(data.data)
      }
    },
    setAxiosBaseURL(serverUrl) {
      this.axios.defaults.baseURL = serverUrl
        ? serverUrl + 'api/v0/'
        : process.env.VUE_APP_API_URL
    }
  },
  mounted() {
    // Handle arguments optionaly passed as query parameters
    // this.setAxiosBaseURL()
    // this.saveAgentId('1234')
    // this.saveStatus(constants.statuses.teamRanking)
    // this.saveUrlQueryParametersToTheVuexStore({ vm: this })
    // // Register to listen for postMessage to load dashboard that way
    // window.addEventListener('message', (event) => this.dashboardLoaded(event))
  }
}
</script>
