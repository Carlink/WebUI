<template>
  <Step1 v-if="step == 1" />
  <Step2 v-else />
</template>

<script>
import Step1 from './step1'
import Step2 from './step2'

export default {
  name: 'assignment',
  props: ['step'],
  components: {
    Step1,
    Step2
  }
}
</script>

<style>
.assignment-container {
  max-width: 605px;
}
.border-style {
  border: 1px solid var(--v-ap-border-gray-base);
}
</style>
