<template>
  <Step1 v-if="step == 1" />
  <Step2 v-else-if="step == 2" />
  <Step3 v-else />
</template>

<script>
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'

export default {
  name: 'writing-step',
  props: ['step'],
  components: {
    Step1,
    Step2,
    Step3
  }
}
</script>

<style scoped>
span,
div {
  font-size: 14px;
}
</style>
