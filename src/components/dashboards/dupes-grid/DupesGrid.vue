<template>
  <div>
    <AdminFilter
      :searchText="searchText"
      v-if="!isSalesDashboards"
      @change="onDateChange"
    />
    <SalesRepFilter
      label="Search by Account/Lead Name"
      :searchText="searchText"
      v-if="isSalesDashboards"
      :dashboardName="dashboardName"
    />
    <v-row no-gutters class="px-4" v-if="isSalesDashboards">
      <div class="ap-dark-gray--text">
        <span class="size-13">Showing:</span>
        <div class="size-16 font-weight-black">
          {{ gridRows.length }} out of 31 duplicate sets
        </div>
      </div>
      <v-spacer></v-spacer>
      <div
        v-if="
          tabName === 'this_week' &&
          dashboardName === dashboards.salesRepresentative
        "
      >
        <div class="d-flex">
          <div>
            <span class="ap-dark-gray--text size-13">Completion goal</span>
            <div
              class="d-flex align-center ap-dark-blue--text size-16 font-weight-black"
            >
              <v-icon size="18" color="ap-dark-blue" class="mr-1">
                mdi-timer-outline
              </v-icon>
              <div>30 minutes</div>
            </div>
          </div>
          <div class="mx-4">
            <span class="ap-dark-gray--text size-13">Time left</span>
            <div
              class="d-flex align-center ap-orange--text size-16 font-weight-black"
            >
              <v-icon size="18" color="ap-orange" class="mr-1">
                mdi-timer-outline
              </v-icon>
              <div>12 minutes</div>
            </div>
          </div>
        </div>
      </div>
      <v-spacer></v-spacer>
      <div v-if="isSalesDashboards">
        <div class="d-flex justify-end">
          <v-btn
            color="primary"
            large
            class="dense-button"
            @click="openMergeHistoryOverlay"
            v-if="tabName === 'this_week' || tabName === 'mine'"
            >REVIEW ALL</v-btn
          >
          <v-btn
            color="primary"
            large
            class="dense-button"
            @click="openMergeHistoryOverlay"
            v-if="tabName === 'my_team' || tabName === 'sm_admin_waiting'"
            >VIEW ALL</v-btn
          >
        </div>
      </div>
    </v-row>
    <v-row class="mb-4" align="justify-end">
      <v-col cols="5">
        <div class="size-13">Showing:</div>
        <div class="font-weight-bold">0 out of 0 duplicate sets</div>
        <!-- Filter -->
      </v-col>
      <v-col cols="2">
        <div class="d-flex justify-space-between">
          <div>
            <div class="size-13">
              Completion goal
            </div>
            <div class="primary--text font-weight-bold d-flex align-center">
              <v-icon class="primary--text mr-1">mdi-alarm</v-icon> 30 Minutes
            </div>
          </div>
          <div>
            <div class="size-13">
              Time left
            </div>
            <div class="orange--text font-weight-bold d-flex align-center">
              <v-icon class="orange--text mr-1">mdi-alarm</v-icon>
              <span>12 Minutes</span>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="5">
        <div class="d-flex justify-end">
          <div>
            <v-btn class="full-height mr-4" color="primary" outlined>
              Remove Selected ({{ selected }})
            </v-btn>
          </div>
          <div>
            <v-btn class="full-height" color="primary">
              Review All
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-data-table
      :headers="realColumns"
      :items="gridRows"
      :key="headerNo"
      item-key="id"
      class="mt-4 custom-table-ap-dupesgrid"
      hide-default-header
      :search="searchText"
    >
      <template #header="{props, on}">
        <thead>
          <draggable
            v-model="props.headers"
            tag="tr"
            @change="onDraggedHeader"
            draggable=".header"
          >
            <th
              v-if="header.visible && isActive(header.name)"
              v-for="(header, i) in props.headers"
              :key="header.id"
              class="custom-header header"
              :index="i"
              :id="'col' + header.name"
              @click="blockClick ? () => {} : on.sort(header.name)"
            >
              <Header :header="header" :options="props.options" />
            </th>
          </draggable>
        </thead>
      </template>
      <template #item="{item}">
        <v-hover>
          <template #default="{ hover }">
            <tr :key="item.id" class="table-row">
              <template v-for="(col, i) in realColumns">
                <Cell
                  :key="i + '-*-' + col.id"
                  :item="item"
                  :index="i"
                  :field="col.name"
                  :colVisible="col.visible"
                  :salesColVisible="isSalesDashboards"
                />
              </template>
              <!-- <v-fade-transition> -->
              <div
                class="overlay-row white--text d-flex align-center justify-center"
                v-if="hover"
                @click="openMergeHistoryOverlay"
              >
                <div class="absolute" :style="{ left: buttonPosition + 'px' }">
                  REVIEW RECORD
                </div>
              </div>
              <!-- </v-fade-transition> -->
            </tr>
          </template>
        </v-hover>
        <!-- <tr :key="item.id" v-else>
          <template v-for="(col, i) in realColumns">
            <Cell
              :key="i + '-*-' + col.id"
              :item="item"
              :index="i"
              :field="col.name"
              :colVisible="col.visible"
              :salesColVisible="isSalesDashboards"
            />
          </template>
        </tr> -->
      </template>
    </v-data-table>
    <overlay
      :name="currentOverlay"
      v-if="currentOverlay === overlays.duplicatesets"
      @close="close"
      maxWidth="1100"
      title="Duplicate Sets"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import Header from './column/Header'
import Cell from './column/Cell'
import columns from '@/columns'
import constants from '@/constants/constants'
import AdminFilter from './column/AdminFilter'
import SalesRepFilter from './column/Filter'
import Overlay from '@/components/overlay'
import tableMixin from '@/mixins/tableMixin'

export default {
  name: 'dg-grid',
  mixins: [tableMixin],
  components: {
    draggable,
    Header,
    Cell,
    AdminFilter,
    SalesRepFilter,
    Overlay
  },
  data() {
    return {
      searchText: '',
      disableDragDrop: false,
      dragging: false,
      blockClick: false,
      headerNo: 1,
      dashboards: constants.dashboards,
      overlays: constants.overlays,
      currentOverlay: '',
      selected: 0,
      pendingSets: {
        fields: [],
        pending_dupesets: []
      },
      body: {},
      visibleCells: 5,
    }
  },
  updated() {
    let thElm
    let startOffset

    Array.prototype.forEach.call(
      document.querySelectorAll('table th'),
      function (th) {
        th.style.position = 'relative'

        var grip = document.createElement('div')
        grip.innerHTML = '&nbsp;'
        grip.style.top = 0
        grip.style.right = 0
        grip.style.bottom = 0
        grip.style.width = '5px'
        grip.style.position = 'absolute'
        grip.style.cursor = 'col-resize'
        grip.addEventListener('mousedown', function (e) {
          e.preventDefault()
          e.stopPropagation()
          thElm = th
          startOffset = th.offsetWidth - e.pageX
        })

        th.appendChild(grip)
      }
    )

    document.addEventListener('mousemove', function (e) {
      if (thElm) {
        thElm.style.width = startOffset + e.pageX + 'px'
      }
    })

    document.addEventListener('mouseup', function (e) {
      e.preventDefault()
      e.stopPropagation()
      thElm = undefined
    })
  },
  props: [
    'groupField',
    'ignoreField',
    'multiSelect',
    'pagination',
    'reorderAble',
    'uniqueColumn',
    'actionColumn',
    'dashboardName',
    'tabName'
  ],
  computed: {
    ...mapState({
      agentId: (state) => state.auth.agentId,
      showConfig(state) {
        return state.dashboard.showMockButtons
      }
    }),
    realColumns() {
      const cols = this.pendingSets.fields.map((item) => ({
        id: item.id,
        name: item.name,
        text: item.label,
        visible: true
      }))
      return cols
    },
    gridRows() {
      const rows = [...this.pendingSets.pending_dupesets].map((element) => {
        return element.final_record
      })
      return rows
    },
    isSalesDashboards() {
      if (
        this.dashboardName === this.dashboards.salesRepresentative ||
        this.dashboardName === this.dashboards.salesManager
      ) {
        return true
      }
      return false
    }
  },
  methods: {
    ...mapActions('dashboard', {
      saveDupeGridColumns: 'saveDupeGridColumns',
      saveOverlay: 'saveOverlay',
      closeOverlay: 'closeOverlay'
    }),
    onDraggedHeader(evt) {
      const newColumns = columns.moveColumn(
        evt.moved,
        this.realColumns,
        this.$store.state.dashboard.columns
      )
      this.saveDupeGridColumns(newColumns)
    },
    isActive(field) {
      if (this.isSalesDashboards) {
        if (field === 'cause' || field === 'origin') {
          return false
        }
      } else if (field === 'city') {
        return false
      }
      return true
    },
    openMergeHistoryOverlay() {
      this.currentOverlay = this.overlays.duplicatesets
      this.saveOverlay(this.currentOverlay)
    },
    close() {
      this.currentOverlay = ''
      this.closeOverlay()
    },
    fetchData() {
      this.axios
        .post(`/agent/${this.agentId}/pending_dupesets`, this.body)
        .then((res) => {
          this.pendingSets = res.data
          this.setVisibleGrid('.custom-table-ap-dupesgrid')
        })
        .catch((err) => console.log(err))
    },
    onDateChange(payload) {
      this.body = payload
      this.fetchData()
    }
  },
}
</script>

<style lang="scss" scoped>
  .custom-table-ap-dupesgrid {
    ::v-deep .v-data-table__wrapper {
      overflow-x: auto !important;
    }
  }
  .custom-table-ap-dupesgrid {
    ::v-deep .table-row {
      transform: scale(1);
    }
  }
  .custom-table-ap-dupesgrid {
    ::v-deep table {
      position: relative !important;
    }
  }

</style>
