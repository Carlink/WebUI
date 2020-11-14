<template>
  <CMergeHistory class="v-application" />
</template>

<script>
import CMergeHistory from '@/components/overlay/mergeHistory'

export default {
  name: 'merge-history-standalone',
  components: {
    CMergeHistory
  }
}
</script>

<style>
.v-application {
  background: white !important;
}
</style>
