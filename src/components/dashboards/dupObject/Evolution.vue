<template>
  <div class="dup-evolution-container">
    <div class="chart-container">
      <LineChart :chartData="chartData" :options="options" />
    </div>
    <div class="d-flex mt-5 flex-wrap justify-center">
      <div class="legend-item mb-2" v-for="(item, i) of colors" :key="i">
        <div class="legend-item-color" :style="{ backgroundColor: item }"></div>
        <span class="ap-dark-gray--text ml-1 mr-3 legend-label">
          - {{ labels[i] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '../../shared/LineChart'

const COLORS = [
  '#3D8145', //dark green
  '#54A15E', // confirmed
  '#81B888',
  '#B4DDBA'
]

export default {
  name: 'dup-object-evolution',
  components: {
    LineChart
  },
  data: () => ({
    colors: COLORS,
    labels: ['Accounts', 'Leads', 'Contacts', 'Opportunities'],
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
          label: 'Accounts',
          borderColor: COLORS[0],
          data: [40, 39, 20],
          fill: false
        },
        {
          label: 'Leads',
          borderColor: COLORS[1],
          data: [50, 30, 60],
          fill: false
        },
        {
          label: 'Contacts',
          borderColor: COLORS[2],
          data: [15, 50, 35],
          fill: false
        },
        {
          label: 'Opportunities',
          borderColor: COLORS[3],
          data: [25, 65, 15],
          fill: false
        }
      ]
    }
  })
}
</script>
