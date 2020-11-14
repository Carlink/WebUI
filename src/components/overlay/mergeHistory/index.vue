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
          <div class="d-flex align-center justify-space-between pa-5 pb-4">
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
              <v-btn color="primary" class="order-0 order-sm-1 ml-2"
                >Undo Merging</v-btn
              >
            </div>
          </div>
          <MergeHistory v-if="dupeset" :dupeset="dupeset" />
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
import MergeHistory from './MergedHistoryTable'

export default {
  name: 'merge-history',
  props: ['name', 'date'],
  components: {
    MergeHistory
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
