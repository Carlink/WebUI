<template>
  <div>
    <div class="d-flex align-center">
      <template v-for="step in steps">
        <div
          :key="step"
          class="stepper"
          :class="step <= current ? 'ap-sky-blue' : 'ap-light-gray'"
        ></div>
        <div
          :key="'spacer-' + step"
          v-if="step < steps"
          class="spacer"
          :class="step < current ? 'ap-sky-blue' : 'ap-light-gray'"
        ></div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'custom-stepper',
  props: {
    steps: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.stepper {
  height: 10px;
  width: 10px;
  border-radius: 50%;
}
.spacer {
  height: 2px;
  flex: 1;
  width: 22px;
}
</style>
