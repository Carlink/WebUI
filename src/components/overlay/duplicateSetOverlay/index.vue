<template>
  <div class="white--text records-container">
    <!-- Merge History -->
    <!-- content card -->
    <v-card class="transparent elevation-0">
      <!-- card header -->
      <v-row no-gutters class="flex-nowrap">
        <v-col class="sideColumn">
          <div class="fill-height d-flex align-center justify-center">
            <v-btn icon dark>
              <v-icon color="white" size="50">mdi-chevron-left</v-icon>
            </v-btn>
          </div>
        </v-col>
        <div class="white rounded centerColumn" light>
          <div class="d-flex align-center pa-4 pb-0">
            <!-- name -->
            <div class="font-weight-bold black--text">First Alarm - 6 potential duplicates found</div>
              <v-spacer></v-spacer>
              <div class="ap-dark-gray--text size-13 mr-3">This set was sent by sales representative</div>
              <v-btn
                small
                height="40"
                min-width="100"
                color="primary"
              >
                <v-icon left size="22">mdi-call-merge</v-icon>
                <span>MERGE</span>
              </v-btn>
              <!-- <v-btn color="primary" class="order-0 order-sm-1 ml-2"
                >Undo Merging</v-btn
              > -->
          </div>
          <div style="height: 65px;" class="pa-4 d-flex align-center">
            <v-row no-gutters align="center" class="flex-nowrap">
              <div no-gutters class="d-flex align-center">
                <custom-tooltip>
                  <template #element>
                    <v-row no-gutters class="status-data flex-nowrap pr-sm-3" align="center">
                      <v-icon size="20" left color="ap-light-gray">file_copy</v-icon>
                      <div class="d-flex align-center inherit-width">
                        <div class="font-weight-black title size-18 mr-1">{{numOfConflicts}}</div>
                        <div class="text-capitalize size-13">Duplicates</div>
                      </div>
                    </v-row>
                  </template>
                  <template #content>
                    <span>{{numOfConflicts}} duplicates found</span>
                  </template>
                </custom-tooltip>
                <custom-tooltip>
                  <template #element>
                    <v-row no-gutters align="center" class="flex-nowrap">
                      <v-icon size="20" left color="ap-light-gray">timer</v-icon>
                      <div class="status-data d-flex align-center">
                        <div class="font-weight-black size-18 title mr-1">{{numOfSeconds}}</div>
                        <div class="text-capitalize size-13">seconds</div>
                      </div>
                    </v-row>
                  </template>
                  <template #content>
                    <span>{{numOfSeconds}} seconds needed for review</span>
                  </template>
                </custom-tooltip>
              </div>
            </v-row>
            <v-spacer></v-spacer>
            <v-btn outlined class="undoBtn px-2 mr-4" :disabled="undoDisabled" @click="undo">
              <v-icon size="16">mdi-undo</v-icon>
            </v-btn>
            <div class="d-flex justify-center no-text-wrap">
              <div class="ma-auto black--text size-13">
                1 of 4 conflicts:
                <span
                  class="font-weight-bold black--text"
                >"Billing Street"</span>
              </div>
            </div>
            <custom-tooltip overflowFix>
              <template #element>
                <div        
                  :class="leftDisabled ? 'ap-light-gray' : 'ap-dark-gray pointer'"
                  class="arrow d-flex fill-height align-center justify-center ml-4 mr-2 rounded-sm conflictButton"
                >
                  <v-icon size="18" color="white">mdi-arrow-left</v-icon>
                </div>
              </template>
              <template #content>
                <span>Use the arrows to cycle through all the conflicts.</span>
              </template>
            </custom-tooltip>
            <custom-tooltip overflowFix>
              <template #element>
                <div
                  small
                  :class="rightDisabled ? 'ap-light-gray' : 'ap-dark-gray pointer'"
                  :disabled="rightDisabled"
                  class="arrow d-flex fill-height align-center justify-center rounded-sm conflictButton"
                >
                  <v-icon size="18" color="white">mdi-arrow-right</v-icon>
                </div>
              </template>
              <template #content>
                <span>Use the arrows to cycle through all the conflicts.</span>
              </template>
            </custom-tooltip>
          </div>
          <duplicate-set-table v-if="dupeset" :dupeset="dupeset" />
        </div>
        <v-col class="sideColumn">
          <div class="fill-height d-flex align-center justify-center">
            <v-btn icon dark>
              <v-icon color="white" size="50">mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <!-- merged records table -->
    </v-card>
    <!-- content actions -->
  </div>
  
</template>

<script>
import DUPESET from '@/data/excluded_records'
import DuplicateSetTable from '@/components/overlay/duplicateSetOverlay/DuplicateSetTable.vue'
import OverlayWrapper from '../../shared/OverlayWrapper'
import CustomTooltip from '@/components/shared/CustomTooltip'

export default {
  name: 'merge-history',
  props: ['name', 'date'],
  components: {
    DuplicateSetTable,
    OverlayWrapper,
    CustomTooltip
  },
  data: () => ({
    dupeset: null,
    numOfConflicts: 6,
    numOfSeconds: 30,
    undoDisabled: true,
    leftDisabled: true,
    rightDisabled: false
  }),
  mounted() {
    this.findDupeset()
  },
  methods: {
    findDupeset() {
      this.dupeset = DUPESET
    },
    undo() {
      console.log('undo')
    }
  }
}
</script>

<style lang="scss" scoped>
.undoBtn {
  min-width: 0px !important;
  padding: 0px !important;
  height: 40px !important;
  width: 40px !important;
}
.conflictButton {
  width: 24px !important;
  height: 24px !important;
}

</style>