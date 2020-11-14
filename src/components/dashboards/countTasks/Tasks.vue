<template>
  <div class="count-tasks-graph">
    <div class="chart-container">
      <horizontal-bar :chartData="chartData" :options="options" />
    </div>
  </div>
</template>

<script>
import HorizontalBar from '../../shared/HorizontalBar'
import { countTasksTooltip } from '@/utils/tooltipHelpers'

const COLORS = {
  green: '#54A15E',
  gray: '#DDDBDA'
}

export default {
  name: 'tasks-graph',
  components: {
    HorizontalBar
  },
  data: () => ({
    chartData: {
      labels: ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5'],
      datasets: [
        {
          data: [400, 500, 537, 543, 20],
          backgroundColor: COLORS.green
        },
        {
          data: [238, 150, 300, 300, 122],
          backgroundColor: COLORS.gray
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
        custom: countTasksTooltip
      },
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontFamily: "'Open Sans Bold', sans-serif",
              fontSize: 12,
              fontStyle: 'bold',
              fontColor: '#706E6B'
            },
            scaleLabel: {
              display: false
            },
            gridLines: {
              drawTicks: true,
              z: 0
            },
            stacked: true
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true
            },
            ticks: {
              autoSkip: false,
              fontColor: '#fff',
              fontStyle: 'bold',
              padding: -10,
              mirror: true,
              z: 5
            },
            stacked: true
          }
        ]
      }
    }
  })
}
</script>
