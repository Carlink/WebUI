<template>
  <div
    class="rounded mb-2 px-3 py-1 size-13 d-flex align-center border-style pointer"
  >
    <div class="circle-24 center-content ap-light-bg">{{ index + 1 }}</div>
    <div class="mx-4 my-1 mr-auto">
      <template v-for="(item, c) in conditions">
        <span :key="c" v-if="item.field && item.algo">
          {{ algoTextMappings[item.algo] }} on <b>{{ item.field }}</b>
          &nbsp;
          <span v-if="c !== conditions.length - 1">
            and&nbsp;
          </span>
        </span>
      </template>
    </div>
    <v-icon @click="$emit('boost')" class="pointer" size="18" color="black">
      mdi-rocket-launch
    </v-icon>
  </div>
</template>

<script>
export default {
  name: 'criteria',
  props: ['conditions', 'index'],
  data: () => ({
    algoTextMappings: {
      exact: 'Exact Match',
      startswith: 'Starts With',
      fuzzy: 'Fuzzy Match'
    }
  })
}
</script>
