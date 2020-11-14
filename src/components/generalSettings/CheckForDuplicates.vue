<template>
  <div class="justify-center py-8">
    <h2 class="size-14 text-left">
      Determine how often you want ActivePrime to run the system for duplicates.
    </h2>
    <div class="my-4 max-180">
      <span class="title-span size-13">
        Frequency:
      </span>
      <v-select
        v-model="selectedFrequency"
        class="my-1 size-13"
        color="primary"
        :items="frequencyItems"
        hide-details
        outlined
        dense
      >
      </v-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'check-for-duplicates',
  data: () => ({
    frequencyItems: [
      'Every 5 minutes',
      'Every 15 minutes',
      'Every half hour',
      'Every 1 hour'
    ],
    selectedFrequency: 'Every 5 minutes'
  })
}
</script>

<style scoped>
h2 {
  color: #163a65;
  font-style: normal;
  font-weight: normal;
}
span {
  color: #c4c4c4;
}

.max-180 {
  max-width: 180px;
}
</style>
