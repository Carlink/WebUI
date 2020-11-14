<template>
  <div class="completed-tasks">
    <!-- Heading -->
    <CardHeader title="Completed Tasks" class="pa-0" />
    <!-- progress -->
    <v-progress-linear
      v-if="userType === 'salesRep'"
      class="mb-3"
      value="15"
      color="blue darken-4"
    ></v-progress-linear>
    <!-- Tasks Filter and Graph -->
    <div class="graph-container d-flex align-center justify-center" v-else>
      <div class="relative width-100p px-4">
        <FilterDropdown />
        <TaskGraph :resolveStats="resolveStats" />
      </div>
    </div>
    <!-- Calendar and Duplicates Number -->
    <DateFilter @change="onDateChange" />
    <!-- search and export -->
    <div class="d-flex">
      <v-text-field
        v-model="search"
        class="mb-3 mr-3"
        placeholder="Search"
        append-icon="mdi-magnify"
        hide-details
        outlined
        dense
      />
      <ExportButton
        @exportStarted="showExportMsg = true"
        @exportFinished="showExportMsg = false"
      />
    </div>
    <!-- Export Msg -->
    <v-expand-transition hide-on-leave leave-absolute>
      <div v-if="showExportMsg" class="size-13">
        <div class="ap-yellow-light2 rounded">
          <div class="pa-2 d-flex align-center">
            <div class="ap-dark-gray--text">
              The file will download in a few minutes.<br />Don’t close your
              browser until the download is complete.
            </div>
            <v-btn
              class="ml-auto"
              text
              icon
              @click="showExportMsg = false"
              small
            >
              <v-icon size="20">mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="pb-3"></div>
      </div>
    </v-expand-transition>
    <!-- Completed Tasks Table -->
    <TasksTable
      :data="filteredDupesets"
      :fields="fields"
      :userType="userType"
    />
  </div>
</template>

<script>
import DateFilter from './DateFilter'
import TasksTable from './TasksTable'
import TaskGraph from './Graph'
import FilterDropdown from './FilterDropdown'
import ExportButton from './ExportButton'
import CardHeader from '../../shared/CardHeader'
import { mapState } from 'vuex'

export default {
  name: 'my-table',
  props: ['userType'],
  components: {
    CardHeader,
    DateFilter,
    TasksTable,
    TaskGraph,
    FilterDropdown,
    ExportButton
  },
  data: () => ({
    search: '',
    showExportMsg: false,
    dupeSets: [],
    fields: {},
    fieldsMapping: {},
    resolveStats: [],
    date: { start: new Date(), end: new Date() }
  }),
  computed: {
    ...mapState({
      agentId: (state) => state.auth.agentId
    }),
    filteredDupesets() {
      if (!this.search) return this.dupeSets

      let search = this.search.toLowerCase()

      return this.dupeSets.filter(
        (item) => item.name.toLowerCase().indexOf(search) !== -1
      )
    }
  },
  methods: {
    onDateChange(payload) {
      this.date = {
        start: payload.startDate,
        end: payload.endDate
      }
    },
    fetchData() {
      this.fetchResolvedStats(this.date)
      this.fetchMergedDupesets(this.date)
    },
    fetchResolvedStats(payload) {
      this.axios
        .post(`agent/${this.agentId}/resolved`, payload)
        .then((res) => (this.resolveStats = res.data.resolved_dupeSets))
        .catch((err) => console.log(err))
    },
    fetchMergedDupesets(payload) {
      this.axios
        .post(`agent/${this.agentId}/merged_dupe_sets`, payload)
        .then((res) => {
          let { dupeSets, fields } = res.data
          this.dupeSets = dupeSets
          this.fields = fields
        })
        .catch((err) => console.log(err))
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    date: function () {
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.graph-container {
  margin-bottom: 24px;
}
</style>
