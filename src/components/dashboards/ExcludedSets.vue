<template>
  <div>
    <CardHeader :title="title" />
    <v-row no-gutters>
      <v-col>
        <ExcludedGrid
          :group-field="groupField"
          :ignore-field="ignoreField"
          :multi-select="multiSelect"
          :pagination="pagination"
          :reorder-able="reorderAble"
          :unique-column="uniqueColumn"
          :action-column="actionColumn"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ExcludedGrid from './dupes-grid/ExcludedGrid'
import CardHeader from '../shared/CardHeader'
export default {
  name: 'excluded-sets',
  data() {
    return {
      title: 'Excluded Records to reviewed',
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
    ExcludedGrid,
    CardHeader
  },
  computed: {
    ...mapState({
      agentId: (state) => state.auth.agentId
    })
  },
  mounted() {
    if (this.agentId !== undefined) {
      this.$store.dispatch('dashboard/fetchExcludedData')
    }
  }
}
</script>
