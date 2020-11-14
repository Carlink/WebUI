<template>
  <v-overlay
    :max-width="maxWidth"
    content-class="overlay-wrapper"
    overlay-color="black"
    opacity="0.8"
    :dark="false"
    :light="true"
    v-model="overlay"
  >
    <div :style="`max-width: ${maxWidth}px`">
      <slot></slot>
    </div>
  </v-overlay>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'overlay-wrapper',
  props: {
    maxWidth: {
      type: String,
      default: '1200'
    }
  },
  computed: {
    overlay: {
      get() {
        let temp = this.stateOverlay.overlay
        if (temp) {
          document.documentElement.style.overflow = 'hidden'
          document.body.scroll = 'no'
        } else {
          document.documentElement.style.overflow = 'scroll'
          document.body.scroll = 'yes'
        }
        return temp
      },
      set(value) {
        this.value = value
      }
    },
    ...mapState({
      stateOverlay: 'dashboard'
    })
  },
  methods: {
    close() {
      document.documentElement.style.overflow = 'scroll'
      document.body.scroll = 'yes'
    }
  }
}
</script>
