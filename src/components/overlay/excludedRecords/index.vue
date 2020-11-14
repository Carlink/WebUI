<template>
    <div class="white--text records-container">
        <!-- content wrapper -->
        <v-card class="transparent elevation-0">
          <!-- content header -->
          <!-- content card -->
          <v-row no-gutters class="flex-nowrap">
            <v-col class="sideColumn">
          <div class="fill-height d-flex align-center justify-center">
            <v-btn icon dark>
              <v-icon color="white" size="50">mdi-chevron-left</v-icon>
            </v-btn>
          </div>
        </v-col>
            <!-- card header -->
            <div class="white rounded centerColumn" light>
            <div class="d-flex justify-space-between pa-5 pb-3">
              <!-- name -->
              <div class="font-weight-bold black--text">First Alarm</div>
              <!-- meta and action -->
              <div
                class="d-flex"
                :class="{ 'flex-column': $vuetify.breakpoint.xs }"
              >
                <!-- meta -->
                <div
                class="d-flex flex-column mr-3 order-1 order-sm-0 size-13"
                align="right"
              >
                <span class="black--text">
                  Merged by:
                  <span class="ap-link--text">{{ name }}</span>
                </span>
                <span class="ap-dark-gray--text">{{ date }}</span>
              </div>
                <!-- action -->
                <v-btn color="primary" class="order-0 order-sm-1"
                  >confirm exclusion</v-btn
                >
              </div>
            </div>
            <!-- excluded records table -->
            <ExcludedRecords class="mb-5" />
            <!-- merged records table -->
            <MergedRecords v-if="dupeset" :dupeset="dupeset" />
            </div>
            <v-col class="sideColumn">
          <div class="fill-height d-flex align-center justify-center">
            <v-btn icon dark>
              <v-icon color="white" size="50">mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </v-col>
          </v-row>
        </v-card>
    </div>
</template>

<script>
import DUPESET from '@/data/excluded_records'
import OverlayWrapper from '../../shared/OverlayWrapper'
import ExcludedRecords from './ExcludedRecordsTable'
import MergedRecords from './MergedRecordsTable'

export default {
  name: 'excluded-records',
  props: ['name', 'date'],
  components: {
    OverlayWrapper,
    ExcludedRecords,
    MergedRecords
  },
  data: () => ({
    dupeset: null
  }),
  mounted() {
    this.findDupeset()
  },
  methods: {
    findDupeset() {
      this.dupeset = DUPESET
    }
  }
}
</script>