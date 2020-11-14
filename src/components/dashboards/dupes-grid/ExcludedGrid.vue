<template>
  <div>
    <CommonFilter :searchText="searchText" />
    <v-data-table
      :headers="excludedColumns"
      :items="excludedGridRows"
      :key="headerNo"
      item-key="id"
      class="mt-4 custom-table-ap-excluded-grid relative"
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
              v-if="header.visible"
              v-for="header in props.headers"
              :key="header.id"
              class="custom-header header"
              :id="'col' + header.name"
              @click="blockClick ? () => {} : on.sort(header.name)"
            >
              <Header :header="header" :options="props.options" />
            </th>
          </draggable>
        </thead>
      </template>
      <!-- <template #item="{item}">
        <tr :key="item.id" @click="showOverlay = true">
          <template v-for="(col, index) in excludedColumns">
            <Cell
              :key="item.id.toString() + '-*-' + col.id"
              :item="item"
              :field="col.name"
              :colVisible="col.visible"
            />
          </template>
        </tr>
      </template> -->
      <template #item="{item}">
        <v-hover>
          <template #default="{ hover }">
            <tr :key="item.id" class="table-row">
              <Cell
                v-for="(col, index) in excludedColumns"
                :key="index + '-*-' + col.id"
                :item="item"
                :field="col.name"
                :colVisible="col.visible"
              />
              <div
                class="overlay-row white--text d-flex align-center justify-center"
                v-if="hover"
                @click="openExcludedRecordsOverlay()"
              >
                <div class="absolute" :style="{ left: buttonPosition + 'px' }">
                  REVIEW RECORD
                </div>
              </div>
            </tr>
          </template>
        </v-hover>
      </template>
    </v-data-table>
    <Overlay
      :name="currentOverlay"
      title="EXCLUDED RECORDS"
      v-if="currentOverlay === overlays.excludedrecords"
      maxWidth="1100"
      @close="close"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import Header from './column/Header'
import Cell from './column/Cell'
import DatePicker from './DatePicker'
import columns from '@/columns'
import CommonFilter from './column/Filter'
import Overlay from '@/components/overlay'
import constants from '@/constants/constants'
import tableMixin from '@/mixins/tableMixin'

export default {
  name: 'edgGrid',
  mixins: [tableMixin],
  components: {
    draggable,
    Header,
    Cell,
    DatePicker,
    CommonFilter,
    Overlay
  },
  data() {
    return {
      searchText: '',
      disableDragDrop: false,
      dragging: false,
      blockClick: false,
      headerNo: 1,
      showOverlay: false,
      overlays: constants.overlays,
      currentOverlay: '',
      excludedRecords: {
        fields: [],
        records: []
      },
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
  props: {
    groupField: {
      type: String,
      required: true,
      default: () => ''
    },
    ignoreField: {
      type: String,
      required: true,
      default: () => ''
    },
    multiSelect: {
      type: Boolean,
      required: true,
      default: () => false
    },
    pagination: {
      type: Boolean,
      required: true,
      default: () => true
    },
    reorderAble: {
      type: Boolean,
      required: true,
      default: () => true
    },
    uniqueColumn: {
      type: Boolean,
      required: true,
      default: () => true
    },
    actionColumn: {
      type: Boolean,
      required: true,
      default: () => true
    }
  },
  computed: {
    ...mapState({
      agentId: (state) => state.auth.agentId,
      showConfig: (state) => state.dashboard.showMockButtons
    }),
    excludedColumns() {
      const cols = this.excludedRecords.fields.map((item) => ({
        id: item.id,
        name: item.name,
        text: item.label,
        visible: true
      }))
      return cols
    },
    excludedGridRows() {
      const rows = [...this.excludedRecords.records]
      return rows
    }
  },
  methods: {
    ...mapActions('dashboard', {
      saveExGridColumns: 'saveExGridColumns',
      saveOverlay: 'saveOverlay',
      closeOverlay: 'closeOverlay'
    }),
    onDraggedHeader(evt) {
      const newColumns = columns.moveColumn(
        evt.moved,
        this.excludedColumns,
        this.$store.state.dashboard.excludedColumns
      )
      this.saveExGridColumns(newColumns)
    },
    openExcludedRecordsOverlay() {
      this.currentOverlay = this.overlays.excludedrecords
      this.saveOverlay(this.currentOverlay)
    },
    close() {
      this.currentOverlay = ''
      this.closeOverlay()
    },
    fetchData() {
      this.axios
        .post(`/agent/${this.agentId}/excluded_records`)
        .then((res) => {
          this.excludedRecords = res.data
          this.setVisibleGrid('.custom-table-ap-excluded-grid')
        })
        .catch((err) => console.log(err))
    }
  },
}
</script>

<style lang="scss" scoped>
  .custom-table-ap-excluded-grid {
    ::v-deep .v-data-table__wrapper {
      overflow-x: auto !important;
    }
  } 
  .custom-table-ap-excluded-grid {
    ::v-deep .table-row {
      transform: scale(1);
    }
  } 
  .custom-table-ap-excluded-grid {
    ::v-deep table {
      position: relative !important;
    }
  }
  .custom-table-ap-excluded-grid {
    ::v-deep .dupe_grid_bg {
      margin-top: 0;
    }
  }
</style>
