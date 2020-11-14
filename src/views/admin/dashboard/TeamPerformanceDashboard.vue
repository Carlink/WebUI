<template>
  <v-app class="transparent">
    <div>
      <v-row dense>
        <!-- TODO: this components are removed from current scope will required in future -->
        <!-- <v-col cols="12" md="4" sm="6">
          <Percentage />
        </v-col>-->
        <v-col cols="12" sm="6" md="5" lg="4">
          <count-tasks class="pa-4 rounded border-all" :detailed="true" />
        </v-col>
        <!-- TODO: this components are removed from current scope will required in future -->
        <!--<v-col cols="12" md="4" sm="6">
          <TeamRanking />
        </v-col>-->
      </v-row>
      <!-- TODO: this components are removed from current scope will required in future -->
      <!--<v-row>
        <v-col cols="12" md="6">
          <TopPlayers />
        </v-col>
        <v-col cols="12" md="6">
          <PlayersAttention />
        </v-col>
      </v-row>-->
    </div>
  </v-app>
</template>

<script>
import Percentage from '@/components/dashboards/percentage'
import TeamRanking from '@/components/dashboards/TeamRanking'
import CountTasks from '@/components/dashboards/countTasks'
import TopPlayers from '@/components/dashboards/TopPlayers'
import PlayersAttention from '@/components/dashboards/PlayersAttention'

export default {
  name: 'TeamPerformanceDashboard',
  components: {
    Percentage,
    TeamRanking,
    CountTasks,
    TopPlayers,
    PlayersAttention
  }
}
</script>
