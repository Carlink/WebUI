<template>
  <div class="mt-2 px-5">
    <div class="chart-container">
      <HorizontalBar :chartData="chartData" :options="options" />
    </div>
  </div>
</template>

<script>
import HorizontalBar from '../../shared/HorizontalBar'
import { dupObjectTooltip } from '@/utils/tooltipHelpers'
import { mapState } from 'vuex'

const COLORS = [
  '#3D8145', //dark green
  '#54A15E', // confirmed
  '#81B888',
  '#B4DDBA'
]

export default {
  name: 'dup-object-status',
  components: {
    HorizontalBar
  },
  data: () => ({
    chartData: {
      labels: ['Accounts', 'Leads', 'Contacts', 'Opportunities'],
      datasets: []
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
        custom: dupObjectTooltip
      },
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontSize: 11,
              suggestedMax: 1000
            },
            stacked: true
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
              color: '#fff',
              zeroLineColor: '#fff',
              zeroLineWidth: 0
            },
            ticks: {
              autoSkip: false,
              fontColor: '#fff',
              fontStyle: 'bold',
              mirror: true,
              padding: -20,
              z: 5
            },
            stacked: true
          }
        ]
      }
    }
  }),
  computed: {
    ...mapState({
      agentId: (state) => state.auth.agentId
    })
  },
  methods: {
    fetchData() {
      this.axios
        .post(`/agent/${this.agentId}/duplicate_objects`)
        .then((res) => {
          let { objects } = res.data
          let labels = objects.map((item) => item.name),
            datasets = []

          // finding max array size for single dataset
          let totalGroups = objects.reduce(
            (max, item) =>
              max > item.groups.length ? max : item.groups.length,
            0
          )

          // preparing dataset
          for (let i = 0; i < totalGroups; i++) {
            datasets.push({
              data: objects.map((record) =>
                record.groups[i] ? record.groups[i].count : 0
              ),
              backgroundColor: COLORS[i % 4]
            })
          }

          this.chartData = { labels, datasets }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
