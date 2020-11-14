<template>
  <div class="assignment-container white pa-4 mx-auto relative">
    <!-- title -->
    <div class="size-20 font-weight-black mb-5 cursor-default">
      Exceptions to the Score assignment rules
    </div>
    <!-- exception cards -->
    <exception-card
      v-for="(item, i) in exceptions"
      :key="i"
      :title="item"
      :dropItems="dropItems"
      :groups="groups"
      class="mb-5"
    />
  </div>
</template>

<script>
import ExceptionCard from './ExceptionCard'

export default {
  name: 'assignment-step-2',
  components: {
    ExceptionCard
  },
  data: () => ({
    exceptions: [
      'If more than one CRM user owns the records in the duplicate set',
      'If system can’t find Primary record',
      "If the system can't determine how to automatically update a field because of a tie",
      'If there are conflict in fields that are not displayed on the grid',
      'If a duplicate set contains multiple Accounts or Contacts'
    ],
    groups: ['Admin', 'Sub-admin', 'Team Manager', 'Record Owner'],
    dropItems: [
      { text: 'Lisa Smith', value: 'Lisa Smith', group: 'Admin' },
      { text: 'Robert Jones', value: 'Robert Jones', group: 'Sub-admin' },
      { text: 'Martin Smith', value: 'Martin Smith', group: 'Team Manager' },
      { text: 'John Taylor', value: 'John Taylor', group: 'Record Owner' },
      { text: 'Not a Duplicate', value: 'Not a Duplicate' }
    ]
  })
}
</script>
