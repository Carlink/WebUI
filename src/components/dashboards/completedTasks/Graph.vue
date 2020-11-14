<template>
  <v-row no-gutters class="tasks-graph-container pt-3">
    <!-- doughnut chart -->
    <v-col cols="7" md="12" lg="7">
      <div class="graph-wrapper" align="center">
        <Doughnut :chart-data="chartData" :options="options" />
      </div>
    </v-col>
    <!-- legend -->
    <v-col
      cols="5"
      md="12"
      lg="5"
      :class="$vuetify.breakpoint.mdOnly ? 'mt-4' : ''"
      class="pl-3"
    >
      <div class="legend-item mb-1" v-for="(item, i) of legendItems" :key="i">
        <div
          class="legend-item-color rounded-sm"
          :style="{ backgroundColor: item.color }"
        ></div>
        <span class="ap-dark-gray--text ml-2 legend-label"
          >- {{ item.label }}</span
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Doughnut from '../../shared/Doughnut'

export default {
  name: 'tasks-graph',
  props: ['resolveStats'],
  components: {
    Doughnut
  },
  data() {
    let colors = this.$vuetify.theme.themes.light

    return {
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          animateRotate: false
        },
        cutoutPercentage: 45,
        legend: {
          display: false
        },
        rotation: -45,
        plugins: {
          labels: {
            render: 'value',
            fontColor: 'white',
            fontStyle: 'bold',
            fontSize: 16
          }
        }
      },
      chartData: {
        labels: ['Admin tasks', 'Automated tasks', 'Sales Rep. tasks'],
        datasets: [
          {
            labels: ['Admin tasks', 'Automated tasks', 'Sales Rep. tasks'],
            borderWidth: [0, 0, 0],
            backgroundColor: [
              colors['ap-gray'],
              colors.primary,
              colors.success
            ],
            data: [1, 1, 1]
          }
        ]
      },
      legendItems: [
        { color: colors.primary, label: 'Automated tasks' },
        { color: colors.success, label: 'Sales Rep. tasks' },
        { color: colors['ap-gray'], label: 'Admin tasks' }
      ]
    }
  },
  methods: {
    getByResolver(resolver) {
      let item = this.resolveStats.find((item) => item.resolver === resolver)
      return item ? item.resolved : 1
    },
    getData() {
      return [
        this.getByResolver('Admin tasks'),
        this.getByResolver('Automated tasks'),
        this.getByResolver('Sales Rep tasks')
      ]
    }
  },
  watch: {
    resolveStats: function () {
      this.chartData.datasets[0].data = this.getData()
      this.chartData = { ...this.chartData }
    }
  }
}
</script>
