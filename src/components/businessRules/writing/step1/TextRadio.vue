<template>
  <v-row>
    <v-col cols="5">
      <span class="ap-dark-gray--text cursor-default">{{ title }}</span>
      <v-text-field class="mt-1" outlined dense hide-details />
    </v-col>
    <v-col cols="7" class="d-flex flex-column">
      <span class="pt-0 ap-dark-gray--text cursor-default">And add the text</span>
      <div
        class="pt-0 d-flex justify-space-between align-center flex-nowrap my-auto"
      >
        <v-radio-group v-model="radio1" hide-details row class="mt-0 pt-0">
          <v-radio value="before" label="before" />
          <v-radio value="after" label="after" />
        </v-radio-group>
        <span class="ap-dark-gray--text size-14 cursor-default">the existing value</span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'text-radio-input',
  props: ['title'],
  data: () => ({
    radio1: null
  })
}
</script>
