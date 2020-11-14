<template>
  <v-card tile>
    <CardHeader title="CleanData Players Needing Attention" />
    <v-card-text class="my-0 py-0">
      <v-simple-table dense>
        <template #default>
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
                    class="ap-orange filled"
                  ></div>
                </div>
              </td>
              <td class="ap-orange--text font-weight-bold px-0">
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
import playersAttention from '@/data/players_attention.json'

export default {
  name: 'PlayersAttention',
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
    players: playersAttention
  })
}
</script>

<style></style>
