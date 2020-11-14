<template>
  <div class="listing-container white pa-4 mx-auto">
    <div class="size-20 font-weight-black cursor-default mb-4">
      Tell us how to identify duplicates
    </div>
    <div class="size-14 cursor-default">
      Set up your match criteria from strict to loose
    </div>
    <!-- new matching criteria -->
    <div class="text-right py-4">
      <v-btn
        text     
        small
        class="ap-link--text size-14 pointer text-none font-weight-regular"
        @click="onAddNew"
      >
        <v-icon class="size-13">mdi-plus</v-icon>
        New Match Criteria
      </v-btn>
    </div>
    <!--  listing -->
    <div class="size-14 mb-5">
      <div v-for="(criteria, n) in criterias" :key="n">
        <!-- criteria card -->
        <div class="pa-5 rounded border-style">
          <!-- card header -->
          <div class="d-flex align-center justify-space-between">
            <span class="font-weight-bold cursor-default">Matching Criteria {{ n + 1 }}</span>
            <div class="d-flex align-center">
              <v-icon class="pointer mr-3" size="16" @click="onEdit(n)">
                mdi-tune
              </v-icon>
              <v-icon class="pointer" size="16" @click="deleteCriteria(n)">
                mdi-delete
              </v-icon>
            </div>
          </div>
          <!-- card body -->
          <div class="mt-2 ap-dark-gray--text cursor-default">
            <template v-for="(item, i) in criteria.conditions">
              <span :key="i" v-if="item.field && item.algo">
                {{ algoTextMappings[item.algo] }} on <b>{{ item.field }}</b>
                &nbsp;
                <span v-if="i !== criteria.conditions.length - 1">
                  and&nbsp;
                </span>
              </span>
            </template>
          </div>
        </div>
        <!-- or text -->
        <div
          v-if="n !== criterias.length - 1"
          class="text-center my-2 font-weight-bold cursor-default"
        >
          Or
        </div>
      </div>
    </div>
    <!-- add/edit matching criteria -->
    <v-dialog v-model="dialog" max-width="1300">
      <EditModal @close="onModalClose" :value="getCriteria" :title="getTitle" />
    </v-dialog>
  </div>
</template>

<script>
import EditModal from './EditModal'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'matching-criteria',
  components: {
    EditModal
  },
  computed: {
    ...mapState({
      criterias: (state) => state.businessRules.criterias
    }),
    getCriteria: function () {
      return this.activeCriteria !== null
        ? this.criterias[this.activeCriteria]
        : null
    },
    getTitle: function () {
      return this.activeCriteria !== null
        ? `Matching Criteria ${this.activeCriteria + 1}`
        : `Matching Criteria ${this.criterias.length + 1}`
    }
  },
  data: () => ({
    dialog: false,
    activeCriteria: null,
    algoTextMappings: {
      exact: 'Exact Match',
      startswith: 'Starts With',
      fuzzy: 'Fuzzy Match'
    }
  }),
  methods: {
    ...mapActions('businessRules', [
      'addCriteria',
      'getRuleById',
      'updateRule',
      'deleteCriteria',
      'getMultimapsById'
    ]),
    onEdit(i) {
      this.activeCriteria = i
      this.dialog = true
    },
    onAddNew() {
      this.activeCriteria = null
      this.dialog = true
    },
    onModalClose(res) {
      // new case
      if (this.activeCriteria === null && res)
        this.addCriteria({ conditions: res })
      // edit case
      else if (res !== null) this.updateRule()

      this.dialog = false
      this.activeCriteria = -1
    }
  },
  mounted() {
    this.getRuleById()
    this.getMultimapsById()
  }
}
</script>

<style lang="scss" scoped>
.listing-container {
  max-width: 605px;
}
.border-style {
  border: 1px solid var(--v-ap-border-gray-base);
}
</style>
