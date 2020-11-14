<template>
  <v-card tile>
    <CardHeader title="Team Ranking" />
    <v-divider></v-divider>
    <v-card-text>
      <v-row no-gutters>
        <v-col>
          <v-list class="team-list">
            <v-list-item
              v-if="teamMember <= teamPoints.length"
              v-for="teamMember in teamPointToShow"
              :key="teamMember.rank"
            >
              <v-row no-gutters class="team-details">
                <v-col cols="1" class="team-member__position">
                  {{ teamPoints[teamMember - 1].rank }}
                </v-col>
                <v-col cols="11">
                  <v-row no-gutters>
                    <v-col cols="6" class="team-member__name">
                      {{ teamPoints[teamMember - 1].name }}
                    </v-col>
                    <v-col cols="6" align="right">
                      <v-chip
                        label
                        class="team-member__total"
                        outlined
                        color="primary"
                      >
                        {{ teamPoints[teamMember - 1].points }}
                      </v-chip>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-if="teamPointToShow < teamPoints.length">
      <v-row>
        <v-col align="center">
          <v-btn text outlined @click="teamPointToShow += 3">
            Show more
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import constants from '@/constants/constants'
import teamPoints from '@/data/team_point.json'
import CardHeader from '../shared/CardHeader'
export default {
  name: 'TeamRanking',
  data() {
    return {
      teamPointToShow: 5,
      statuses: constants.statuses,
      teamPoints: teamPoints.team_points
    }
  },
  components: {
    CardHeader,
  },
  computed: {
    ...mapState({
      status: (state) => state.dashboard.status
    })
  }
}
</script>
