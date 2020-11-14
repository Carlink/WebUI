<template>
  <v-card
    tile
    class="system-performance count-tasks d-flex flex-column align-start count-tasks-graph"
  >
    <CardHeader title="System Performance" />
    <div
      class="d-flex justify-center chart-container margin-admin-dashboard-cards width-100p"
    >
      <HorizontalBar
        :chartData="chartData"
        :options="options"
        class="graph-width"
      />
    </div>
    <div class="mt-auto mx-auto mb-5">
      <v-btn
        color="primary"
        outlined
        to="/admin-dashboard/sys-performance-dashboard"
        large
        class="font-weight-black"
      >
        <span>System Performance</span>
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import HorizontalBar from '../shared/HorizontalBar'
import CardHeader from '../shared/CardHeader'
import { mapState } from 'vuex'

// shades of green
const COLORS = [
  '#3D8145', // dark
  '#54A15E', // semiDark
  '#81B888', // semiLight
  '#DDDBDA' // light
]

export default {
  name: 'system-performance',
  components: {
    HorizontalBar,
    CardHeader
  },
  data: () => ({
    chartData: {
      labels: ['Accounts', 'Leads', 'Contacts', 'Opportunities'],
      datasets: [
        {
          data: [400, 500, 537, 543, 20],
          backgroundColor: COLORS[0]
        },
        {
          data: [238, 150, 300, 300, 122],
          backgroundColor: COLORS[1]
        },
        {
          data: [100, 100, 100, 100, 100],
          backgroundColor: COLORS[2]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      events: [],
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
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
            gridLines: {},
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
              mirror: true,
              padding: -10,
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
