<template>
  <Step1 v-if="step == 1" />
  <Step2 v-else />
</template>

<script>
import Step1 from './LeadSegmentation'
import Step2 from './SegmentationMapping'

export default {
  name: 'assignment',
  props: ['step'],
  components: {
    Step1,
    Step2
  }
}
</script>
