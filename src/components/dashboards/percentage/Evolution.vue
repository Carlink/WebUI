<template>
  <div class="percentage-container evolution">
    <LineChart :chartData="chartData" :options="options" />
  </div>
</template>

<script>
import LineChart from '../../shared/LineChart'

export default {
  name: 'percentage-evolution',
  components: {
    LineChart
  },
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      scales: {
        yAxes: [
          {
            ticks: {
              // beginAtZero: true
              maxTicksLimit: 7,
              callback: function (value) {
                return value + '%'
              }
            },
            gridLines: {
              display: true
            }
          }
        ]
      }
    },
    chartData: {
      labels: ['March 2020', 'April 2020', 'May 2020'],
      datasets: [
        {
          labels: ['March 2020', 'April 2020', 'May 2020'],
          borderColor: '#54A15E',
          data: [40, 39, 10, 40, 39, 80, 40, 100],
          fill: false
        }
      ]
    }
  })
}
</script>
