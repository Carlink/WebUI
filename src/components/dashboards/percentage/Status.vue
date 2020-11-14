<template>
  <div class="percentage-container status my-5 mx-auto mb-0">
    <!-- current status -->
    <div class="current-status col-flex">
      <div class="figure">{{ percentage || 0 }}%</div>
      <div class="text">This week</div>
    </div>
    <!-- doughnut chart -->
    <Doughnut ref="chart" :chart-data="chartData" :options="options" />
  </div>
</template>

<script>
import Doughnut from '../../shared/Doughnut'

export default {
  name: 'cleandata-status',
  props: ['percentage'],
  components: {
    Doughnut
  },
  data: function () {
    return {
      chartHeight: 158,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: false
        },
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        cutoutPercentage: 70,
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: 'label',
            fontColor: '#B9B9B9',
            fontStyle: 'bold',
            position: 'outside',
            arc: true
          }
        },
        tooltips: {
          enabled: false
        }
      },
      chartData: {
        labels: ['20%', '40%', '60%', '80%', '100%'],
        datasets: [
          {
            labels: ['20%', '40%', '60%', '80%', '100%'],
            backgroundColor: this.getBackgroundColor(),
            data: [20, 20, 20, 20, 20]
          }
        ]
      }
    }
  },
  methods: {
    getBackgroundColor() {
      let {
        success,
        ['ap-light-gray']: gray
      } = this.$vuetify.theme.themes.light
      let bgColors = [20, 40, 60, 80, 100].map((item) =>
        item <= this.percentage ? success : gray
      )
      return bgColors
    }
  }
}
</script>
