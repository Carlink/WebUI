<template>
  <div class="pt-6">
    <!-- info -->
    <div
      class="d-flex align-start px-5 pa-4 ap-light-bg rounded black--text mb-6"
    >
      <v-icon class="mr-2 cursor-help" color="black">mdi-information-outline</v-icon>
      <div class="cursor-default">
        When choosing to merge, the system will keep the record that is selected
        as the Primary and move the remaining records from the duplicate set to
        the Recycle Bin.
      </div>
    </div>
    <!-- form -->
    <div class="border-style rounded pa-4">
      <!-- switch -->
      <div class="d-flex justify-space-between align-center cursor-default">
        <span>Mark the Primary Record</span>
        <v-switch class="mt-0" v-model="switch1" hide-details />
      </div>
      <v-divider class="my-3" />
      <!-- select field -->
      <div class="cursor-default">
        <span class="ap-dark-gray--text">Select Field</span>
        <SelectDrop class="mt-1" :items="items" />
      </div>
      <v-divider class="mt-5 mb-2" />
      <!-- second input -->
      <TextRadio title="Use this text" />
    </div>
  </div>
</template>

<script>
import TextRadio from './TextRadio'
import SelectDrop from '@/components/shared/SelectDrop'

export default {
  name: 'merge-tab',
  components: {
    TextRadio,
    SelectDrop
  },
  data: () => ({
    switch1: false,
    items: ['Custom Field 1', 'Custom Field 2', 'Custom Field 3']
  })
}
</script>

<style scoped>
.border-style {
  border: 1px solid var(--v-ap-border-gray-base);
}
</style>
