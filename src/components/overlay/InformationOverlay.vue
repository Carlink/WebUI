<template>
  <v-card>
    <v-card-text>
      <v-row no-gutters class="justify-center">
        <v-col cols="8">
          <v-img
            class="ma-4 mx-auto"
            :max-height="120"
            :max-width="120"
            :lazy-src="getImage('robot.png')"
            :src="getImage('robot.png')"
            alt=""
          />
          <div class="text-center">
            <h2 class="ap-confirmed--text pb-2">
              20% increase on Accounts in the past 7 days
            </h2>
            <span class="py-2 size-15 ap-black--text">
              Tweak your Match Criteria in Scenario "Marketing Leads"
            </span>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="pb-4">
      <v-row no-gutters class="text-center">
        <v-col cols="12" class="py-6">
          <v-btn color="primary">
            Change To Not Match On Blanks
          </v-btn>
        </v-col>
        <v-col cols="12">
          <span>
            Or go the Admin Console to
            <a class="ap-link--text" @click="onSendFeedback()">
              manage your settings
              <v-icon size="20" class="pa-1 pointer ap-link--text">
                mdi-open-in-new
              </v-icon>
            </a>
          </span>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'information-overlay',
  data() {
    return {
      current: 0
    }
  },
  methods: {
    getImage: function (value) {
      if (process.env.NODE_ENV === 'production') {
        return require(`@/assets/${value}`)
      }
      return '/' + require(`@/assets/${value}`)
    },
    onSendFeedback: function () {
        return true;
    }
  }
}
</script>
