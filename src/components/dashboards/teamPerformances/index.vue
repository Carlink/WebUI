<template>
  <v-card tile>
    <v-card-title>
      <strong>{{ title }}</strong>
      <v-btn icon class="mx-2 cursor-help">
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="px-0">
      <TeamPerformance percentage="80" />
    </v-card-text>
    <v-card-actions class="justify-center py-5">
      <v-btn color="primary" outlined>
        <span>Team Performance</span>
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import TeamPerformance from './TeamPerformance'

export default {
  name: 'TeamPerformanceLayout',
  components: {
    TeamPerformance
  },
  data: () => ({
    title: 'Team Performance'
  })
}
</script>
