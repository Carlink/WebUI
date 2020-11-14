<template>
  <div class="listContainer px-2">
    <v-list dense class="alert-list pa-0">
      <v-list-item class="my-2 pa-0" v-for="(o, i) in alerts" :key="i">
        <v-list-item-content>
          <div
            class="alert alert-box"
            v-if="!o.recommendations"
            :class="[
              o.status === 'created'
                ? 'ap-orange-light--text'
                : 'ap-yellow-light--text'
            ]"
          >
            <div class="ap-dark-gray--text">
              <a class="ap-dark-blue--text font-weight-medium">{{ o.name }}</a>
              {{ o.status }}
              <a class="ap-dark-blue--text font-weight-medium"
                >{{ o.totalDuplicates }} duplicates</a
              >
              in 24 hours.
            </div>
          </div>
          <div
            v-else-if="o.recommendations"
            class="alert alert-box ap-dark-blue--text"
          >
            <v-row no-gutters>
              <v-col cols="3" class="my-auto">
                <v-img
                  class="mr-2 mx-auto"
                  :max-height="64"
                  :max-width="64"
                  alt=""
                  :lazy-src="getImage(o.image)"
                  :src="getImage(o.image)"
                  aspect-ratio="1"
                />
              </v-col>
              <v-col cols="9">
                <div class="alert-box">
                  <span class="ap-black--text">Recommendations:</span>
                  <span class="ap-dark-gray--text">
                    {{ o.recommendations }}
                    <a
                      class="ap-dark-blue--text font-weight-medium"
                      @click="openRecommendation"
                      >Accept here.</a
                    >
                  </span>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import constants from '@/constants/constants'
export default {
  name: 'alert-and-recommendations',
  props: ['alerts'],
  data() {
    return {
      title: 'Alerts & Recommendations'
    }
  },
  methods: {
    ...mapActions({
      saveOverlay: 'dashboard/saveOverlay'
    }),
    getImage: function (value) {
      if (process.env.NODE_ENV === 'production') {
        return require(`@/assets/${value}`)
      }
      return '/' + require(`@/assets/${value}`)
    },
    openRecommendation() {
      this.saveOverlay(constants.overlays.recommendation)
    }
  }
}
</script>

<style lang="scss" scoped>
.listContainer {
  height: 310px;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  width: 0px;
}
</style>
