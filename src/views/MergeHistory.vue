<template>
  <v-app class="transparent">
    <MergeHistory name="John Smith" date="02-18-2020" @close="() => {}" />
  </v-app>
</template>

<script>
import MergeHistory from '@/components/overlay/mergeHistory'

export default {
  name: 'merge-history-container',
  components: {
    MergeHistory
  },
  data() {
    return {
      overlayWidth: '440'
    }
  }
}
</script>
