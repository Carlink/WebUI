<script>
import { Doughnut } from 'vue-chartjs'
import 'chartjs-plugin-labels'

export default {
  extends: Doughnut,
  props: ['chartData', 'options'],
  methods: {
    update() {
      this.$data._chart.update()
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    chartData: function () {
      this.renderChart(this.chartData, this.options)
    }
  }
}
</script>
