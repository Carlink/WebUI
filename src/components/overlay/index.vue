<template>
  <overlay-wrapper :persistent="true" :maxWidth="maxWidth" ref="wrapper">
    <overlay-component :title="title" :overlayName="name" @close="onHide" />
  </overlay-wrapper>
</template>

<script>
import OverlayWrapper from '@/components/shared/OverlayWrapper.vue'
import OverlayComponent from '@/components/overlay/OverlayComponent.vue'

export default {
  name: 'overlay',
  props: {
    name: String,
    title: String,
    maxWidth: {
      default: '440',
      type: String
    }
  },
  components: {
    OverlayWrapper,
    OverlayComponent
  },
  methods: {
    onHide() {
      this.$emit('close')
      this.$refs.wrapper.close()
    }
  }
}
</script>
