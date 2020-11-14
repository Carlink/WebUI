<template>
  <div class="writing-container white pa-4 mx-auto">
    <!-- title -->
    <div class="size-20 font-weight-black mb-6 cursor-default">
      What should be your Primary record?
    </div>
    <!-- subtitle -->
    <div class="mb-4 cursor-default">
      Please define the criteria for the surviving record.
    </div>
    <!-- fields -->
    <FieldsArea class="mb-6" />
    <!-- tie breakers -->
    <TieBreaker />
  </div>
</template>

<script>
import FieldsArea from './FieldsArea'
import TieBreaker from './TieBreaker'

export default {
  name: 'writing-step-2',
  components: {
    FieldsArea,
    TieBreaker
  },
  data: () => ({
    tabs: null
  })
}
</script>

<style lang="scss">
.writing-container {
  max-width: 605px;
}
</style>
