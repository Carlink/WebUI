<template>
    <div class="count-evolution-container">
        <div class="chart-container">
            <LineChart :chartData="chartData" :options="options" />
        </div>
        <div class="d-flex mt-5 flex-wrap justify-center">
            <div class="legend-item mb-2" v-for="(item, i) of colors" :key="i">
                <div class="legend-item-color" :style="{ backgroundColor: item }"></div>
                <span class="ap-dark-gray--text ml-1 mr-3 legend-label">
          - Team {{ i + 1 }}
        </span>
            </div>
        </div>
    </div>
</template>

<script>
  import LineChart from '../../shared/LineChart'
  import { countEvolutionTooltip } from '@/utils/tooltipHelpers'

  const GREEN = ['#3D8145', '#54A15E', '#54A15E', '#81B888', '#B4DDBA']

  export default {
    name: 'team-tasks-evolution',
    components: {
      LineChart
    },
    data: () => ({
      colors: GREEN,
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
          enabled: false,
          custom: countEvolutionTooltip
        }
      },
      chartData: {
        labels: ['March 2020', 'April 2020', 'May 2020'],
        datasets: [
          {
            label: 'Team 1',
            borderColor: GREEN[0],
            data: [40, 39, 20],
            fill: false
          },
          {
            label: 'Team 2',
            borderColor: GREEN[1],
            data: [50, 30, 60],
            fill: false
          },
          {
            label: 'Team 3',
            borderColor: GREEN[2],
            data: [15, 50, 35],
            fill: false
          },
          {
            label: 'Team 4',
            borderColor: GREEN[3],
            data: [25, 65, 15],
            fill: false
          },
          {
            label: 'Team 5',
            borderColor: GREEN[4],
            data: [70, 30, 40],
            fill: false
          }
        ]
      }
    })
  }
</script>
