<template>
  <div class="writing-container white pa-4 mx-auto">
    <!-- title -->
    <div class="size-20 font-weight-black mb-4 cursor-default">
      What do you want to do with the duplicates?
    </div>
    <!-- tabs -->
    <v-tabs v-model="tabs" grow slider-size="4" height="38">
      <v-tabs-slider color="ap-sky-blue"></v-tabs-slider>
      <v-tab class="size-13 text-capitalize">Merge</v-tab>
      <v-tab class="size-13 text-capitalize">
        Do not merge
      </v-tab>
    </v-tabs>
    <!-- tab items -->
    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <MergeTab />
      </v-tab-item>
      <v-tab-item>
        <DontMergeTab />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import MergeTab from './MergeTab'
import DontMergeTab from './DontMergeTab'

export default {
  name: 'writing-step-1',
  components: {
    MergeTab,
    DontMergeTab
  },
  data: () => ({
    tabs: null
  })
}
</script>

<style lang="scss">
.writing-container {
  max-width: 605px;

  .v-tabs .v-tab:not(:last-child) {
    border-right: 1px solid var(--v-ap-light-gray-base);
  }
  .v-tabs .v-tab {
    position: relative;
    border-bottom: 1px solid var(--v-ap-light-gray-base);
  }
}
</style>
