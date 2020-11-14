<template>
  <v-card class="pb-4">
    <!-- header -->
    <v-card-title class="pa-6">
      <div class="font-weight-black size-20 mx-auto">
        {{ title }}
      </div>
      <v-icon
        @click="onCancel"
        class="ap-light-bg d-flex align-center pa-1 rounded-sm pointer absolute close-btn"
        size="16"
        v-ripple
      >
        mdi-close
      </v-icon>
    </v-card-title>
    <!-- body -->
    <!-- configurations -->
    <div v-for="(item, i) of conditions" class="cursor-default" :key="i">
      <Configurations
        class="mb-3"
        @onChange="fieldChangeHandler(i, $event)"
        @validityChange="validityChange($event, item)"
        :onDelete="onDelete(i)"
        :selectedFields="conditions.map((item) => item.field)"
        :value="conditions[i]"
      />
      <div
        v-if="i !== conditions.length - 1"
        class="text-center"
        :class="i !== conditions.length - 1 && 'mb-3'"
      >
        And
      </div>
      <!-- COMMENTED FOR FUTURE (Outcome rules) -->
      <!-- <div class="pl-5">
        <div class="d-flex justify-space-between">
          Customize your Smart {{ 'algo' }}
          <span class="ap-link--text size-14 pointer" @click="addNewRule">
            + New rule
          </span>
        </div>
        <v-row>
          <v-col class="pt-0" cols="4" v-for="(item, i) of rules" :key="i">
            <v-card class="pa-4 mt-4" elevation="0" width="350">
              <div class="d-flex flex-nowrap">
                <v-radio-group
                  v-model="activeRule"
                  class="pa-0 ma-0 mr-auto"
                  hide-details
                >
                  <v-radio
                    class="font-weight-black"
                    :label="getLabel(item)"
                    :value="i"
                  />
                </v-radio-group>
                <v-icon size="20">mdi-pencil</v-icon>
                <v-icon>mdi-chevron-up</v-icon>
              </div>
              <div
                class="size-13 pl-8 mt-1"
                v-if="item.ignoreItems && item.ignoreItems.length > 0"
              >
                <div v-for="(ignore, x) of item.ignoreItems" :key="x">
                  . {{ ignore }}
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div> -->
    </div>
    <!-- action buttons -->
    <div class="d-flex flex-column text-right mx-2 pa-4 pb-2">
      <!-- new field -->
      <v-btn
        text
        small
        class="ap-link--text size-14 justify-end pointer mb-3 ml-auto text-none font-weight-regular"
        @click="addNewField"
        :disabled="conditions.length === fields.length"
      >
        <v-icon class="size-13">mdi-plus</v-icon>
        New Field
      </v-btn>
      <v-btn
        text
        small
        class="ap-link--text size-14 justify-end pointer mb-3 ml-auto text-none font-weight-regular"
        @click="addNewRule"
      >
        <v-icon class="size-13">mdi-plus</v-icon>
        New rule
      </v-btn>
      <!-- done button -->
      <v-btn
        @click="onFinish"
        :disabled="!isValid"
        class="ml-auto"
        color="primary"
      >
        Done
      </v-btn>
    </div>
    <!-- add/edit rules -->
    <v-dialog v-model="ruleModal" max-width="700">
      <term-for-record-type @close="onModalClose" />
    </v-dialog>
  </v-card>
</template>

<script>
import Configurations from './Configurations'
import TermForRecordType from './TermForRecordType'
import { mapState } from 'vuex'

export default {
  name: 'matching-criteria',
  props: ['value', 'title'],
  components: {
    Configurations,
    TermForRecordType
  },
  data: () => ({
    duplicatesLength: 2045,
    conditions: [],
    dragOptions: {
      animation: 200
    },
    ruleModal: false,
    isValid: false
  }),
  computed: {
    ...mapState({
      fields: (state) => state.businessRules.labels
    })
  },
  methods: {
    fieldChangeHandler(i, value) {
      this.conditions.splice(i, 1, value)
    },
    addNewField() {
      this.conditions.push({
        algo: null,
        field: null,
        match_field: null,
        ignore_blanks: false,
        case_sensitive: false,
        punctuation: false,
        negate: false
      })
    },
    populateData() {
      this.conditions = this.value
        ? this.value.conditions.map((item) => ({ ...item })) // edit case
        : [
            {
              algo: null,
              field: null,
              match_field: null,
              ignore_blanks: false,
              case_sensitive: false,
              punctuation: false,
              negate: false
            }
          ] // new case
    },
    onFinish() {
      // edit case
      if (this.value) this.value.conditions = [...this.conditions]
      // new case
      this.$emit('close', [...this.conditions])
      this.conditions = []
    },
    onCancel() {
      this.$emit('close', null)
    },
    onDelete(i) {
      return this.conditions.length === 1
        ? null
        : () => this.conditions.splice(i, 1)
    },
    addNewRule() {
      this.ruleModal = true
    },
    onModalClose() {
      this.ruleModal = false
    },
    validityChange(isValid, item) {
      if (item) item.isValid = isValid
      if (isValid === false) this.isValid = false
      else this.isValid = !this.conditions.some((item) => !item.isValid)
    }
  },
  mounted() {
    this.populateData()
    this.isValid = this.value !== null
  },
  watch: {
    value: function () {
      this.populateData()
    }
  }
}
// (DATA) COMMENTED FOR FUTURE
// activeRule: 0,
// rules: [
//   {
//     algo: '',
//     field: '',
//     ignoreItems: [],
//     name: ''
//   }
// ]

// (METHODS) COMMENTED FOR FUTURE
// getLabel(item) {
//   const { algo, field } = item
//   if (algo && field) return `${algo} on ${field}`
//   else if (algo) return algo
//   else if (field) return field
//   return 'No Field'
// }
// ruleChangeHandler(value) {
//   this.rules.splice(this.activeRule, 1, value)
// },
// addNewRule() {
//   this.rules.push({
//     algo: '',
//     field: '',
//     ignoreItems: []
//   })
// }
</script>

<style scoped>
.close-btn {
  top: 10px;
  right: 10px;
}
</style>
