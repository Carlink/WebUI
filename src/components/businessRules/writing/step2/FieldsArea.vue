<template>
  <div>
    <!-- new button -->
    <div class="mb-3" align="right">
      <v-btn text color="ap-link" @click="addNew" class="text-capitalize">
        <v-icon size="16">mdi-plus</v-icon> New Field
      </v-btn>
    </div>
    <!-- field wraper -->
    <div class="border-style py-4">
      <div v-for="(item, i) of fields" :key="i">
        <v-row class="mx-4 mb-0 pa-2 ap-light-bg rounded relative">
          <v-col cols="6">
            <span class="ap-dark-gray--text cursor-default">
              Set primary based on the field
            </span>
            <v-select
              class="mt-1 white"
              :items="items1"
              outlined
              dense
              hide-details
            />
          </v-col>
          <v-col cols="6">
            <span class="ap-dark-gray--text cursor-default">Select the record with</span>
            <v-select
              class="mt-1 white"
              :items="items2"
              outlined
              dense
              hide-details
            />
          </v-col>
          <v-btn
            v-if="i !== 0"
            icon
            text
            x-small
            class="delete-btn"
            @click="fields.splice(i, 1)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
        <div v-if="i !== fields.length - 1" class="my-2" align="center">
          and
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'field-area',
  data: () => ({
    fields: [1],
    items1: ['Email', 'Phone', 'Street'],
    items2: ['Highest Value', 'Lowest Value']
  }),
  methods: {
    addNew() {
      this.fields.push(1)
    }
  }
}
</script>

<style scoped>
.border-style {
  border: 1px solid var(--v-ap-border-gray-base);
}
.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
