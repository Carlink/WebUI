<template>
  <div class="pt-6">
    <!-- info -->
    <div
      class="d-flex align-start px-5 pa-4 ap-light-bg rounded black--text mb-6"
    >
      <v-icon class="cursor-help mr-2" color="black">mdi-information-outline</v-icon>
      <div class="cursor-default">
        By choosing not to merge the records, we will mark the record so you can
        run a report within your CRM
      </div>
    </div>
    <!-- form -->
    <div class="border-style rounded pa-4">
      <!-- switch -->
      <div class="d-flex justify-space-between align-center cursor-default">
        <span>Mark the Duplicates</span>
        <v-switch class="mt-0" v-model="switch1" hide-details />
      </div>
      <v-divider class="my-3" />
      <!-- select field -->
      <div>
        <span class="ap-dark-gray--text cursor-default">Select Field</span>
        <v-select class="mt-1" :items="items" outlined dense hide-details />
      </div>
      <v-divider class="mt-5 mb-2" />
      <!-- second input -->
      <TextRadio title="Primary record text" />
      <v-divider class="my-2" />
      <!-- third input -->
      <TextRadio title="Non-primary record text" />
    </div>
  </div>
</template>

<script>
import TextRadio from './TextRadio'

export default {
  name: 'dont-merge-tab',
  components: {
    TextRadio
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
