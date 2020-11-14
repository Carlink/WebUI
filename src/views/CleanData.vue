<template>
  <div>
    <BreadCrumb />
    <router-view></router-view>
  </div>
</template>
<script>
import BreadCrumb from '@/components/shared/BreadCrumb'

export default {
  name: 'clean-data',
  components: {
    BreadCrumb
  }
}
</script>
