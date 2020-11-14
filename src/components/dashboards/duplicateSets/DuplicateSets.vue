<template>
  <v-row no-gutters>
    <v-col>
      <DupesGrid
        :group-field="groupField"
        :ignore-field="ignoreField"
        :multi-select="multiSelect"
        :pagination="pagination"
        :reorder-able="reorderAble"
        :unique-column="uniqueColumn"
        :action-column="actionColumn"
        :dashboard-name="dashboardName"
        :tab-name="tabName"
      />
    </v-col>
  </v-row>
</template>
<script>
import DupesGrid from '../dupes-grid/DupesGrid'
export default {
  name: 'duplicate-sets',
  props: ['dashboardName', 'tabName'],
  data() {
    return {
      groupField: 'group_id',
      ignoreField: 'is_ignored',
      multiSelect: false,
      pagination: true,
      reorderAble: true,
      uniqueColumn: true,
      actionColumn: true
    }
  },
  components: {
    DupesGrid
  }
}
</script>
