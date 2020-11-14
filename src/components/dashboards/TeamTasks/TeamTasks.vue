<template>
  <div class="count-tasks">
    <v-tabs v-model="tab" color="primary" grow>
      <v-tab class="px-0" v-for="item in tabs" :key="item.tab">
        <div class="width-100p">
          <span class="font-weight-bold text-capitalize">{{ item.name }}</span>
          <v-icon class="ml-1" color="grey">mdi-alert-circle-outline</v-icon>
        </div>
      </v-tab>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-card-text class="mt-2 px-5 count-tasks-graph">
              <div class="chart-container">
                <Bar :chartData="chartData" :options="options" />
              </div>
            </v-card-text>

            <v-card-actions v-if="actions" class="justify-center py-5 pt-3">
              <v-btn color="primary" outlined to="/admin-dashboard/team-performance-dashboard">
                <span>Team Performance</span>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="px-0 pb-0">
              <Evolution />
            </v-card-text>
            <v-card-actions v-if="actions" class="justify-center py-5 pt-3">
              <v-btn color="primary" outlined to="/admin-dashboard/team-performance-dashboard">
                <span>Team Performance</span>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
import Bar from '../../shared/VerticalBar'
import { countTasksTooltip } from './tooltip'
import Evolution from './Evolution'

const COLORS = {
  green: '#54A15E',
  gray: '#DDDBDA'
}

export default {
  name: 'team-tasks',
  components: {
    Bar,
    Evolution
  },
  data: () => ({
    tab: 0,
    tabs: [
      { tab: 1, name: 'Team Tasks', alert: '' },
      { tab: 2, name: 'Tasks Evolution', alert: '' }
    ],
    chartData: {
      labels: ['Feb 2020', 'Mar 2020', 'Apr 2020', 'Jun 2020', 'Jul 2020'],
      datasets: [
        {
          data: [400, 500, 537, 543, 20],
          backgroundColor: COLORS.green,
          label: '- Finished Tasks'
        },
        {
          data: [238, 150, 300, 300, 122],
          backgroundColor: COLORS.gray,
          label: '- Remained Tasks'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        align: 'start'
      },
      tooltips: {
        enabled: false,
        custom: countTasksTooltip
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true
            },
            stacked: true
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              autoSkip: false,
              fontStyle: 'bold',
              padding: 0,
              z: 0
            },
            stacked: true
          }
        ]
      }
    }
  })
}
</script>
