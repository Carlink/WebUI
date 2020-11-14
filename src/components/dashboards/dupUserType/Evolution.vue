<template>
  <div class="dup-evolution-container">
    <div class="chart-container">
      <LineChart :chartData="chartData" :options="options" />
    </div>
    <div class="d-flex mt-5 flex-wrap justify-center">
      <div class="legend-item mb-2" v-for="(item, i) of colors" :key="i">
        <div class="legend-item-color" :style="{ backgroundColor: item }"></div>
        <span class="ap-dark-gray--text ml-1 mr-3 legend-label">
          - User Type {{ i + 1 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '../../shared/LineChart'

const COLORS = [
  '#224979', //dark blue
  '#09789C',
  '#06A1D1',
  '#20C0F4',
  '#95DEF5'
]

export default {
  name: 'count-evolution',
  components: {
    LineChart
  },
  data: () => ({
    colors: COLORS,
    labels: [],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      scales: {
        yAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 7
            },
            gridLines: {
              display: true
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: true,
              offsetGridLines: true
            },
            offset: true
          }
        ]
      },
      tooltips: {
        enabled: false
      }
    },
    chartData: {
      labels: ['March 2020', 'April 2020', 'May 2020'],
      datasets: [
        {
          label: 'User Type 1',
          borderColor: COLORS[0],
          data: [40, 39, 20],
          fill: false
        },
        {
          label: 'User Type 2',
          borderColor: COLORS[1],
          data: [50, 30, 60],
          fill: false
        },
        {
          label: 'User Type 3',
          borderColor: COLORS[2],
          data: [15, 50, 35],
          fill: false
        },
        {
          label: 'User Type 4',
          borderColor: COLORS[3],
          data: [25, 65, 15],
          fill: false
        },
        {
          label: 'User Type 5',
          borderColor: COLORS[4],
          data: [70, 30, 40],
          fill: false
        }
      ]
    }
  })
}
</script>
