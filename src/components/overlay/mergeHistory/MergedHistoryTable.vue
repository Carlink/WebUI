<template>
  <div>
    <!-- data -->
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      hide-default-header
      row
      class="custom-table"
      style="height: 100%;"
    >
      <!-- header -->
      <template #header="{props}">
        <thead class="ap-light-bg">
          <th
            v-for="header in props.headers"
            :key="header.id"
            class="border-right border-bottom ap-dark-gray--text text-no-wrap text-left"
          >
            <v-icon v-if="header.icon" size="22">{{ header.icon }}</v-icon>
            <div class="d-flex align-center justify-center">
              <div>
                {{ header.text }}
              </div>
            </div>
          </th>
        </thead>
      </template>
      <!-- rows -->
      <template #item="{item}">
        <tr :class="{ 'grey--text': item.locked }" class="custom-cell">
          <td>
            <v-icon v-if="item.locked" size="22">mdi-lock-outline</v-icon>
          </td>
          <template v-for="(col, i) in realColumns">
            <Cell
              :key="i"
              :item="item.data"
              :field="col.name"
              :selected="isCellSelected(item.id, col.id)"
              :hasSelection="hasSelection(col.id)"
              :locked="item.locked || isCellLocked(item.id, col.id)"
              :finalValue="dupeset.final_record[col.name]"
              :canMerge="canMerge(item)"
              :isPrimary="col.is_primary"
            />
          </template>
        </tr>
      </template>
      <template #body.append>
        <!-- Final Data -->
        <FinalData class="finalRow">
          <template v-for="(col, i) in realColumns">
            <td :key="i" class="font-weight-bold text-center">
              {{
                col.name !== 'id'
                  ? dupeset['final_record'][col.name]
                  : '00Q3X00001D7ZAhUAN'
              }}
            </td>
          </template>
        </FinalData>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import FinalData from '../common/FinalData'
import Cell from '../common/Cell'

const COLUMNS = [
  'source',
  'id',
  'name',
  'street',
  'lead_source',
  'state',
  'phone',
  'email'
]

export default {
  name: 'merged-records-table',
  components: {
    FinalData,
    Cell
  },
  props: ['dupeset'],
  data: () => ({
    columns: COLUMNS,
    headers: [
      { text: '', icon: 'mdi-filter-outline' },
      { text: 'Source', value: 'source' },
      { text: 'Master ID', value: 'id', is_primary: true },
      { text: 'Name', value: 'name' },
      { text: 'Billing Street', value: 'billing_street' },
      { text: 'Lead Source', value: 'lead_source' },
      { text: 'Billing State', value: 'billing_state' },
      { text: 'Phone Number', value: 'phone_number' },
      { text: 'Email', value: 'email' }
    ],
    items: []
  }),
  computed: {
    realColumns: function () {
      if (!this.dupeset) return []
      let newColumns = this.dupeset.columns.filter((item) => {
        return this.columns.indexOf(item.name) !== -1
      })
      return newColumns
    }
  },
  mounted() {
    console.log(this.dupeset)
    this.items = this.dupeset
      ? this.dupeset.rows.map((item) => ({ ...item }))
      : []
  },
  methods: {
    hasSelection(colId) {
      return (
        this.dupeset.cells.findIndex(
          (item) => item.column_id === colId && item.selected
        ) !== -1
      )
    },
    isCellSelected(rowId, colId) {
      return (
        this.dupeset.cells.findIndex(
          (item) =>
            item.row_id === rowId && item.column_id === colId && item.selected
        ) !== -1
      )
    },
    isCellLocked(rowId, colId) {
      return (
        this.dupeset.cells.findIndex(
          (item) =>
            item.row_id === rowId && item.column_id === colId && item.locked
        ) !== -1
      )
    },
    canMerge(item) {
      if (
        item.action &&
        (item.action === 'dupe_set' || item.action === 'never')
      )
        return false
      return true
    }
  }
}
</script>

<style scoped>
.custom-table >>> .v-data-table__wrapper {
  border-radius: 0px !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  border-bottom: none !important;
}

.custom-table >>> .custom-cell {
  height: 40px !important;
}

.finalRow {
  height: 60px !important;
}
</style>
