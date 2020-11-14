<template>
  <popper
    trigger="focus"
    :force-show="showPopper"
    transition="scale-transition"
    :options="{
      placement: position,
      modifiers: computedModifiers
    }">
    <div class="popper">
      <v-hover v-model="contentHover" class="pa-3">
        <div class="ap-dark-gray--text">
          <slot name="content"></slot>
        </div>        
      </v-hover>      
    </div>
    <div slot="reference" @click="showPopper = false" class="d-flex align-center">
      <v-hover v-model="hover">
        <slot name="element" ></slot>
      </v-hover>
      </div>    
  </popper>
</template>

<script>
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

export default {
  name: 'custom-tooltip',
  components: {
    'popper': Popper
  },
  data() {
    return {
      tooltip: false,
      wardClose: false,
      hover: false,
      contentHover: false,
      showPopper: false
    }
  },
  props: {
    overflowFix: {
      type: Boolean,
      required: false,
      default: false
    },
    offset: {
      type: Number,
      required: false,
      default: 10
    },
    topProp: {
      type: Boolean,
      required: false,
      default: false
    },
    rightProp: {
      type: Boolean,
      required: false,
      default: false
    },
    bottomProp: {
      type: Boolean,
      required: false,
      default: false
    },
    leftProp: {
      type: Boolean,
      required: false,
      default: false
    },
    contentClickable: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },

  },
  computed: {
    computedModifiers() {
      if(this.overflowFix) {
        return { offset: { offset: `0, ${this.offset}px` }, preventOverflow:  { boundariesElement: 'viewport'} }
      } else {
        return { offset: { offset: `0, ${this.offset}px` } }
      }
    },
    position() {
      if(this.topProp === true) {
        return 'top'
      } else if(this.rightProp === true) {
        return 'right'
      } else if(this.leftProp === true) {
        return 'left'
      } else if(this.bottomProp === true) {
        return 'bottom'
      } else {
        // if no prop is used, top position is default
        return 'top'
      }
    }
  },
  watch: {
    hover(val) {
      if(this.disabled) 
        return 0
      if(val) {
        setTimeout(() =>{
          this.showPopper = true
        }, 300)        
      } else {
        setTimeout(() =>{
          if(!this.wardClose) {
            this.showPopper = false
          }
          
        }, 300)        
      }
    },
    contentHover(val) {
      if(!this.contentClickable || this.disabled) 
        return 0
      if(val) {
        this.wardClose = true
        setTimeout(() =>{
          this.showPopper = true
        }, 300)        
      } else {
        setTimeout(() =>{
          this.showPopper = false
          this.wardClose = false   
        }, 300)  
          
      }
    }
  }
}
</script>

<style lang="scss">
.popper {
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.2) !important;
  border: 1px solid #F0F0F0 !important;
  border-radius: 5px !important;
}

.popper[x-placement^="bottom"] .popper__arrow {
    border-width: 0 10px 10px 10px !important;
    top: -10px !important;
}
.popper[x-placement^="top"] .popper__arrow {
    border-width: 10px 10px 0 10px !important;
    bottom: -10px !important;
}
</style>
