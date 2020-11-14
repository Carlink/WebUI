<template>
  <div class="mb-5">
    <!-- header -->
    <div class="d-flex align-center mb-4 relative">
      <div class="circle-20 center-content white--text size-13 cursor-default" :class="color">
        {{ name[0] }}
      </div>
      <span class="ap-alarm--text size-14 mx-3 cursor-default" :class="`${color}--text`">
        {{ name }} ({{ criterias.length }})
      </span>
      <div class="flex-grow-1" :class="color" style="height: 4px;"></div>
      <div class="d-flex content-center field-wrapper">
        <div class="white mx-auto">
          <SelectDrop
            width="210"
            class="px-2 white"
            placeholder="Assign to Admin"
            :items="dropItems"
            :groups="groups"
            :light="true"
          />
        </div>
      </div>
    </div>
    <!-- match criterias -->
    <Draggable
      v-model="criterias"
      v-bind="dragOptions"
      :criterias="criterias"
      :sort="false"
      class="c-draggable"
    >
      <Criteria
        v-for="(criteria, i) in criterias"
        :key="i"
        :index="criteria.index"
        :conditions="criteria.conditions"
        @boost="$emit('boost', { criteria, index: i })"
      />
    </Draggable>
    <div class="pa-3 size-14 text-center ap-border-gray--text drop-area">
      Drag & Drop Match Criteria here
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import Criteria from './Criteria'
import SelectDrop from '@/components/shared/SelectDrop'

export default {
  name: 'score-card',
  props: ['color', 'name', 'list'],
  components: {
    Draggable,
    Criteria,
    SelectDrop
  },
  data: () => ({
    dragOptions: {
      group: 'criteria',
      animation: 200
    },
    criterias: [],
    groups: ['Admin', 'Sub-admin', 'Team Manager', 'Record Owner'],
    dropItems: [
      { text: 'Lisa Smith', value: 'Lisa Smith', group: 'Admin' },
      { text: 'Robert Jones', value: 'Robert Jones', group: 'Sub-admin' },
      { text: 'Martin Smith', value: 'Martin Smith', group: 'Team Manager' },
      { text: 'John Taylor', value: 'John Taylor', group: 'Record Owner' },
      { text: 'Not a Duplicate', value: 'Not a Duplicate' }
    ]
  }),
  mounted() {
    this.criterias = [...this.list]
  },
  watch: {
    list: function (val) {
      this.criterias = [...val]
    }
  }
}
</script>

<style lang="scss" scoped>
.drop-area {
  border: 2px dashed var(--v-ap-border-gray-base);
  transform: translateY(-50px);
  pointer-events: none;
}
.c-draggable {
  padding-bottom: 50px;
}
.field-wrapper {
  position: absolute;
  top: -50%;
  left: 0;
  height: 100%;
  width: 100%;

  .v-select {
    width: 188px;
  }
}
</style>
