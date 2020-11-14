<template>
  <div class="percentage mb-10 pa-4 elevation-2">
    <v-tabs v-model="tab" color="primary" grow>
      <v-tabs-slider></v-tabs-slider>

      <v-tab class="px-0" v-for="item in tabs" :key="item.tab">
        <div class="width-100p">
          <span class="font-weight-bold text-capitalize">{{ item.name }}</span>
          <v-icon class="ml-2" color="grey">mdi-alert-circle-outline</v-icon>
        </div>
      </v-tab>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-card-text class="px-0">
              <Status percentage="60" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="px-0">
              <Evolution />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
import Status from './Status'
import Evolution from './Evolution'

export default {
  name: 'tab-layout',
  components: {
    Status,
    Evolution
  },
  data: () => ({
    tab: null,
    grow: false,
    tabs: [
      { tab: 1, name: 'Percentage Status', alert: '' },
      { tab: 2, name: 'Percentage Evolution', alert: '' }
    ]
  })
}
</script>
