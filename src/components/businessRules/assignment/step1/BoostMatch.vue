<template>
  <v-card class="py-3">
    <!-- header -->
    <v-card-title class="pa-6 mb-2">
      <div class="font-weight-black size-20 mx-auto cursor-default">
        Boost Match Confidence Score
      </div>
      <v-icon
        @click="$emit('close')"
        class="ap-light-bg d-flex align-center pa-1 rounded-sm pointer absolute close-btn"
        size="16"
        v-ripple
      >
        mdi-close
      </v-icon>
    </v-card-title>
    <!-- body -->
    <div class="d-flex flex-column pa-6 pb-5 pt-0">
      <Criteria class="mb-5" :conditions="criteria.conditions" :index="index" />
      <div>
        <div class="mb-1 cursor-default">
          If there is also a match on the folowing field(s),
        </div>
        <v-text-field
          class="mb-5"
          append-icon="mdi-cog"
          outlined
          dense
          hide-details
        />
      </div>
      <div class="mb-6">
        <div class="mb-1 cursor-default">
          Boost the Match Confidence Score to
        </div>
        <v-select
          :items="items"
          outlined
          dense
          hide-details
          :menu-props="{ offsetY: true }"
        />
      </div>
      <v-btn class="mx-auto" color="primary" @click="$emit('close')">
        save
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import Criteria from './Criteria'

export default {
  name: 'boost-match',
  props: ['criteria', 'index'],
  components: {
    Criteria
  },
  data: () => ({
    menu2: null,
    score: null,
    items: ['High', 'Medium', 'Low']
  })
}
</script>

<style scoped>
.close-btn {
  top: 10px;
  right: 10px;
}
</style>
