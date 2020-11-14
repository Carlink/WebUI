<template>
  <v-card tile>
    <CardHeader title="Top CleanData Players" />

    <v-card-text class="my-0 py-0">
      <v-simple-table dense>
        <template v-slot:default>
          <tbody>
            <tr
              class="height-45"
              v-for="(player, i) in players.slice(0, page * limit)"
              :key="i"
            >
              <td class="px-2 ap-gray--text">{{ i + 1 }}</td>
              <td class="pl-4 primary--text">{{ player.name }}</td>
              <td class="px-0 ap-dark-gray--text">{{ player.team }}</td>
              <td>
                <div class="ap-light-gray ml-auto percentage-slider">
                  <div
                    :style="{ width: player.percentage + '%' }"
                    class="ap-confirmed filled"
                  ></div>
                </div>
              </td>
              <td class="ap-confirmed--text font-weight-bold px-0">
                {{ player.percentage }}%
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn
        v-if="hasMore"
        color="ap-dark-gray"
        outlined
        class="mb-3"
        @click="page++"
      >
        <span>Show More</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CardHeader from '../shared/CardHeader'

export default {
  name: 'top-players',
  components: {
    CardHeader
  },
  computed: {
    hasMore: function () {
      let { page, limit, players } = this
      return players.length - page * limit > 0
    }
  },
  data: () => ({
    page: 1,
    limit: 5,
    players: [
      { name: 'Christopher Cain', team: 'Team 3', percentage: 90 },
      { name: 'Effie Llodd', team: 'Team 1', percentage: 80 },
      { name: 'Leona Jenkins', team: 'Team 22', percentage: 20 },
      { name: 'Christopher Cain', team: 'Team 11', percentage: 50 },
      { name: 'Effie Llodd', team: 'Team 5', percentage: 30 },
      { name: 'Leona Jenkins', team: 'Team 14', percentage: 70 },
      { name: 'Christopher Cain', team: 'Team 7', percentage: 85 },
      { name: 'Effie Llodd', team: 'Team 3', percentage: 75 },
      { name: 'Leona Jenkins', team: 'Team 1', percentage: 65 }
    ]
  })
}
</script>

<style></style>
