<template>
  <div class="white--text records-container">
    <v-container>
      <div class="d-flex justify-center">
        <div
          v-if="overlayName !== overlays.weeklylimit"
          class="content-header d-flex justify-end mb-3"
          @click="onHide"
          :style="
            overlayName === overlays.mergehistory || overlayName === overlays.excludedrecords || overlayName === overlays.duplicatesets
              ? 'width: 90%;'
              : 'width: 100%;'
          "
        >
          <v-row no-gutters align="center">
            <div v-if="title" class="title font-weight-black">{{ title }}</div>
            <v-spacer></v-spacer>
            <v-icon size="22" color="grey darken-2" class="white pa-1 rounded-sm pointer">
              mdi-close
            </v-icon>
          </v-row>
        </div>
      </div>
      <InformationOverlay v-if="overlayName === overlays.recommendation" />
      <WeeklyLimitOverlay
        v-if="overlayName === overlays.weeklylimit"
        @close="onHide"
      />
      <MergeHistory
        v-if="overlayName === overlays.mergehistory"
        name="John Smith"
        :date="formatedDate('02-18-2020')"
        @close="onHide"
      />
      <ExcludedRecordsOverlay
      v-if="overlayName === overlays.excludedrecords"
      @close="onHide"
      name="John Smith"
      date="2 July, 2020"
    />
    <DuplicateSetOverlay
        v-if="overlayName === overlays.duplicatesets"
        name="John Smith"
        :date="formatedDate('02-18-2020')"
        @close="onHide"
      ></DuplicateSetOverlay>
    </v-container>
  </div>
</template>

<script>
import InformationOverlay from './InformationOverlay'
import WeeklyLimitOverlay from './WeeklyLimitOverlay'
import MergeHistory from '@/components/overlay/mergeHistory'
import constants from '@/constants/constants'
import moment from 'moment'
import ExcludedRecordsOverlay from '@/components/overlay/excludedRecords'
import DuplicateSetOverlay from '@/components/overlay/duplicateSetOverlay'

export default {
  name: 'overlay-component',
  props: ['overlayName', 'title'],
  data() {
    return {
      overlays: constants.overlays
    }
  },
  components: {
    InformationOverlay,
    WeeklyLimitOverlay,
    MergeHistory,
    ExcludedRecordsOverlay,
    DuplicateSetOverlay
  },
  methods: {
    onHide() {
      this.$emit('close')
    },
    formatedDate(date) {
      return moment(date).format('LL')
    }
  }
}
</script>
