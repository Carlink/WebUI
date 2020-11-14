<template>
  <v-card tile>
    <v-card-title>
      <strong>
        <span v-if="selectedTab === i" v-for="(tab, i) in tabs" :key="i">
          {{ tab.name }}
        </span>
      </strong>
      <v-btn icon class="mx-2 cursor-help">
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-tabs height="30px" right class="points-tab" v-model="selectedTab">
        <v-tab :class="tab.class" v-for="(tab, i) in tabs" :key="i">
          {{ tab.title }}
        </v-tab>
        <v-tabs-items v-model="selectedTab">
          <v-tab-item>
            <v-row no-gutters>
              <v-col>
                <v-list class="team-list">
                  <v-list-item
                    v-for="teamMember in teamPoints.person_rank"
                    :key="teamMember.rank"
                  >
                    <v-row no-gutters class="team-details">
                      <v-col cols="1" class="team-member__position">
                        {{ teamMember.rank }}
                      </v-col>
                      <v-col cols="11">
                        <v-row no-gutters>
                          <v-col cols="6" class="team-member__name">
                            {{ teamMember.name }}
                          </v-col>
                          <v-col cols="6" align="right">
                            <v-chip
                              label
                              class="team-member__total"
                              outlined
                              color="primary"
                            >
                              {{ teamMember.points }}
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
          </v-tab-item>
          <v-tab-item>
            <v-row no-gutters>
              <v-col>
                <v-list class="team-list">
                  <v-list-item
                    v-for="teamMember in teamPoints.team_rank"
                    :key="teamMember.rank"
                  >
                    <v-row no-gutters class="team-details">
                      <v-col cols="1" class="team-member__position">
                        {{ teamMember.rank }}
                      </v-col>
                      <v-col cols="11">
                        <v-row no-gutters>
                          <v-col cols="6" class="team-member__name">
                            {{ teamMember.name }}
                          </v-col>
                          <v-col cols="6" align="right">
                            <v-chip
                              label
                              class="team-member__total"
                              outlined
                              color="primary"
                            >
                              {{ teamMember.points }}
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
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>
<script>
import teamPoints from '@/data/team_point.json'
export default {
  name: 'team-points',
  data() {
    return {
      selectedTab: 1,
      teamPoints: teamPoints,
      tabs: [
        {
          name: 'People points',
          title: 'By People',
          class: 'people'
        },
        {
          name: 'My teamates points',
          title: 'By teams',
          class: 'team'
        }
      ]
    }
  }
}
</script>
