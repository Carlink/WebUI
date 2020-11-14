<template>
  <v-card tile class="count-tasks d-flex flex-column align-start">
    <div v-if="detailed" class="width-100p">
      <v-tabs v-model="tab" color="primary" class="border-bottom dashboard-tab">
        <v-tabs-slider></v-tabs-slider>

        <v-tab v-for="item in tabs" :key="item.tab">
          <div class="d-flex align-center mx-3">
            <span class="tab-text text-capitalize">{{ item.name }}</span>
            <v-icon small class="pl-1" color="grey">mdi-alert-circle-outline</v-icon>
          </div>
        </v-tab>
        <!-- calendar -->
        <v-spacer></v-spacer>
        <date-picker-btn v-model="date" />
      </v-tabs>
      <v-tabs-items v-model="tab" class="mt-4">
        <v-tab-item>
          <Tasks />
        </v-tab-item>
        <v-tab-item>
          <Evolution />
        </v-tab-item>
      </v-tabs-items>
    </div>

    <div v-else class="d-flex flex-column justify-center width-100p">
      <CardHeader title="Count Task" :calendar="true" v-model="date" />
      <Tasks class="mx-auto margin-admin-dashboard-cards graph-width" />
    </div>
    <div v-if="actions" class="mt-auto mx-auto mb-5">
      <v-btn
        color="primary"
        large
        class="font-weight-black"
        outlined
        to="/admin-dashboard/team-performance-dashboard"
      >
        <span>Team Performance</span>
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import Tasks from './Tasks'
import Evolution from './Evolution'
import DatePickerBtn from '@/components/dashboards/countTasks/datePickerBtn'
import CardHeader from '@/components/shared/CardHeader'

export default {
  name: 'count-tasks',
  components: {
    Tasks,
    Evolution,
    DatePickerBtn,
    CardHeader
  },
  props: ['actions', 'detailed'],
  methods: {
    dateChanged() {
      console.log('dateChanged2')
    }
  },
  data: () => ({
    tab: 0,
    grow: false,
    date: '',
    tabs: [
      { tab: 1, name: 'Count Tasks', alert: '' },
      { tab: 2, name: 'Count Evolution', alert: '' }
    ]
  }),
  watch: {
    date(val) {
      console.log('DATE:', val)
    }
  }
}
</script>
