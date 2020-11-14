<template>
  <div class="assignment-container white pa-4 mx-auto relative">
    <!-- title -->
    <div class="size-20 font-weight-black mb-5 cursor-default">
      Who should the duplicate sets be assigned to?
    </div>
    <!-- confidence -->
    <div class="d-flex align-center justify-space-between mb-5 cursor-default">
      <span class="font-weight-bold">Confidence Score Settings</span>
      <v-btn
        class="text-capitalize"
        @click="openDialog('save')"
        color="ap-link"
        text
        depressed
        small
      >
        <v-icon size="20" color="ap-link">mdi-download-outline</v-icon>
        <span class="size-14 ml-1 font-weight-regular">Save Score</span>
      </v-btn>
    </div>
    <!-- score setup -->
    <div class="size-14 mb-5 cursor-default">
      <b>Score Setup</b> - Organize your match criteria based on the confidence
      you have that these will be duplicates
    </div>
    <!-- match criterias -->
    <div class="mb-8">
      <!-- title -->
      <div class="font-weight-bold mb-3 cursor-default">
        Match Criteria ({{ criterias.length }})
      </div>
      <!-- listing -->
      <Draggable
        v-model="criterias"
        ghost-class="ghost"
        v-bind="{ ...dragOptions, sort: false }"
      >
        <Criteria
          v-for="(criteria, i) in criterias"
          :key="i"
          :index="criteria.index"
          :conditions="criteria.conditions"
          @boost="openDialog('boost', { criteria, index: i })"
        />
      </Draggable>
    </div>
    <!-- scores -->
    <div class="mb-8">
      <!-- low score -->
      <ScoreCard
        @boost="openDialog('boost', $event)"
        name="Low Score"
        color="ap-alarm"
        :list="list1"
      />
      <!-- medium score -->
      <ScoreCard
        @boost="openDialog('boost', $event)"
        name="Medium Score"
        color="ap-rate"
        :list="list2"
      />
      <!-- high score -->
      <ScoreCard
        @boost="openDialog('boost', $event)"
        name="High Score"
        color="ap-confirmed"
        :list="list3"
      />
    </div>
    <v-dialog v-model="dialog" max-width="540">
      <component
        :is="activeDialog"
        @close="dialog = false"
        :criteria="activeCriteria"
        :index="activeIndex"
      />
    </v-dialog>
  </div>
</template>

<script>
import ScoreCard from './ScoreCard'
import BoostMatch from './BoostMatch'
import Criteria from './Criteria'
import Draggable from 'vuedraggable'
import SaveScore from './SaveScore'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'assigment-step-1',
  components: {
    ScoreCard,
    BoostMatch,
    Draggable,
    Criteria,
    SaveScore
  },
  data: () => ({
    dialog: null,
    dragOptions: {
      group: 'criteria',
      animation: 200
    },
    list1: [],
    list2: [],
    list3: [],
    activeDialog: null,
    activeCriteria: null,
    activeIndex: null,
    criterias: []
  }),
  computed: {
    ...mapState({
      myCriterias: (state) => state.businessRules.criterias
    })
  },
  methods: {
    ...mapActions('businessRules', [
      'addCriteria',
      'getRuleById',
      'updateRule',
      'deleteCriteria',
      'getMultimapsById'
    ]),
    openDialog(type, payload = null) {
      this.activeDialog = type === 'save' ? SaveScore : BoostMatch
      // true in he case of Boost dialog
      if (payload) {
        this.activeCriteria = payload.criteria
        this.activeIndex = payload.index
      }
      this.dialog = true
    },
    setCriterias(criterias) {
      this.criterias = criterias.map((item, index) => ({
        ...item,
        index
      }))
    }
  },
  mounted() {
    // remove it during api integration of this step and direct tab clicks
    if (this.myCriterias.length === 0) this.getRuleById()
    else this.setCriterias([...this.myCriterias])
  },
  watch: {
    myCriterias: function (val) {
      this.setCriterias([...val])
    }
  }
}
</script>
